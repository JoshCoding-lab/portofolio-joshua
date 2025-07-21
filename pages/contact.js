import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Kontak - Joshua Barani</title>
      </Head>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Hubungi Saya</h1>
          <p className="text-gray-700 mb-4">
            Anda bisa menghubungi saya melalui email atau media sosial berikut:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Email:</strong> Omogokk@gmail.com</li>
            <li><strong>GitHub:</strong> github.com/joshcodinglab</li>
            <li><strong>LinkedIn:</strong> linkedin.com/in/suaganteng</li>
          </ul>
        </div>
      </div>
    </>
  )
}
