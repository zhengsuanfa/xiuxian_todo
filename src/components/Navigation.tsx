import { motion } from 'motion/react';
import { Home, Users, User, Calendar, MessageCircle } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'friends' | 'profile' | 'calendar' | 'messages';
  onNavigate: (page: 'home' | 'friends' | 'profile' | 'calendar' | 'messages') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: '修行' },
    { id: 'calendar' as const, icon: Calendar, label: '日历' },
    { id: 'friends' as const, icon: Users, label: '道友' },
    { id: 'messages' as const, icon: MessageCircle, label: '传音' },
    { id: 'profile' as const, icon: User, label: '修为' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="px-4 pb-4">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative overflow-hidden rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(19, 78, 74, 0.95) 100%)',
            boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(20, 184, 166, 0.15)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, #14b8a6 15px, #14b8a6 16px)'
          }} />

          {/* Top accent line with animation */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-700/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-700/30 rounded-tr-lg" />

          <div className="relative flex items-center justify-around p-1.5">
            {tabs.map((tab) => {
              const isActive = currentPage === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onNavigate(tab.id)}
                  className="relative flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-colors flex-1"
                >
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-gradient-to-br from-teal-800/40 to-amber-900/30 rounded-lg border border-teal-700/40"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                          boxShadow: '0 0 15px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(20, 184, 166, 0.1)'
                        }}
                      />
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        animate={{
                          opacity: [0, 0.3, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        style={{
                          background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.3), transparent)'
                        }}
                      />
                    </>
                  )}
                  
                  <div className="relative">
                    <tab.icon
                      className={`w-5 h-5 transition-all ${
                        isActive ? 'text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'text-teal-600/60'
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    
                    {isActive && (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1"
                        >
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-500 rounded-full"
                        />
                      </>
                    )}
                  </div>
                  
                  <span className={`relative text-xs transition-all tracking-wide ${
                    isActive ? 'text-teal-300 drop-shadow-[0_0_4px_rgba(20,184,166,0.3)]' : 'text-teal-600/60'
                  }`}>
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}