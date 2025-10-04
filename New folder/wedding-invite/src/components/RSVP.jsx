import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';  // Import confetti baru
import { supabase } from '../supabase';  // Import client

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
    attending: 'yes',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);  // State baru untuk confetti
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Mohon isi nama Anda!');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Insert ke Supabase (real backend)
      const { error: supabaseError } = await supabase
        .from('rsvps')
        .insert([{ 
          name: formData.name, 
          guests: parseInt(formData.guests), 
          attending: formData.attending, 
          message: formData.message || null  // Null kalau kosong
        }]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setShowConfetti(true);  // Trigger confetti saat sukses
      setFormData({ name: '', guests: 1, attending: 'yes', message: '' });  // Reset form
      setTimeout(() => {
        setSubmitted(false);
        setShowConfetti(false);  // Stop confetti setelah 3 detik
      }, 3000);
    } catch (err) {
      setError('Gagal mengirim konfirmasi. Coba lagi atau hubungi kami.');
      console.error('Supabase Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 relative">  {/* Relative untuk confetti full screen */}
      <div className="max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-elegant text-gold text-center mb-12"
        >
          Konfirmasi Kehadiran
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-lg font-serif text-gray-700 mb-8 italic"
        >
          Kami menantikan kehadiran Anda untuk merayakan hari bahagia ini. Mohon konfirmasi segera.
        </motion.p>

        {error && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-red-600 font-serif mb-4"
          >
            {error}
          </motion.p>
        )}

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-rose-gold/30 space-y-6"
        >
          {/* Nama */}
          <div>
            <label className="block text-sm font-serif text-gray-700 mb-2">Nama Lengkap *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-rose-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="Nama Anda"
              required
              disabled={loading}
            />
          </div>

          {/* Jumlah Tamu */}
          <div>
            <label className="block text-sm font-serif text-gray-700 mb-2">Jumlah Tamu</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full p-3 border border-rose-gold/30 rounded-lg focus:ring-2 focus:ring-gold"
              disabled={loading}
            >
              <option value={1}>1 Orang</option>
              <option value={2}>2 Orang</option>
              <option value={3}>3 Orang</option>
              <option value={4}>4+ Orang</option>
            </select>
          </div>

          {/* Pilihan Hadir */}
          <div>
            <label className="block text-sm font-serif text-gray-700 mb-2">Apakah Anda akan hadir?</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === 'yes'}
                  onChange={handleChange}
                  className="text-gold"
                  disabled={loading}
                />
                <span className="font-serif text-gray-700">Ya, saya akan hadir</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                  className="text-gold"
                  disabled={loading}
                />
                <span className="font-serif text-gray-700">Maaf, tidak bisa hadir</span>
              </label>
            </div>
          </div>

          {/* Ucapan Selamat */}
          <div>
            <label className="block text-sm font-serif text-gray-700 mb-2">Ucapan Selamat (Opsional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-rose-gold/30 rounded-lg focus:ring-2 focus:ring-gold resize-none"
              placeholder="Doa dan ucapan terbaik untuk pasangan baru..."
              disabled={loading}
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitted || loading}
            className="w-full bg-gold text-white py-4 rounded-lg font-serif text-lg hover:bg-rose-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Mengirim...' : (submitted ? 'Terima Kasih! Data Terkirim' : 'Kirim Konfirmasi')}
          </motion.button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-green-600 font-serif italic"
            >
              Konfirmasi Anda berhasil disimpan! Kami tunggu kehadirannya. 💕
            </motion.p>
          )}
        </motion.form>

        {/* Confetti Animasi (full screen, trigger saat sukses) */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}  // Stop setelah burst
            numberOfPieces={200}  // Banyak confetti
            gravity={0.2}  // Jatuh pelan romantis
            colors={['#FBBF24', '#F59E0B', '#EC4899', '#F3F4F6', '#FCD34D']}  // Warna gold/rose-gold/ivory
            tweenDuration={3000}  // Durasi 3 detik
          />
        )}
      </div>
    </section>
  );
};

export default RSVP;
