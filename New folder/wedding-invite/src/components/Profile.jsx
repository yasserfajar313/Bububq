import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <section id="profile" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-elegant text-gold text-center mb-12"
      >
        Tentang Kami
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Mempelai 1 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-center"
        >
          <img 
            src="https://picsum.photos/300/400?random=2" 
            alt="Ahmad" 
            className="w-64 h-80 object-cover rounded-full mx-auto mb-4 shadow-lg border-4 border-rose-gold"
          />
          <h3 className="text-2xl font-elegant text-gold">Ahmad Santoso</h3>
          <p className="text-gray-600 font-serif">Lahir: 15 Mei 1995<br/>Pekerjaan: Software Engineer<br/>Hobi: Traveling & Memasak</p>
        </motion.div>

        {/* Cerita Cinta */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <p className="text-lg font-serif text-gray-700 leading-relaxed italic">
            "Pertemuan kami seperti takdir yang ditulis di bintang-bintang. Dari pertemuan pertama di kafe kecil itu, hati kami saling memanggil. Perjalanan cinta ini penuh tawa, air mata, dan mimpi bersama. Kini, kami siap melangkah ke pelaminan, berjanji setia selamanya."
          </p>
          {/* Mempelai 2 */}
          <div className="text-center">
            <img 
              src="https://picsum.photos/300/400?random=3" 
              alt="Siti" 
              className="w-64 h-80 object-cover rounded-full mx-auto mb-4 shadow-lg border-4 border-rose-gold"
            />
            <h3 className="text-2xl font-elegant text-gold">Siti Nurhaliza</h3>
            <p className="text-gray-600 font-serif">Lahir: 20 Agustus 1996<br/>Pekerjaan: Desainer Grafis<br/>Hobi: Membaca & Berkebun</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
