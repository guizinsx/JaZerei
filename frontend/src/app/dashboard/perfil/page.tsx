"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import styles from "./styles.module.scss";

interface UserProfile {
    name: string;
    email: string;
}

interface GameState {
    [appid: number]: "zerando" | "zerado" | "largado";
}

interface Game {
    appid: number;
    name: string;
}

export default function MeuPerfil() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [gameState, setGameState] = useState<GameState>({});
    const [gamesWithStatus, setGamesWithStatus] = useState<Game[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get("session");
                if (!token) throw new Error("Token de autenticação não encontrado.");

                const response = await api.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
            } catch (err: any) {
                console.error("Erro ao buscar dados do usuário:", err.message);
            }
        };

        const fetchGameState = () => {
            const savedState = Cookies.get("gameState");
            if (savedState) {
                setGameState(JSON.parse(savedState));
            }
        };

        const fetchGamesWithStatus = async () => {
            try {
                const token = Cookies.get("session");
                if (!token) throw new Error("Token de autenticação não encontrado.");

                const savedState = Cookies.get("gameState");
                if (!savedState) return;

                const state = JSON.parse(savedState) as GameState;

                const games = await Promise.all(
                    Object.keys(state).map(async (appid) => {
                        const response = await api.get(`/steam-games/${appid}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        return {
                            appid: parseInt(appid),
                            name: response.data.name,
                        };
                    })
                );

                setGamesWithStatus(games);
            } catch (err: any) {
                console.error("Erro ao buscar jogos com status:", err.message);
            }
        };

        fetchUserData();
        fetchGameState();
        fetchGamesWithStatus();
    }, []);

    return (
        <main className={styles.container}>
            <h1>Meu Perfil</h1>

            {user ? (
                <section className={styles.profileDetails}>
                    <p><strong>Nome:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </section>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}

            <section className={styles.gamesList}>
                <h2>Jogos com Status</h2>
                {gamesWithStatus.length > 0 ? (
                    <ul>
                        {gamesWithStatus.map((game) => (
                            <li key={game.appid}>
                                <strong>{game.name}</strong> - Status: {gameState[game.appid]}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum jogo com status definido.</p>
                )}
            </section>
        </main>
    );
}
