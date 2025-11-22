import { motion } from 'motion/react';
import { TrendingUp, Award, Flame, Calendar, Eye, Dumbbell, BookOpen, Hexagon, Settings } from 'lucide-react';
import type { Task } from '../App';

interface ProfilePageProps {
  userLevel: {
    rank: string;
    stage: string;
    level: number;
    exp: number;
    nextLevelExp: number;
    attributes: {
      diligence: number;
      wisdom: number;
      body: number;
    };
  };
  tasks: Task[];
  onOpenUserCenter: () => void;
}

export default function ProfilePage({ userLevel, tasks, onOpenUserCenter }: ProfilePageProps) {
  const totalCompleted = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  const stats = [
    { label: '连续修行', value: '7天', icon: Flame },
    { label: '累计任务', value: `${totalCompleted}`, icon: Award },
    { label: '修行天数', value: '42天', icon: Calendar },
    { label: '今日完成', value: `${totalCompleted}/${totalTasks}`, icon: TrendingUp }
  ];

  const milestones = [
    { level: 1, name: '凡人', threshold: 0, completed: true },
    { level: 2, name: '练气', threshold: 500, completed: true },
    { level: 3, name: '筑基', threshold: 2000, completed: true },
    { level: 4, name: '结丹', threshold: 5000, completed: false },
    { level: 5, name: '元婴', threshold: 10000, completed: false },
    { level: 6, name: '化神', threshold: 20000, completed: false }
  ];

  const attributes = [
    { name: '勤奋灵根', value: userLevel.attributes.diligence, icon: Flame, desc: '连续修行天数' },
    { name: '心法灵根', value: userLevel.attributes.wisdom, icon: BookOpen, desc: '学习任务完成' },
    { name: '体修灵根', value: userLevel.attributes.body, icon: Dumbbell, desc: '健身任务完成' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 pb-8">
      {/* Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-15 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1676737901958-9f68e84a8bdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBtaXN0JTIwbW91bnRhaW58ZW58MXx8fHwxNzYzNzk4ODk1fDA&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/80 via-teal-950/60 to-slate-950/90 pointer-events-none" />

      {/* Content */}
      <div className="relative px-5 pt-12 pb-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10" />
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-teal-600" />
                <p className="text-teal-400/60 text-xs tracking-[0.3em]">修为境界</p>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-teal-600" />
              </div>
              <h1 className="text-xl tracking-wide text-teal-100">
                道途无涯 · 唯勤是岸
              </h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onOpenUserCenter}
              className="w-10 h-10 rounded-lg bg-slate-900/60 border-2 border-teal-900/30 flex items-center justify-center text-teal-400/60 hover:border-teal-700/50 transition-colors"
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
            </motion.button>
          </div>
        </motion.div>

        {/* Main cultivation card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-lg mb-6"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(20, 184, 166, 0.15)'
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, #14b8a6 15px, #14b8a6 16px)'
          }} />

          {/* Top jade line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

          {/* Glow effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"
          />

          <div className="relative p-8 text-center">
            {/* Formation circle */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-6"
                >
                  <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-30">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="0.3" />
                  </svg>
                </motion.div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-slate-900/80 to-teal-950/80 rounded border-2 border-teal-700/50 flex items-center justify-center shadow-xl">
                  <Hexagon className="w-12 h-12 text-teal-500" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
                </div>
              </div>
            </motion.div>

            {/* Rank */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-3xl mb-2 tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">
                {userLevel.rank}
              </h2>
              <p className="text-teal-300/80 tracking-widest text-sm">{userLevel.stage} · LV.{userLevel.level}</p>
            </motion.div>

            {/* EXP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-teal-400/60">灵力值</span>
                <span className="text-amber-400 tracking-wider">{userLevel.exp} / {userLevel.nextLevelExp}</span>
              </div>
              <div className="relative h-3 bg-slate-950/80 rounded-sm overflow-hidden border-2 border-teal-900/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(userLevel.exp / userLevel.nextLevelExp) * 100}%` }}
                  transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
                  className="h-full relative"
                  style={{
                    background: 'linear-gradient(90deg, #14b8a6 0%, #f59e0b 100%)'
                  }}
                >
                  <motion.div
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/70 to-teal-950/30 backdrop-blur-sm border-2 border-teal-800/20 p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <stat.icon className="w-5 h-5 text-teal-400/70" strokeWidth={1.5} />
                <span className="text-amber-400 tracking-wider">{stat.value}</span>
              </div>
              <p className="text-teal-300/60 text-xs tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Spirit attributes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-5 mb-6"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
            <h3 className="text-teal-200 tracking-wider text-sm">灵根属性</h3>
          </div>

          <div className="space-y-4">
            {attributes.map((attr, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <attr.icon className="w-4 h-4 text-teal-400/70" strokeWidth={1.5} />
                    <span className="text-teal-200 text-sm">{attr.name}</span>
                  </div>
                  <span className="text-amber-400 text-sm">{attr.value}</span>
                </div>
                <div className="relative h-2 bg-slate-950/60 rounded-sm overflow-hidden border border-teal-900/40">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attr.value}%` }}
                    transition={{ duration: 1.5, delay: 0.9 + i * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-teal-600 to-amber-500"
                  />
                </div>
                <p className="text-teal-400/50 text-xs mt-1">{attr.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cultivation path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-5"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
            <h3 className="text-teal-200 tracking-wider text-sm">修为之路</h3>
          </div>

          <div className="relative">
            {/* Path line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-600/60 via-teal-700/40 to-transparent" />

            {/* Milestones */}
            <div className="space-y-5">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="relative flex items-center gap-4"
                >
                  {/* Node */}
                  <div className={`relative z-10 w-12 h-12 border-2 flex items-center justify-center transition-all ${
                    milestone.completed
                      ? 'bg-gradient-to-br from-teal-800/60 to-amber-800/40 border-amber-600/80 rounded'
                      : 'bg-slate-950/80 border-teal-800/30 rounded'
                  }`}>
                    {milestone.completed ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
                      >
                        <Award className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                      </motion.div>
                    ) : (
                      <span className="text-teal-700/40 text-xs">{milestone.level}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className={`mb-1 text-sm ${milestone.completed ? 'text-teal-200' : 'text-teal-400/50'}`}>
                      {milestone.name}境
                    </p>
                    <p className="text-teal-400/50 text-xs">
                      需灵力 {milestone.threshold.toLocaleString()}
                    </p>
                  </div>

                  {milestone.completed && milestone.level === userLevel.level && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-2 py-1 rounded bg-teal-900/40 border border-teal-700/40"
                    >
                      <span className="text-teal-300 text-xs">当前</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-6 pt-5 border-t border-teal-800/20 text-center"
          >
            <p className="text-teal-400/50 text-xs tracking-[0.2em] italic">
              "修行路漫漫，唯有持之以恒，方能悟道成仙"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}