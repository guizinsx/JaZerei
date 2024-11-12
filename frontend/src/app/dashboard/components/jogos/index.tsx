import styles from './styles.module.scss';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import Link from 'next/link';

interface Game {
    steam_appid: number;
    name: string;
    header_image: string;
}

export default async function Jogos() {
    const token = await getCookieServer();

    if (!token) {
        throw new Error("Token de autenticação ausente");
    }

    const response = await api.get("/popular-games", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const popularGames: Game[] = response.data;

    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <h1>Lista de jogos:</h1>
                <Link href="/dashboard/pesquisa">
                    <button className={styles.searchButton}>Clique aqui para pesquisar qualquer jogo</button>
                </Link>
            </section>

            <section className={styles.popularGames}>
                {popularGames.map((game) => (
                    <Link key={game.steam_appid} href={`/dashboard/JogosDetalhes?appid=${game.steam_appid}`}>
                        <div className={styles.jogoItem}>
                            <img src={game.header_image} alt={game.name} className={styles.gameImage} />
                            <span>{game.name}</span>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}
