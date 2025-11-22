import { motion } from 'motion/react';
import { Hexagon } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600639427380-4439114b7ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW91bnRhaW4lMjBzaWxob3VldHRlfGVufDF8fHx8MTc2Mzc5ODg5NHww&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
      />
      
      {/* Dark overlay with teal tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-teal-950/60 to-slate-950/90" />
      
      {/* Mist layers */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-teal-900/20 to-transparent"
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-30, -80],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-8">
        {/* Formation circle logo */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
          className="mb-12"
        >
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <svg width="140" height="140" viewBox="0 0 140 140" className="absolute -inset-4">
                <circle cx="70" cy="70" r="60" fill="none" stroke="url(#grad1)" strokeWidth="0.5" opacity="0.6" />
                <circle cx="70" cy="70" r="50" fill="none" stroke="url(#grad1)" strokeWidth="0.3" opacity="0.4" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Inner glow */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-amber-500/30 rounded-full blur-2xl"
            />

            {/* Center hexagon formation */}
            <div className="relative bg-gradient-to-br from-slate-900/80 to-teal-950/80 backdrop-blur-sm p-10 rounded-full border-2 border-teal-700/40 shadow-2xl">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Hexagon className="w-14 h-14 text-amber-500" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
              </motion.div>
              
              {/* Corner accents */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-45px)`
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-center"
        >
          <motion.h1 
            className="text-5xl mb-6 tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-amber-400"
            style={{
              textShadow: '0 0 30px rgba(20, 184, 166, 0.3)'
            }}
          >
            修仙ToDo
          </motion.h1>
          
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '40px' }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent to-teal-600"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring' }}
              className="w-1.5 h-1.5 bg-amber-500 rotate-45"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '40px' }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-px bg-gradient-to-l from-transparent to-teal-600"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-teal-300/80 tracking-[0.2em] text-sm"
          >
            人生即修行，每日皆历练
          </motion.p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-20 flex gap-1.5"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-1.5 h-1.5 bg-teal-500/80 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
