"use client"; 

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/services/api';
import styles from './styles.module.scss';

interface GameDetails {
    name: string;
    description: string;
    price: string;
    categories: string[];
    header_image: string;
    release_date: string;
}

interface JogosDetalhesProps {
    searchParams: { appid: string };
}

export default function JogosDetalhes({ searchParams }: JogosDetalhesProps) {
    const { appid } = searchParams;
    const [game, setGame] = useState<GameDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [gameState, setGameState] = useState(() => {
        const savedState = Cookies.get('gameState');
        return savedState ? JSON.parse(savedState) : {};
    });

    const updateGameState = (state: 'zerando' | 'zerado' | 'largado') => {
        const updatedState = { ...gameState, [appid]: state };
        setGameState(updatedState);

        Cookies.set('gameState', JSON.stringify(updatedState), { expires: 365 * 10 }); // 10 anos
    };

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const token = Cookies.get('session'); 
                if (!token) throw new Error('Token de autenticação não encontrado.');

                const response = await api.get(`/steam-games/${appid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setGame(response.data);
            } catch (err: any) {
                setError('Erro ao buscar detalhes do jogo.');
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [appid]);

    if (loading) {
        return <p>Carregando detalhes do jogo...</p>;
    }

    if (error || !game) {
        return <p>{error || 'Jogo não encontrado.'}</p>;
    }

    return (
        <main className={styles.container}>
            <div className={styles.imageWrapper}>
                <img src={game.header_image} alt={game.name} className={styles.headerImage} />
            </div>
            <h1 className={styles.title}>{game.name}</h1>
            <p className={styles.description}>{game.description}</p>
            <div className={styles.details}>
                <p><strong>Preço:</strong> {game.price}</p>
                <p><strong>Data de Lançamento:</strong> {game.release_date}</p>
                <p><strong>Categorias:</strong> {game.categories.join(', ')}</p>
            </div>

            <div className={styles.statusSelector}>
                <label htmlFor="game-status">Escolha o estado do jogo:</label>
                <select
                    id="game-status"
                    value={gameState[appid] || ''}
                    onChange={(e) => updateGameState(e.target.value as 'zerando' | 'zerado' | 'largado')}
                >
                    <option value="">Selecione o estado</option>
                    <option value="zerando">Zerando</option>
                    <option value="zerado">Zerado</option>
                    <option value="largado">Largado</option>
                    <option value="pretendo jogar">Pretendo jogar</option>
                    <option value="Não tem modo história">Não tem modo história</option>
                </select>
                <p>Status Atual: {gameState[appid] || 'Nenhum'}</p>
            </div>
        </main>
    );
}
