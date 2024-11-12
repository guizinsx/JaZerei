// src/app/dashboard/pesquisa/page.tsx
import { getCookieServer } from '@/lib/cookieServer';
import Pesquisa from './pesquisa';

export default async function Page() {
    const token = await getCookieServer();

    if (!token) {
        throw new Error("Token de autenticação ausente");
    }

    return <Pesquisa token={token} />;
}
