import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Maps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Hello, World!</h1>
        <h1>Opções de Mapas:</h1>
        <ul>
          <li><a href="/points-map">/points-map</a></li>
          <li><a href="/custom-markers">/custom-markers</a></li>
          <li><a href="/cluster-markers">/cluster-markers</a></li>
        </ul>
      </main>
    </>
  )
}
