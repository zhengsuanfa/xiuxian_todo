import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Eye, Dumbbell, BookOpen, Home, Clock, Repeat, ChevronRight, Hexagon } from 'lucide-react';
import type { Task } from '../App';

interface CreateTaskPageProps {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void;
  onClose: () => void;
}

export default function CreateTaskPage({ onAdd, onClose }: CreateTaskPageProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'灵识任务' | '体修任务' | '心法任务' | '杂务'>('灵识任务');
  const [priority, setPriority] = useState(1);
  const [reminder, setReminder] = useState('');
  const [repeat, setRepeat] = useState(false);

  const categories = [
    { value: '灵识任务' as const, icon: Eye, desc: '专注任务' },
    { value: '体修任务' as const, icon: Dumbbell, desc: '健身炼体' },
    { value: '心法任务' as const, icon: BookOpen, desc: '学习阅读' },
    { value: '杂务' as const, icon: Home, desc: '生活琐事' }
  ];

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    onAdd({
      title: title.trim(),
      category,
      priority,
      reminder: reminder || undefined,
      repeat: repeat || undefined,
      date: '2025-11-22'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 overflow-y-auto"
    >
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-teal-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, -60],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen px-5 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-px bg-gradient-to-r from-transparent to-teal-600" />
              <p className="text-teal-400/60 text-xs tracking-[0.3em]">创建灵修</p>
            </div>
            <h2 className="text-xl tracking-wide text-teal-100">
              立下修行誓言
            </h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-teal-400/60 hover:text-teal-400 transition-colors"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* Scroll decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6"
        >
          {/* Top seal */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <Hexagon className="w-8 h-8 text-teal-600/40" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-amber-500/60 rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Scroll body */}
          <div 
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/90 to-teal-950/50 backdrop-blur-sm border-2 border-teal-800/30 shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(20, 184, 166, 0.1)'
            }}
          >
            {/* Jade texture overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, #14b8a6 12px, #14b8a6 13px)'
            }} />

            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

            <div className="relative p-6 space-y-6">
              {/* Task title input */}
              <div>
                <label className="block text-teal-300/80 text-sm mb-3 tracking-wide flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-amber-500" />
                  修行内容
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="输入你要完成的修行任务..."
                  className="w-full bg-slate-950/60 border-2 border-teal-900/40 rounded px-4 py-3 text-teal-100 placeholder-teal-700/40 focus:outline-none focus:border-teal-700/60 transition-colors"
                  autoFocus
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>

              {/* Category selection */}
              <div>
                <label className="block text-teal-300/80 text-sm mb-3 tracking-wide flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-amber-500" />
                  修行类型
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.value}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCategory(cat.value)}
                      className={`relative overflow-hidden rounded-lg border-2 p-4 transition-all ${
                        category === cat.value
                          ? 'bg-gradient-to-br from-teal-900/40 to-slate-900/60 border-teal-700/60'
                          : 'bg-slate-900/40 border-teal-900/20 hover:border-teal-800/40'
                      }`}
                      style={{
                        boxShadow: category === cat.value ? '0 0 15px rgba(20, 184, 166, 0.2)' : 'none'
                      }}
                    >
                      {category === cat.value && (
                        <motion.div
                          layoutId="category-selected"
                          className="absolute inset-0 bg-teal-600/10"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className="relative flex flex-col items-center gap-2">
                        <cat.icon 
                          className={`w-6 h-6 ${category === cat.value ? 'text-teal-400' : 'text-teal-600/60'}`} 
                          strokeWidth={1.5} 
                        />
                        <div className="text-center">
                          <p className={`text-sm mb-0.5 ${category === cat.value ? 'text-teal-200' : 'text-teal-400/60'}`}>
                            {cat.value}
                          </p>
                          <p className={`text-xs ${category === cat.value ? 'text-teal-400/60' : 'text-teal-600/40'}`}>
                            {cat.desc}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Priority - Spiritual weight */}
              <div>
                <label className="block text-teal-300/80 text-sm mb-3 tracking-wide flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-amber-500" />
                  灵力权重（优先级）
                </label>
                <div className="flex gap-3">
                  {[
                    { level: 1, label: '普通', runes: 1 },
                    { level: 2, label: '重要', runes: 2 },
                    { level: 3, label: '紧急', runes: 3 }
                  ].map((item) => (
                    <motion.button
                      key={item.level}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPriority(item.level)}
                      className={`flex-1 rounded-lg border-2 p-3 text-center transition-all ${
                        priority === item.level
                          ? 'bg-gradient-to-br from-amber-900/40 to-slate-900/60 border-amber-700/60'
                          : 'bg-slate-900/40 border-teal-900/20 hover:border-teal-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-0.5 mb-2">
                        {[...Array(item.runes)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rotate-45 ${
                              priority === item.level ? 'bg-amber-500' : 'bg-teal-700/40'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs ${priority === item.level ? 'text-amber-300' : 'text-teal-400/60'}`}>
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-800/40 to-transparent" />
                <div className="w-1 h-1 bg-teal-700/40 rotate-45" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-teal-800/40 to-transparent" />
              </div>

              {/* Options */}
              <div className="space-y-3">
                {/* Time reminder */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/40 border border-teal-900/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
                    <span className="text-teal-200 text-sm">时间提醒</span>
                  </div>
                  <input
                    type="time"
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value)}
                    className="bg-slate-950/60 border border-teal-900/40 rounded px-3 py-1.5 text-sm text-teal-200 focus:outline-none focus:border-teal-700/60"
                  />
                </div>

                {/* Repeat toggle */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRepeat(!repeat)}
                  className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-950/40 border border-teal-900/30 hover:border-teal-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Repeat className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
                    <span className="text-teal-200 text-sm">灵根周期（重复）</span>
                  </div>
                  <div className={`relative w-11 h-6 rounded-full transition-colors ${
                    repeat ? 'bg-teal-700/60' : 'bg-slate-800/60'
                  }`}>
                    <motion.div
                      animate={{ x: repeat ? 20 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full border ${
                        repeat 
                          ? 'bg-teal-500 border-teal-400' 
                          : 'bg-slate-700 border-slate-600'
                      }`}
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom seal */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-1 bg-teal-600/40 rotate-45"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Submit button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full relative overflow-hidden rounded-lg p-4 disabled:opacity-40 disabled:cursor-not-allowed group"
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
            <span className="tracking-wider text-slate-950 font-medium">立下誓言 · 开始修行</span>
            <ChevronRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
