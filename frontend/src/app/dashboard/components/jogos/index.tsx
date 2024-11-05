import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'

export function Jogos(){
    return(
        <main className={styles.container}>

            <section className={styles.containerHeader}>
                <h1>Lista de jogos: </h1>
                <button>
                    <RefreshCw size={24} color="#3fffa3" />
                </button>
            </section>

            <section className={styles.popularGames}>
                <button
                    className={styles.jogosItem}
                >
                    <div className={styles.tag}></div>
                    <span> Jogo popular 1</span>
                </button>

            </section>
            
        </main>
    )
}