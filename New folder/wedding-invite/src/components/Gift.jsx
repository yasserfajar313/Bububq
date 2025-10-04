import { useState } from 'react';
import { motion } from 'framer-motion';

const Gift = () => {
  const [copied, setCopied] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const accounts = [
    { type: 'BCA', number: '1234-5678-90', name: 'Ahmad Santoso' },
    { type: 'Mandiri', number: '9876-5432-10', name: 'Siti Nurhaliza' },
    { type: 'Dana', number: '0812-3456-7890', name: 'Ahmad & Siti' },
    { type: 'OVO', number: '0812-3456-7891', name: 'Ahmad & Siti' },
  ];

  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-elegant text-gold text-center mb-12"
        >
          Hadiah Pernikahan
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-lg font-serif text-gray-700 mb-12 max-w-2xl mx-auto"
        >
          Kehadiran Anda adalah hadiah terbesar bagi kami. Jika ingin memberikan dukungan lebih, berikut detail untuk transfer.
        </motion.p>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-elegant text-rose-gold mb-4">Scan QR Code</h3>
          <img 
            src="/qr-gift.png"  // Upload QR asli ke public/qr-gift.png (atau pakai https://picsum.photos/200/200?random=10 sebagai placeholder)
            alt="QR Code Hadiah"
            className="w-48 h-48 mx-auto rounded-lg shadow-lg border-2 border-gold"
          />
          <p className="text-sm font-serif text-gray-600 mt-2">Scan untuk donasi mudah via e-wallet</p>
        </motion.div>

        {/* Daftar Rekening */}
        <div className="grid md:grid-cols-2 gap-6">
          {accounts.map((acc, index) => (
            <motion.div
              key={acc.type}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-rose-gold/30"
            >
              <h3 className="text-xl font-elegant text-gold mb-2">{acc.type}</h3>
              <p className="font-serif text-gray-700 mb-1">No. Rekening: <span className="font-bold">{acc.number}</span></p>
              <p className="font-serif text-gray-600 text-sm mb-4">a/n {acc.name}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCopy(acc.number)}
                className="w-full bg-rose-gold text-white py-2 rounded-lg font-serif hover:bg-gold transition"
              >
                {copied === acc.number ? 'Tersalin!' : 'Salin Nomor Rekening'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm font-serif text-gray-600 mt-8 italic"
        >
          Terima kasih atas doa dan dukungannya. Semua hadiah akan digunakan untuk membangun rumah tangga bahagia.
        </motion.p>
      </div>
    </section>
  );
};

export default Gift;
