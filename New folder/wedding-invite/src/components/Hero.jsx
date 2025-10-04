import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = ({ countdown }) => {
  // Format full date: Hari, Tanggal, Bulan, Tahun
  const targetDate = new Date('2026-05-14T10:00:00');
  const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const hari = hariList[targetDate.getDay()];
  const tanggal = targetDate.getDate();
  const bulan = bulanList[targetDate.getMonth()];
  const tahun = targetDate.getFullYear();
  const fullDate = `${hari}, ${tanggal} ${bulan} ${tahun}`;

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-pastel-pink to-ivory text-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=1&blur=2')" }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="z-10 px-4"
      >
        <h1 className="text-6xl md:text-8xl font-elegant text-gold mb-4">Kami Menikah</h1>
        <p className="text-2xl md:text-4xl font-serif text-rose-gold mb-8">Ahmad & Siti</p>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-6">
          <p className="text-xl font-serif text-gray-700 mb-2">Hari Bahagia Kami</p>
          <div className="text-lg font-bold text-gold mb-4">{fullDate}</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-rose-gold/20 p-2 rounded">
              <div className="text-2xl font-bold text-gold">{countdown.days}</div>
              <div className="text-sm">Hari</div>
            </div>
            <div className="bg-rose-gold/20 p-2 rounded">
              <div className="text-2xl font-bold text-gold">{countdown.hours}</div>
              <div className="text-sm">Jam</div>
            </div>
            <div className="bg-rose-gold/20 p-2 rounded">
              <div className="text-2xl font-bold text-gold">{countdown.minutes}</div>
              <div className="text-sm">Menit</div>
            </div>
            <div className="bg-rose-gold/20 p-2 rounded">
              <div className="text-2xl font-bold text-gold">{countdown.seconds}</div>
              <div className="text-sm">Detik</div>
            </div>
          </div>
        </div>

        <Link to="profile" smooth={true} duration={500} className="mt-8 inline-block bg-gold text-white px-8 py-3 rounded-full font-serif hover:bg-rose-gold transition">
          Jelajahi Undangan
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
