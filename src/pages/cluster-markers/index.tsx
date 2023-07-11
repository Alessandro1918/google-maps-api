import Head from 'next/head'
// import Image from 'next/image'

import Map from "./components/Map"

export default function ClusterMarkers() {

  return (
    <>
      <Head>
        <title>Add Map</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3>My Google Maps Demo</h3>
    
        <Map />

      </main>
    </>
  )
}
