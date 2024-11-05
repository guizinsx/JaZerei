import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'
import Link from 'next/link'

interface Game {
    steam_appid: number;
    name: string;
    header_image: string;
}

export async function Jogos() {
    const token = await getCookieServer();

    const response = await api.get("/popular-games", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const popularGames: Game[] = response.data;

    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <h1>Exemplo de jogos:  </h1>
                <button>
                    <RefreshCw size={24} color="#3fffa3" />
                </button>
            </section>

            <section className={styles.popularGames}>
                {popularGames.map((game) => (
                    <Link key={game.steam_appid} href={`/jogos/${game.steam_appid}`}>
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
