import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head'; // Tetap menggunakan Head karena Anda menyebutkan direktori (mengindikasikan Next.js)
import { supabase } from '../lib/supabaseClient'




export default function Home() {
  // State untuk form kontak
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [status, setStatus] = useState('');

  // Effect untuk smooth scrolling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, []);

  // Handler perubahan input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler submit form kontak
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('kontak').insert([form]);
    if (error) {
      console.error(error);
      setStatus('❌ Gagal mengirim pesan.');
    } else {
      setStatus('✅ Pesan berhasil dikirim!');
      setForm({ nama: '', email: '', pesan: '' });
    }
  };

  // Data proyek
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["Next.js", "Supabase", "Stripe"]
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: ["React", "Firebase", "Tailwind CSS"]
    },
    {
      title: "Portfolio CMS",
      description: "Custom CMS for creative portfolios",
      tech: ["CodeIgniter", "MySQL", "jQuery"]
    }
  ];

  return (
    <>
      <Head>
        <title>Joshua Barani - Web Developer Portfolio</title>
        <meta name="description" content="Professional portfolio of Joshua Barani - Web Developer specializing in modern web technologies" />
      </Head>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 opacity-95"></div>
        {/* Menggunakan jalur gambar lokal Anda */}
        <div className="absolute inset-0 opacity-20 bg-[url('/profile.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md shadow-lg z-50 text-white border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Joshua Barani
          </motion.h1>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {['Home', 'Tentang', 'Proyek', 'Kontak'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Section: Home */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl animate-pulse delay-300"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-xl bg-gray-800/60 backdrop-blur-sm shadow-2xl max-w-2xl text-center border border-gray-700 relative z-10"
        >
          <motion.img
            // Menggunakan jalur gambar lokal Anda
            src="/profile.jpg"
            alt="Foto Joshua Barani"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mb-6 mx-auto border-4 border-gray-700 object-cover hover:border-blue-400 transition-all duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          />
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Joshua Barani
          </motion.h1>
          <motion.p 
            className="mt-2 text-gray-300 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Web Developer | Digital Security Enthusiast
          </motion.p>
          <motion.div 
            className="mt-6 flex space-x-6 justify-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a 
              href="https://github.com/username" 
              target="_blank" 
              className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all flex items-center gap-2"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/username" 
              target="_blank" 
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-2"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Section: About */}
      <section id="tentang" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tentang Saya
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Saya adalah seorang Web Developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web modern. 
                Spesialisasi saya meliputi pengembangan frontend menggunakan React/Next.js dan backend dengan Node.js serta CodeIgniter.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Saya memiliki minat kuat dalam keamanan digital dan selalu berusaha menerapkan praktik terbaik keamanan dalam setiap proyek yang saya kerjakan.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Supabase', 'CodeIgniter', 'MySQL'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Pengalaman", value: "1+ Tahun" },
                { title: "Proyek Selesai", value: "5+" },
                { title: "Klien Puas", value: "2" },
                { title: "Teknologi", value: "4+" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-gray-900/50 p-4 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-gray-400 text-sm">{item.title}</h3>
                  <p className="text-2xl font-bold text-blue-400">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section: Projects */}
      <section id="proyek" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Proyek Terbaru
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Beberapa proyek yang telah saya selesaikan dengan berbagai teknologi modern
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-5xl font-bold text-gray-600">{index + 1}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Contact */}
      <section id="kontak" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto w-full bg-gray-800/60 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Hubungi Saya
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nama</label>
              <input 
                type="text" 
                id="name" 
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="Nama Anda"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="email@contoh.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Pesan</label>
              <textarea 
                id="message" 
                name="pesan"
                value={form.pesan}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                placeholder="Pesan Anda..."
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Kirim Pesan
            </motion.button>
            {status && <p className="text-sm mt-2 text-center">{status}</p>}
          </form>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Atau hubungi saya melalui:</h3>
            <div className="flex flex-col space-y-3">
              <a href="mailto:joshua@example.com" className="flex items-center text-blue-400 hover:underline">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                joshua@example.com
              </a>
              <a href="tel:+628123456789" className="flex items-center text-blue-400 hover:underline">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +62 812-3456-789
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            {['github', 'linkedin', 'twitter', 'instagram'].map((social) => (
              <a 
                key={social}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{social}</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {/* Ini adalah SVG path untuk GitHub, sesuai yang ada di kode awal Anda */}
                  <path fillRule="evenodd" d={`M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z`} clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Joshua Barani. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}