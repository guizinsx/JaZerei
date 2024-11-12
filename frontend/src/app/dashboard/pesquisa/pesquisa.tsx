"use client";

import { useState } from 'react';
import { api } from '@/services/api';
import styles from './styles.module.scss';
import Link from 'next/link';

interface Game {
    steam_appid: number;
    name: string;
    header_image?: string;
    description?: string;
    price?: string;
    categories?: string[];
    release_date?: string;
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
        try {
            // Busca a lista de jogos por nome
            const searchResponse = await api.get(`/steam-games/search?query=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const games = searchResponse.data;

            const detailedGames = await Promise.all(games.map(async (game: { steam_appid: number; name: string }) => {
                const detailsResponse = await api.get(`/steam-games/${game.steam_appid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return {
                    ...game,
                    ...detailsResponse.data, 
                };
            }));

            setSearchResults(detailedGames);
            setError(null);
        } catch (err) {
            console.error("Erro ao buscar jogos:", err);
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
                <p>Carregando...</p>
            ) : (
                <section className={styles.searchResults}>
                    {searchResults.map((game) => (
                        <Link key={game.steam_appid} href={`/dashboard/JogosDetalhes?appid=${game.steam_appid}`}>
                            <div className={styles.jogoItem}>
                                <img
                                    src={game.header_image || '/path/to/default-image.jpg'}
                                    alt={game.name}
                                    className={styles.gameImage}
                                />
                                <span>{game.name}</span>
                            </div>
                        </Link>
                    ))}
                </section>
            )}
        </main>
    );
}
