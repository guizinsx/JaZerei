"use client";

import { useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

interface Game {
    appid: number;
    name: string;
    header_image?: string;
    description?: string;
    price?: string;
    categories?: string[];
    release_date?: string;
    error?: boolean; // Adicionada para indicar erro nos detalhes
}

interface PesquisaProps {
    token: string;
}

export default function Pesquisa({ token }: PesquisaProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        console.log("Token enviado:", token);
        console.log("URL da requisição:", `/steam-games/search?query=${searchQuery}`);

        try {
            if (!token) {
                throw new Error("Token de autenticação não encontrado.");
            }

            const response = await fetch(`http://localhost:3333/steam-games/search?query=${searchQuery}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Erro ao buscar jogos com fetch:", errorDetails);
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const games = await response.json();
            console.log("Jogos retornados antes do filtro:", games);

            const validGames = games.filter((game: { appid?: number; name: string }) => {
                if (!game.appid) {
                    console.warn("Jogo sem appid ignorado:", game);
                    return false;
                }
                return true;
            });

            console.log("Jogos válidos após filtro:", validGames);

            const detailedGames = await Promise.all(
                validGames.map(async (game: { appid: number; name: string }) => {
                    try {
                        console.log(`Buscando detalhes para appid: ${game.appid}`);
                        const detailsResponse = await fetch(
                            `http://localhost:3333/steam-games/${game.appid}`,
                            {
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (!detailsResponse.ok) {
                            console.error(`Erro ao buscar detalhes para o jogo ${game.appid}`);
                            return { ...game, error: true }; // Marca o jogo com erro
                        }

                        const details = await detailsResponse.json();
                        return {
                            ...game,
                            ...details,
                            error: false, // Indica sucesso
                        };
                    } catch (error) {
                        console.error(`Erro inesperado para o jogo ${game.appid}:`, error);
                        return { ...game, error: true }; // Marca o jogo com erro
                    }
                })
            );

            setSearchResults(detailedGames);
            setError(null);
        } catch (err: any) {
            console.error("Erro ao buscar jogos:", err.message);
            setError("Erro ao buscar jogos. Verifique se você está autenticado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <input
                    type="text"
                    placeholder="Digite o nome do jogo..."
                    className={styles.searchBar}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
            </section>

            {error && <p className={styles.error}>{error}</p>}

            {loading ? (
                <p className={styles.loading}>Carregando</p>
            ) : (
                    <section className={styles.searchResults}>
                    {searchResults.map((game) => (
                        <Link
                        key={game.appid}
                        href={
                            game.error
                            ? '#'
                            : `/dashboard/JogosDetalhes?appid=${game.appid}`
                        }
                        className={game.error ? styles.errorGame : ''}
                        >
                    <div className={styles.jogoItem}>
                    <img
                        src={game.header_image || '/path/to/default-image.jpg'}
                        alt={game.name}
                        className={styles.gameImage}
                    />
                    <span>
                        {game.name}
                        {game.error && ' (Detalhes indisponíveis)'}
                    </span>
                </div>
            </Link>
        ))}
    </section>
)}
        </main>
    );
}
