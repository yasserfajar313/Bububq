import { motion } from 'framer-motion';

const Footer = () => {
  const quotes = [
    '"Cinta itu bukan menatap satu sama lain, tapi menatap ke arah yang sama." - Antoine de Saint-Exupéry',
    '"Ya Allah, jadikanlah rumah tangga kami penuh berkah dan keharmonisan." - Doa Sederhana',
    '"Dari hati yang saling mencinta, lahir janji abadi." - Pasangan Kami',
  ];

  return (
    <footer className="py-20 px-4 bg-pastel-pink/30 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h2 className="text-4xl font-elegant text-gold mb-8">Terima Kasih</h2>

        {/* Quotes Romantis */}
        <div className="space-y-6">
          {quotes.map((quote, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-lg font-serif text-gray-700 italic bg-white/50 p-4 rounded-lg shadow-md max-w-2xl mx-auto"
            >
              {quote}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <p className="text-xl font-serif text-rose-gold">
            Terima kasih atas doa restu dan kehadiran Anda. Semoga Allah membalas kebaikan Anda.
          </p>
          <p className="text-sm font-serif text-gray-600">
            Dibuat dengan ❤️ untuk hari istimewa kami. Kontak: +62 812-3456-7890 | email@wedding.com
          </p>
        </motion.div>

        {/* Animasi sederhana: Hearts fade in/out (opsional, romantis) */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2 + i * 0.5, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="text-2xl text-rose-gold"
            >
              💕
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-sm font-serif text-gray-500 mt-12 border-t border-rose-gold/20 pt-6"
      >
        © 2025 Ahmad & Siti. Semua hak cipta dilindungi.
      </motion.p>
    </footer>
  );
};

export default Footer;
