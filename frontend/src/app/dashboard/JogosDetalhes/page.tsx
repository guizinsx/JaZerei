import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface GameDetails {
    name: string;
    description: string;
    price: string;
    categories: string[];
    header_image: string;
    release_date: string;
}

export default function JogosDetalhes() {
    const router = useRouter();
    const { appid } = router.query;
    const [game, setGame] = useState<GameDetails | null>(null);

    useEffect(() => {
        if (appid) {
            axios.get(`/steam-games/${appid}`)
                .then((response) => setGame(response.data))
                .catch((error) => console.error('Error fetching game details:', error));
        }
    }, [appid]);

    if (!game) return <p>Loading...</p>;

    return (
        <main>
            <h1>{game.name}</h1>
            <img src={game.header_image} alt={game.name} style={{ maxWidth: '100%' }} />
            <p><strong>Description:</strong> {game.description}</p>
            <p><strong>Price:</strong> {game.price}</p>
            <p><strong>Release Date:</strong> {game.release_date}</p>
            <p><strong>Categories:</strong> {game.categories.join(', ')}</p>
        </main>
    );
}
