import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <>
      <Head>
        <title>Tentang - Joshua Barani</title>
      </Head>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Tentang Saya</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Saya adalah seorang web developer yang fokus pada pengembangan aplikasi berbasis web menggunakan teknologi modern seperti Next.js dan Tailwind CSS. Proyek ini adalah portofolio pribadi saya.
          </p>
        </div>
      </div>
    </>
  )
}
