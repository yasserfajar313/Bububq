import { motion } from 'framer-motion';
import { writeToString, generateUid } from 'ics';  // Import ICS library untuk generate .ics

const EventInfo = () => {
  // Detail Akad Nikah (update ke 14 Mei 2026)
  const akadEvent = {
    title: 'Akad Nikah Ahmad & Siti',
    start: [2026, 5, 14, 10, 0], // Tahun, Bulan, Tanggal, Jam, Menit
    duration: { hours: 1 },
    location: 'Masjid Al-Hikmah, Jakarta Selatan',
    description: 'Upacara akad nikah kami. Mohon datang 30 menit lebih awal. Dress code: Formal Elegan. 💕',
    organizer: 'Ahmad & Siti',
  };

  // Detail Resepsi (update ke 14 Mei 2026)
  const resepsiEvent = {
    title: 'Resepsi Pernikahan Ahmad & Siti',
    start: [2026, 5, 14, 12, 0], // Tahun, Bulan, Tanggal, Jam, Menit
    duration: { hours: 6 },
    location: 'Hotel Grand Hyatt, Jakarta',
    description: 'Resepsi pernikahan kami. Dress code: Formal Elegan (putih & gold). RSVP via form. Terima kasih atas kehadirannya! 💍',
    organizer: 'Ahmad & Siti',
  };

  // Function generate & download ICS untuk Akad
  const addAkadToCalendar = () => {
    const { error, value } = writeToString({
      uid: generateUid(akadEvent.title),
      productId: '-//Wedding Invite//EN',
      calscale: 'GREGORIAN',
      events: [
        {
          title: akadEvent.title,
          start: akadEvent.start,
          duration: akadEvent.duration,
          location: akadEvent.location,
          description: akadEvent.description,
          organizer: akadEvent.organizer,
          status: 'CONFIRMED',
          categories: ['Pernikahan', 'Akad Nikah'],
        },
      ],
    });

    if (error) {
      console.error('Error generating Akad ICS:', error);
      alert('Gagal membuat file kalender Akad. Coba lagi!');
      return;
    }

    // Download file .ics
    downloadICS(value, 'Akad-Nikah-Ahmad-Siti.ics');
  };

  // Function generate & download ICS untuk Resepsi
  const addResepsiToCalendar = () => {
    const { error, value } = writeToString({
      uid: generateUid(resepsiEvent.title),
      productId: '-//Wedding Invite//EN',
      calscale: 'GREGORIAN',
      events: [
        {
          title: resepsiEvent.title,
          start: resepsiEvent.start,
          duration: resepsiEvent.duration,
          location: resepsiEvent.location,
          description: resepsiEvent.description,
          organizer: resepsiEvent.organizer,
          status: 'CONFIRMED',
          categories: ['Pernikahan', 'Resepsi'],
        },
      ],
    });

    if (error) {
      console.error('Error generating Resepsi ICS:', error);
      alert('Gagal membuat file kalender Resepsi. Coba lagi!');
      return;
    }

    // Download file .ics
    downloadICS(value, 'Resepsi-Pernikahan-Ahmad-Siti.ics');
  };

  // Helper function untuk download ICS (reusable)
  const downloadICS = (icsContent, filename) => {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    console.log(`${filename} downloaded!`);  // Debug log
  };

  return (
    <section className="py-20 px-4 bg-pastel-pink/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-elegant text-gold text-center mb-12"
        >
          Informasi Acara
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-rose-gold/30"
          >
            <h3 className="text-2xl font-elegant text-rose-gold mb-4 text-center">Akad Nikah</h3>
            <div className="space-y-3 font-serif text-gray-700">
              <p><span className="font-bold">Tanggal:</span> 14 Mei 2026</p>
              <p><span className="font-bold">Waktu:</span> 10:00 WIB</p>
              <p><span className="font-bold">Tempat:</span> Masjid Al-Hikmah, Jakarta Selatan</p>
              <p className="text-sm italic mt-4">Mohon datang 30 menit lebih awal.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addAkadToCalendar}
              className="mt-6 w-full bg-gold text-white py-3 rounded-lg font-serif hover:bg-rose-gold transition"
            >
              📅 Simpan ke Kalender
            </motion.button>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-rose-gold/30"
          >
            <h3 className="text-2xl font-elegant text-rose-gold mb-4 text-center">Resepsi</h3>
            <div className="space-y-3 font-serif text-gray-700">
              <p><span className="font-bold">Tanggal:</span> 14 Mei 2026</p>
              <p><span className="font-bold">Waktu:</span> 12:00 WIB - Selesai</p>
              <p><span className="font-bold">Tempat:</span> Hotel Grand Hyatt, Jakarta</p>
              <p className="text-sm italic mt-4">Dress code: Formal Elegan (putih & gold).</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addResepsiToCalendar}
              className="mt-6 w-full bg-gold text-white py-3 rounded-lg font-serif hover:bg-rose-gold transition"
            >
              📅 Simpan ke Kalender
            </motion.button>
          </motion.div>
        </div>

        {/* Google Maps Embed (Lokasi Resepsi) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
        >
          <h3 className="text-2xl font-elegant text-gold p-6 text-center bg-pastel-pink/50">Lokasi Acara</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.309346383!2d106.829518!3d-6.211376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4e8d5b2b5b7%3A0x1a0b0b0b0b0b0b0b!2sGrand%20Hyatt%20Jakarta!5e0!3m2!1sen!2sid!4v1690000000000"  // Embed Grand Hyatt (ganti kalau lokasi beda)
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Resepsi"
            className="w-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default EventInfo;
