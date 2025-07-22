import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // State untuk form kontak
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const sectionRefs = {
    home: useRef(null),
    tentang: useRef(null),
    proyek: useRef(null),
    kontak: useRef(null),
  };

  // Effect untuk smooth scrolling dan section tracking
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigasi ke section
  const scrollToSection = (section) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler perubahan input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validasi email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handler submit form kontak ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Mengirim pesan...');
    
    // Validasi form
    if (!form.nama || !form.email || !form.pesan) {
      setStatus('❌ Harap isi semua field');
      setIsSubmitting(false);
      return;
    }
    
    if (!validateEmail(form.email)) {
      setStatus('❌ Email tidak valid');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: form.nama,
            email: form.email,
            message: form.pesan,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      
      setStatus('✅ Pesan berhasil dikirim!');
      setForm({ nama: '', email: '', pesan: '' });
      
    } catch (error) {
      console.error('Error:', error);
      setStatus(`❌ Gagal mengirim pesan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Data proyek
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["Next.js", "Supabase", "Stripe"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: ["React", "Firebase", "Tailwind CSS"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Portfolio CMS",
      description: "Custom CMS for creative portfolios",
      tech: ["CodeIgniter", "MySQL", "jQuery"],
      color: "from-amber-500/20 to-orange-500/20"
    }
  ];

  // Animasi variabel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="font-sans antialiased bg-gray-900 text-white min-h-screen flex flex-col overflow-x-hidden">
      {/* Background Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              scale: [1, 1 + Math.random() * 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
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
            {['home', 'tentang', 'proyek', 'kontak'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`hover:text-blue-400 transition-colors relative group capitalize ${
                  activeSection === item ? 'text-blue-400' : ''
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                {item}
                <span className={`absolute left-0 -bottom-1 w-${
                  activeSection === item ? 'full' : '0'
                } h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full`}></span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Section: Home */}
      <section 
        id="home" 
        ref={sectionRefs.home}
        className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-xl bg-gray-800/60 backdrop-blur-sm shadow-2xl max-w-2xl text-center border border-gray-700 relative z-10"
        >
          <div className="relative mx-auto w-48 h-48 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30 animate-pulse"></div>
            <motion.img
              src="profile.jpg"
              alt="Foto Joshua Barani"
              className="w-full h-full rounded-full shadow-lg border-4 border-gray-700 object-cover relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
          
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
            className="mt-6 flex flex-wrap gap-4 justify-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a 
              href="https://github.com/joshcodinglab"
              target="_blank" 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/suaganteng"
              target="_blank" 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/30"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </motion.div>
          
          <motion.div 
            className="mt-10 animate-bounce"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <button 
              onClick={() => scrollToSection('tentang')}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll to next section"
            >
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Section: About */}
      <section 
        id="tentang" 
        ref={sectionRefs.tentang}
        className="min-h-screen flex items-center justify-center px-4 py-20 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Tentang Saya
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Saya adalah seorang Web Developer yang baru belajar dalam membangun aplikasi web modern. 
                Spesialisasi saya meliputi pengembangan frontend menggunakan React/Next.js dan backend dengan Supabase dan codeigniter.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Saya memiliki minat kuat dalam projek berbau web dan selalu berusaha menerapkan praktik terbaik ke setiap proyek yang saya kerjakan.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'CodeIgniter', 'MySQL'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full text-sm text-gray-200 shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, backgroundColor: '#3b82f6' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {[
                { title: "Pengalaman", value: "1+ Tahun", color: "from-blue-500 to-cyan-500" },
                { title: "Proyek Selesai", value: "5+", color: "from-purple-500 to-pink-500" },
                { title: "Klien Puas", value: "2", color: "from-amber-500 to-orange-500" },
                { title: "Teknologi", value: "4+", color: "from-emerald-500 to-teal-500" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-gradient-to-br p-0.5 rounded-lg"
                  style={{ backgroundImage: `linear-gradient(to right, ${item.color})` }}
                  variants={itemVariants}
                >
                  <div className="bg-gray-900 p-4 rounded-lg h-full">
                    <h3 className="text-gray-400 text-sm">{item.title}</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent" 
                       style={{ backgroundImage: `linear-gradient(to right, ${item.color})` }}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section: Projects */}
      <section 
        id="proyek" 
        ref={sectionRefs.proyek}
        className="min-h-screen flex items-center justify-center px-4 py-20 relative"
      >
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

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 group"
                variants={itemVariants}
                whileHover={{ 
                  y: -15,
                  boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`h-48 ${project.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-5xl font-bold text-white/20">{index + 1}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button className="text-sm px-3 py-1 bg-white text-gray-900 rounded-full font-medium">
                      Lihat Detail
                    </button>
                  </div>
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
          </motion.div>
        </div>
      </section>

      {/* Section: Contact */}
      <section 
        id="kontak" 
        ref={sectionRefs.kontak}
        className="min-h-screen flex items-center justify-center px-4 py-20 relative"
      >
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="nama" className="block text-sm font-medium text-gray-400 mb-1">Nama</label>
              <input 
                type="text" 
                id="nama"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                placeholder="Nama Anda"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                placeholder="email@contoh.com"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="pesan" className="block text-sm font-medium text-gray-400 mb-1">Pesan</label>
              <textarea 
                id="pesan" 
                name="pesan"
                value={form.pesan}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                placeholder="Pesan Anda..."
                required
              ></textarea>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim...
                  </>
                ) : 'Kirim Pesan'}
              </motion.button>
              
              {status && (
                <motion.p 
                  className={`text-sm mt-3 text-center p-2 rounded-lg ${
                    status.startsWith('✅') ? 'bg-green-900/30 text-green-400' : 
                    status.startsWith('❌') ? 'bg-red-900/30 text-red-400' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  {status}
                </motion.p>
              )}
            </motion.div>
          </form>
          
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-medium text-gray-300 mb-4">Atau hubungi saya melalui:</h3>
            <div className="flex flex-col space-y-3">
              <a href="mailto:Omogokk@gmail.com" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Omogokk@gmail.com
              </a>
              <a href="tel:+628123456789" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                +62 812-3456-789
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            {[
              { 
                name: 'github', 
                url: 'https://github.com/joshcodinglab', 
                svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              },
              { 
                name: 'linkedin', 
                url: 'https://linkedin.com/in/suaganteng', 
                svg: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                aria-label={social.name}
                className="text-gray-400 hover:text-blue-400 transition-colors bg-gray-800 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                <span className="sr-only">{social.name}</span>
                {social.svg}
              </motion.a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Joshua Barani. All rights reserved. Puji Tuhan.
          </p>
        </div>
      </footer>
    </div>
  );
}