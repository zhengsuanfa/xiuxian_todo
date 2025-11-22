import { motion, AnimatePresence } from 'motion/react';
import { Check, Eye, Dumbbell, BookOpen, Home, Trash2, Clock, Repeat, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Task } from '../App';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const categoryIcons = {
    '灵识任务': Eye,
    '体修任务': Dumbbell,
    '心法任务': BookOpen,
    '杂务': Home
  };

  const priorityStyles = {
    1: 'from-slate-800/40 to-slate-900/30 border-slate-700/30',
    2: 'from-teal-900/30 to-slate-900/40 border-teal-800/30',
    3: 'from-teal-800/40 to-amber-900/30 border-amber-700/40'
  };

  const CategoryIcon = categoryIcons[task.category];

  const handleToggle = () => {
    if (!task.completed) {
      // 触发完成动画
      setIsCompleting(true);
      // 等待动画播放一段时间后再实际切换状态
      setTimeout(() => {
        onToggle();
        setIsCompleting(false);
      }, 800);
    } else {
      // 取消完成时直接切换
      onToggle();
    }
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="relative group"
    >
      {/* Fragment shape clip path effect */}
      <div 
        className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${priorityStyles[task.priority]} backdrop-blur-sm border-2 transition-all duration-300`}
        style={{
          boxShadow: task.completed 
            ? '0 0 30px rgba(245, 158, 11, 0.3), 0 0 60px rgba(20, 184, 166, 0.2)' 
            : '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, #14b8a6 8px, #14b8a6 9px)'
        }} />

        {/* Completion effects - 完成时的特效 */}
        <AnimatePresence>
          {(isCompleting || task.completed) && (
            <>
              {/* 主要金色光晕 - 从中心扩散 */}
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ 
                  scale: [0, 1.5, 2],
                  opacity: [0.8, 0.4, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-br from-amber-500/40 via-teal-500/30 to-amber-500/40 rounded-lg blur-xl"
              />

              {/* 青金色灵力波纹 - 3层 */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`wave-${i}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ 
                    scale: [0.5, 2.5],
                    opacity: [0.6, 0]
                  }}
                  transition={{ 
                    duration: 1.2,
                    delay: i * 0.2,
                    ease: 'easeOut'
                  }}
                  className="absolute inset-0 border-4 border-teal-400/60 rounded-lg"
                  style={{ borderRadius: '0.5rem' }}
                />
              ))}

              {/* 金色符文粒子 - 爆炸效果 */}
              {[...Array(20)].map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const distance = 100 + Math.random() * 50;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                return (
                  <motion.div
                    key={`particle-${i}`}
                    initial={{ 
                      scale: 0, 
                      x: 0, 
                      y: 0, 
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: [0, x],
                      y: [0, y],
                      opacity: [1, 0.8, 0],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 1 + Math.random() * 0.5,
                      delay: 0.1 + i * 0.02,
                      ease: 'easeOut'
                    }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 
                        ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' 
                        : 'linear-gradient(135deg, #14b8a6, #5eead4)'
                    }}
                  />
                );
              })}

              {/* 闪烁星光 - 小型 */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.05,
                    ease: 'easeInOut'
                  }}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" strokeWidth={2} />
                </motion.div>
              ))}

              {/* 法阵符文旋转 */}
              <motion.div
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg width="120" height="120" viewBox="0 0 120 120" className="text-amber-500/60">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                    const x1 = 60 + Math.cos(angle) * 30;
                    const y1 = 60 + Math.sin(angle) * 30;
                    const x2 = 60 + Math.cos(angle) * 50;
                    const y2 = 60 + Math.sin(angle) * 50;
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </motion.div>

              {/* 顶部金色光束 */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ 
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 via-amber-500/50 to-transparent"
                style={{ transformOrigin: 'top' }}
              />

              {/* 环绕光点 */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: 'linear'
                  }}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: 'center'
                  }}
                >
                  <div 
                    className="absolute w-2 h-2 bg-teal-400 rounded-full blur-sm"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translateX(${30 + i * 5}px)`
                    }}
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        <div className="relative p-4 flex items-start gap-3">
          {/* Checkbox */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleToggle}
            className={`flex-shrink-0 w-6 h-6 border-2 transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
              task.completed
                ? 'bg-gradient-to-br from-amber-600 to-amber-700 border-amber-500 rounded-sm shadow-lg shadow-amber-500/50'
                : 'border-teal-700/60 hover:border-teal-600/80 rounded-sm hover:shadow-lg hover:shadow-teal-500/30'
            }`}
          >
            {/* 完成时的勾选动画 */}
            {task.completed && (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300,
                    damping: 15
                  }}
                >
                  <Check className="w-4 h-4 text-slate-950" strokeWidth={3} />
                </motion.div>
                
                {/* 勾选框内的光芒 */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-amber-400/30 rounded-sm"
                />
              </>
            )}
            
            {/* Checkbox corner accents */}
            {!task.completed && (
              <>
                <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t-2 border-l-2 border-teal-600/60 transition-all group-hover:border-teal-500" />
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b-2 border-r-2 border-teal-600/60 transition-all group-hover:border-teal-500" />
                
                {/* Hover时的内部光芒 */}
                <motion.div
                  className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/20 transition-colors rounded-sm"
                />
              </>
            )}
          </motion.button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`mb-2 transition-all duration-300 text-sm ${
              task.completed ? 'text-teal-400/50 line-through' : 'text-teal-100'
            }`}>
              {task.title}
            </p>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/50 border border-teal-800/30 text-xs text-teal-400/80">
                <CategoryIcon className="w-3 h-3" strokeWidth={1.5} />
                {task.category}
              </span>
              
              {task.priority === 3 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/30 border border-amber-800/40 text-xs text-amber-400">
                  <Zap className="w-3 h-3" />
                  重要
                </span>
              )}
              
              {task.reminder && (
                <span className="inline-flex items-center gap-1 text-xs text-teal-400/60">
                  <Clock className="w-3 h-3" />
                  {task.reminder}
                </span>
              )}
              
              {task.repeat && (
                <span className="inline-flex items-center text-xs text-teal-400/60">
                  <Repeat className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>

          {/* Delete button */}
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-teal-400/60 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* Bottom accent line */}
        {task.priority === 3 && !task.completed && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        )}

        {/* 完成后的底部金光 */}
        {task.completed && (
          <motion.div
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"
          />
        )}
      </div>
    </motion.div>
  );
}
