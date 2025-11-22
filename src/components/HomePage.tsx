import { motion } from 'motion/react';
import { Plus, Eye, Dumbbell, BookOpen, Home as HomeIcon, ChevronDown, Check, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import TaskCard from './TaskCard';
import GuideModal from './GuideModal';
import type { Task } from '../App';

interface HomePageProps {
  tasks: Task[];
  userLevel: {
    rank: string;
    stage: string;
    level: number;
    exp: number;
    nextLevelExp: number;
  };
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onCreateTask: () => void;
}

export default function HomePage({ tasks, userLevel, onToggleTask, onDeleteTask, onCreateTask }: HomePageProps) {
  const todayTasks = tasks.filter(t => t.date === '2025-11-22');
  const completedCount = todayTasks.filter(t => t.completed).length;
  const progress = (userLevel.exp / userLevel.nextLevelExp) * 100;

  const categoryStats = [
    { category: '灵识任务', icon: Eye, count: todayTasks.filter(t => t.category === '灵识任务').length, completed: todayTasks.filter(t => t.category === '灵识任务' && t.completed).length },
    { category: '体修任务', icon: Dumbbell, count: todayTasks.filter(t => t.category === '体修任务').length, completed: todayTasks.filter(t => t.category === '体修任务' && t.completed).length },
    { category: '心法任务', icon: BookOpen, count: todayTasks.filter(t => t.category === '心法任务').length, completed: todayTasks.filter(t => t.category === '心法任务' && t.completed).length }
  ];

  const [showCompleted, setShowCompleted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950">
      {/* Mountain silhouette background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div 
          className="absolute inset-0 bg-cover bg-bottom"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600639427380-4439114b7ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW91bnRhaW4lMjBzaWxob3VldHRlfGVufDF8fHx8MTc2Mzc5ODg5NHww&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom'
          }}
        />
      </div>

      {/* Floating spirit particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, -60],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative px-5 pt-12 pb-6">
        {/* Guide button - top left */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowGuide(true)}
          className="absolute top-12 left-5 z-10 w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/60 backdrop-blur-sm border-2 border-teal-800/40 flex items-center justify-center group"
          style={{
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(20, 184, 166, 0.1)'
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 rounded-lg opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, #14b8a6 8px, #14b8a6 9px)'
          }} />
          
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <HelpCircle className="w-5 h-5 text-teal-400 group-hover:text-amber-400 transition-colors relative z-10" strokeWidth={1.5} />
          </motion.div>

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-teal-500/0 group-hover:bg-teal-500/20 transition-colors"
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-600/40 rounded-tl" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-600/40 rounded-br" />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-2 px-3 py-1.5 rounded bg-slate-900/95 border border-teal-800/40 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <p className="text-teal-300 text-xs">修仙指南</p>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-4 border-transparent border-r-slate-900/95" />
          </motion.div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-teal-600" />
            <p className="text-teal-400/60 text-xs tracking-[0.3em]">今日修行</p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-teal-600" />
          </div>
          <h1 className="text-xl tracking-wide text-teal-100">
            洞府清修 · 万法归宗
          </h1>
        </motion.div>

        {/* Cultivation status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/90 to-teal-950/50 backdrop-blur-sm border-2 border-teal-800/30 shadow-2xl"
          style={{
            boxShadow: '0 0 30px rgba(20, 184, 166, 0.1), inset 0 1px 0 rgba(20, 184, 166, 0.1)'
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #14b8a6 10px, #14b8a6 11px)'
          }} />

          {/* Top jade accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

          <div className="relative p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2 opacity-30"
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
                      <circle cx="24" cy="24" r="16" fill="none" stroke="#f59e0b" strokeWidth="0.3" />
                    </svg>
                  </motion.div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-teal-900/60 to-slate-900/60 rounded border border-teal-700/40 flex items-center justify-center">
                    <span className="text-lg">{['凡', '练', '筑', '结', '元'][userLevel.level - 1]}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-amber-400 tracking-wider text-sm mb-0.5">{userLevel.rank} · {userLevel.stage}</h2>
                  <p className="text-teal-400/60 text-xs tracking-wider">境界 LV.{userLevel.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-teal-400/60 text-xs mb-1">灵力值</p>
                <p className="text-amber-400 text-sm tracking-wider">{userLevel.exp} / {userLevel.nextLevelExp}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-slate-950/80 rounded-sm overflow-hidden border border-teal-900/40">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                className="h-full relative"
                style={{
                  background: 'linear-gradient(90deg, #14b8a6 0%, #f59e0b 100%)'
                }}
              >
                <motion.div
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-2">
          {categoryStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/70 to-teal-950/30 backdrop-blur-sm border border-teal-800/20 p-3"
            >
              <stat.icon className="w-4 h-4 mb-2 text-teal-400/70" strokeWidth={1.5} />
              <p className="text-teal-300/60 text-xs mb-1 tracking-wide">{stat.category.replace('任务', '')}</p>
              <p className="text-amber-400 text-sm">
                <span className="text-teal-300">{stat.completed}</span>/{stat.count}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="px-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-teal-200 tracking-wider text-sm flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-amber-500" />
            修行清单
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateTask}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-teal-800/40 to-teal-900/40 border border-teal-700/40 text-teal-300 text-xs hover:border-teal-600/60 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>立誓</span>
          </motion.button>
        </div>

        {/* Active tasks */}
        <div className="space-y-3 mb-6">
          {todayTasks.filter(t => !t.completed).map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <TaskCard
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Completed tasks section */}
        {todayTasks.filter(t => t.completed).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCompleted(!showCompleted)}
              className="w-full mb-3 relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/30 backdrop-blur-sm border-2 border-teal-900/30 p-4"
              style={{
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #14b8a6 10px, #14b8a6 11px)'
              }} />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border border-teal-700/40 flex items-center justify-center">
                    <Check className="w-5 h-5 text-teal-400" strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <p className="text-teal-200 tracking-wide text-sm">已完成任务</p>
                    <p className="text-teal-400/60 text-xs mt-0.5">
                      今日完成 {todayTasks.filter(t => t.completed).length} 项修行
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: showCompleted ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-teal-400/60" strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.button>

            {/* Completed tasks list */}
            {showCompleted && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 overflow-hidden"
              >
                {todayTasks.filter(t => t.completed).map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <TaskCard
                      task={task}
                      onToggle={() => onToggleTask(task.id)}
                      onDelete={() => onDeleteTask(task.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {todayTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-teal-400/40"
          >
            <p className="text-sm tracking-wide">今日无修行任务</p>
            <p className="text-xs mt-2">点击「立誓」开始你的修行</p>
          </motion.div>
        )}
      </div>

      {/* Guide modal */}
      <GuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />
    </div>
  );
}