import { useRouter } from 'next/router'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'

interface GameDetails {
    name: string;
    header_image: string;
    detailed_description: string;
}

export default function GameDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState<GameDetails | null>(null);

    useEffect(() => {
        if (id) {
            api.get(`/game-details/${id}`).then(response => {
                setGame(response.data);
            });
        }
    }, [id]);

    if (!game) return <p>Loading...</p>;

    return (
        <main>
            <h1>{game.name}</h1>
            <img src={game.header_image} alt={game.name} />
            <p>{game.detailed_description}</p>
        </main>
    );
}
