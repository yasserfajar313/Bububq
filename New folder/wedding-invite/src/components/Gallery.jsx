import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    'https://picsum.photos/400/600?random=4',  // Prewed 1
    'https://picsum.photos/400/600?random=5',
    'https://picsum.photos/400/600?random=6',
    'https://picsum.photos/400/600?random=7',
    'https://picsum.photos/400/600?random=8',
    'https://picsum.photos/400/600?random=9',
  ];

  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-elegant text-gold text-center mb-12"
        >
          Galeri Cinta Kami
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="overflow-hidden rounded-xl shadow-lg border-2 border-rose-gold/20"
            >
              <img 
                src={src} 
                alt={`Prewed ${index + 1}`}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Opsional: Embed Video (YouTube, ganti link) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-elegant text-rose-gold mb-4">Video Prewedding</h3>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"  // Ganti dengan video asli (misal highlight cinta)
            title="Prewed Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="max-w-2xl mx-auto rounded-xl shadow-lg"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
