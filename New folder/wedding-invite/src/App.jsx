import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { supabase } from './supabase';  // Import Supabase client
import Hero from './components/Hero';
import Profile from './components/Profile';
import EventInfo from './components/EventInfo';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Gift from './components/Gift';
import Footer from './components/Footer';

function App() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  // ...existing code...
  const audioRef = useRef(null);  // Ref untuk audio element
  const hasInteracted = useRef(false);  // Track user interaction untuk unmute
  const hasAttemptedPlay = useRef(false);  // Track retry play

  // Countdown logic
  useEffect(() => {
    // Target date: 14 Mei 2026 jam 10:00 WIB
    const targetDate = new Date('2026-05-14T10:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch initial RSVP count & setup realtime subscription (internal, no display)
  useEffect(() => {
    const fetchRsvpCount = async () => {
      const { count, error } = await supabase
        .from('rsvps')
        .select('attending', { count: 'exact', head: true })
        .eq('attending', 'yes');
      if (error) {
        console.error('Error fetching RSVP count:', error);
      } else {
        console.log('Initial RSVP count:', count || 0);  // Log untuk debug
      }
    };

    fetchRsvpCount();

    const subscription = supabase
      .channel('rsvps-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rsvps',
          filter: 'attending=eq.yes',
        },
        () => {
          // ...existing code...
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Autoplay musik agresif: Start muted + retry unmute setelah load
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasAttemptedPlay.current) return;

    const initAudio = () => {
      audio.volume = 0.3;  // Volume 30% romantis
      audio.muted = true;  // Muted awal untuk lolos policy
      console.log('Initializing audio...');

      // Play muted awal (langsung start loop)
      audio.play().then(() => {
        console.log('Musik autoplay started (muted, retrying unmute...)');
        hasAttemptedPlay.current = true;

        // Retry unmute setelah 1 detik (coba suara langsung)
        setTimeout(() => {
          if (audio) {
            audio.muted = false;
            audio.play().then(() => {
              console.log('Musik suara on via retry!');
            }).catch((err) => {
              console.log('Retry unmute blocked (need interact):', err);
            });
          }
        }, 1000);
      }).catch((err) => {
        console.error('Initial autoplay failed:', err);
        hasAttemptedPlay.current = true;
      });
    };

    // Trigger init setelah DOM load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAudio);
    } else {
      initAudio();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', initAudio);
    };
  }, []);

  // Unmute on user interaction (lebih banyak events)
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted.current && audioRef.current) {
        const audio = audioRef.current;
        audio.muted = false;  // Unmute suara
        audio.play().then(() => {
          console.log('User  interacted: Musik suara on!');
        }).catch((err) => {
          console.log('Interact unmute failed:', err);
        });
        hasInteracted.current = true;
      }
    };

    // Events: click, scroll, touch, keydown, visibilitychange (tab active)
    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) handleInteraction();  // Unmute kalau tab active lagi
    });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('visibilitychange', () => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden relative">
      {/* Audio Background (autoplay + autoPlay attribute, loop) */}
      <audio
        ref={audioRef}
        src="/bubub30.mp3"  // File dari public/ - pastikan ada!
        loop
        preload="auto"
        autoPlay  // Attribute baru: Langsung play saat load
        className="hidden"
        onLoadStart={() => console.log('Audio loading...')}  // Log debug
        onCanPlay={() => console.log('Audio ready to play')}  // Log debug
        onError={(e) => console.error('Audio error:', e)}  // Log kalau file rusak
      />

      {/* Petals jatuh background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Hero (no RSVP count) */}
      <Hero countdown={countdown} />
      
      {/* Sections */}
      <motion.section
        id="profile"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Profile />
      </motion.section>
      
      <motion.section
        id="event"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <EventInfo />
      </motion.section>
      
      <motion.section
        id="gallery"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Gallery />
      </motion.section>
      
      <motion.section
        id="rsvp"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <RSVP />
      </motion.section>
      
      <motion.section
        id="gift"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Gift />
      </motion.section>
      
      <Footer />
    </div>
  );
}

export default App;
