import Head from 'next/head'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [])

  return (
    <>
      <Head>
        <title>Joshua Barani - Portofolio</title>
        <meta name="description" content="Portofolio Joshua Barani - Web Developer" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900/70 backdrop-blur-md shadow z-50 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">Joshua Barani</h1>
          <div className="space-x-6 text-sm font-medium">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">Tentang</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Proyek</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Section: Home */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-xl bg-gray-800/60 backdrop-blur-sm shadow-lg max-w-xl text-center"
        >
          <motion.img
            src="/profile.jpg"
            alt="Foto Joshua Barani"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mb-4 mx-auto border-4 border-gray-700 object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <h1 className="text-4xl font-bold tracking-wide">Joshua Barani</h1>
          <p className="mt-2 text-gray-300 text-lg">Web Developer | Portofolio</p>
          <div className="mt-4 flex space-x-6 justify-center text-sm">
            <a href="https://github.com/username" target="_blank" className="text-blue-400 hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/username" target="_blank" className="text-blue-400 hover:underline">LinkedIn</a>
          </div>
        </motion.div>
      </section>

      {/* Section: About */}
      <section id="about" className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Tentang Saya</h2>
          <p className="text-gray-300">
            Saya adalah web developer yang berfokus pada frontend dan backend menggunakan Next.js, Supabase, dan CodeIgniter.
          </p>
        </motion.div>
      </section>

      {/* Section: Projects */}
      <section id="projects" className="min-h-screen bg-gray-800 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Proyek Saya</h2>
          <p className="text-gray-300">Berikut beberapa proyek yang pernah saya kerjakan...</p>
        </motion.div>
      </section>

      {/* Section: Contact */}
      <section id="contact" className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Kontak</h2>
          <p className="text-gray-300">Silakan hubungi saya melalui email: <a href="mailto:joshua@example.com" className="text-blue-400 underline">joshua@example.com</a></p>
        </motion.div>
      </section>
    </>
  )
}
