import { motion } from 'motion/react';
import { Trophy, TrendingUp, Swords, UserPlus, MessageCircle } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  title: string;
  rank: string;
  stage: string;
  level: number;
  spirit: number;
  avatar: string;
}

interface FriendsPageProps {
  onStartChat: (friendId: string) => void;
  onNavigateToAddFriend: () => void;
}

export default function FriendsPage({ onStartChat, onNavigateToAddFriend }: FriendsPageProps) {
  const friends: Friend[] = [
    {
      id: '1',
      name: '青云子',
      title: '剑道修士',
      rank: '金丹',
      stage: '中期',
      level: 5,
      spirit: 8640,
      avatar: '⚔️'
    },
    {
      id: '2',
      name: '长河散人',
      title: '丹道宗师',
      rank: '元婴',
      stage: '初期',
      level: 6,
      spirit: 12400,
      avatar: '🔮'
    },
    {
      id: '3',
      name: '寒月仙子',
      title: '法术天才',
      rank: '金丹',
      stage: '后期',
      level: 5,
      spirit: 9200,
      avatar: '❄️'
    },
    {
      id: '4',
      name: '玄木道人',
      title: '符箓大师',
      rank: '筑基',
      stage: '大圆满',
      level: 4,
      spirit: 4850,
      avatar: '📜'
    },
    {
      id: '5',
      name: '烈火真君',
      title: '炼器师',
      rank: '金丹',
      stage: '初期',
      level: 5,
      spirit: 7320,
      avatar: '🔥'
    }
  ];

  // Sort by spirit power
  const sortedFriends = [...friends].sort((a, b) => b.spirit - a.spirit);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 pb-8">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1723536998245-9eb3118507a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYnJvbnplJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjM3OTg4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        />
      </div>

      {/* Header */}
      <div className="relative px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Swords className="w-4 h-4 text-teal-500/60" strokeWidth={1.5} />
            <p className="text-teal-400/60 text-xs tracking-[0.3em]">修仙界榜单</p>
            <Swords className="w-4 h-4 text-teal-500/60" strokeWidth={1.5} />
          </div>
          <h1 className="text-xl tracking-wide text-teal-100">
            道友风云录
          </h1>
        </motion.div>

        {/* Ranking monument */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-36 overflow-hidden rounded-lg mb-6"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(20, 184, 166, 0.1)'
          }}
        >
          {/* Bronze texture overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #14b8a6 2px, #14b8a6 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, #14b8a6 2px, #14b8a6 3px)'
          }} />

          {/* Monument text */}
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-center"
            >
              <Trophy className="w-10 h-10 mx-auto mb-3 text-amber-500/60" strokeWidth={1.5} />
              <p className="text-teal-300/80 text-sm tracking-[0.3em]">修仙榜</p>
            </motion.div>
          </div>

          {/* Floating runes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${40 + Math.sin(i) * 20}%`
              }}
              animate={{
                y: [-8, -20, -8],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        </motion.div>
      </div>

      {/* Friends list */}
      <div className="px-5 space-y-3 mb-6">
        {sortedFriends.map((friend, i) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ x: 4 }}
            className="relative group"
          >
            <div 
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4 transition-all duration-300 hover:border-teal-700/50"
              style={{
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #14b8a6 10px, #14b8a6 11px)'
              }} />

              {/* Rank badge */}
              {i < 3 && (
                <div className="absolute top-3 right-3">
                  <div className={`w-8 h-8 rounded border-2 flex items-center justify-center ${
                    i === 0 ? 'bg-gradient-to-br from-amber-600/40 to-amber-700/30 border-amber-500/60' :
                    i === 1 ? 'bg-gradient-to-br from-slate-600/40 to-slate-700/30 border-slate-400/60' :
                    'bg-gradient-to-br from-amber-800/40 to-amber-900/30 border-amber-700/60'
                  }`}>
                    <span className={`text-xs font-medium ${
                      i === 0 ? 'text-amber-300' : i === 1 ? 'text-slate-300' : 'text-amber-500/80'
                    }`}>
                      {i + 1}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStartChat(friend.id)}
                  className="relative flex-shrink-0"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2 opacity-20"
                  >
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="30" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
                    </svg>
                  </motion.div>
                  <div className="relative w-16 h-16 rounded bg-gradient-to-br from-slate-900/60 to-teal-950/60 border-2 border-teal-700/40 flex items-center justify-center text-2xl hover:border-teal-600/60 transition-colors">
                    {friend.avatar}
                  </div>
                </motion.button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <h3 className="text-teal-100 tracking-wide mb-1">{friend.name}</h3>
                    <p className="text-teal-400/60 text-xs tracking-wide">{friend.title}</p>
                  </div>

                  {/* Rank */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-0.5 rounded bg-slate-950/50 border border-teal-800/40">
                      <span className="text-amber-400 text-xs tracking-wider">{friend.rank}</span>
                    </div>
                    <span className="text-teal-400/60 text-xs">·</span>
                    <span className="text-teal-400/60 text-xs">{friend.stage}</span>
                    <span className="text-teal-400/60 text-xs">·</span>
                    <span className="text-teal-400/60 text-xs">LV.{friend.level}</span>
                  </div>

                  {/* Spirit power */}
                  <div className="flex items-center justify-between">
                    <span className="text-teal-400/60 text-xs">灵力</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-teal-500/80" strokeWidth={1.5} />
                      <span className="text-amber-400 text-sm">{friend.spirit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover accent */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500/50 to-amber-500/50"
              />

              {/* Chat button */}
              <button
                className="absolute top-3 left-3 bg-teal-500/60 rounded-full p-1.5"
                onClick={() => onStartChat(friend.id)}
              >
                <MessageCircle className="w-4 h-4 text-teal-100" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-center px-5"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="w-1 h-1 bg-teal-500/60 rotate-45"
            />
          ))}
        </div>
        <p className="text-teal-400/40 text-xs tracking-[0.2em]">
          道友同行 · 互勉共进
        </p>
      </motion.div>

      {/* Add Friend Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="px-5 mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNavigateToAddFriend}
          className="w-full relative overflow-hidden rounded-lg p-4"
          style={{
            background: 'linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%)',
            boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)'
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
            }}
          />
          <div className="relative flex items-center justify-center gap-2">
            <UserPlus className="w-5 h-5 text-slate-950" strokeWidth={2} />
            <span className="tracking-wider text-slate-950 font-medium">添加道友</span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}