import styles from './styles.module.scss';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';

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

export default async function JogosDetalhes({ searchParams }: JogosDetalhesProps) {
    const { appid } = searchParams;
    const token = await getCookieServer();

    const response = await api.get(`/steam-games/${appid}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const game: GameDetails = response.data;

    return (
        <main className={styles.container}>
            <div className={styles.imageWrapper}>
                <img src={game.header_image} alt={game.name} className={styles.headerImage} />
            </div>
            <h1 className={styles.title}>{game.name}</h1>
            <p className={styles.description}>{game.description}</p>
            <div className={styles.details}>
                <p><strong>Price:</strong> {game.price}</p>
                <p><strong>Release Date:</strong> {game.release_date}</p>
                <p><strong>Categories:</strong> {game.categories.join(', ')}</p>
            </div>
        </main>
    );
}
