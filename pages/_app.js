// pages/_app.js
import '../styles/globals.css'
import AudioPlayer from '../components/AudioPlayer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <AudioPlayer />
    </>
  )
}

export default MyApp
