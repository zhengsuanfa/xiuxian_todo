import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { useState } from 'react';
import type { Task } from '../App';

interface CalendarPageProps {
  tasks: Task[];
}

export default function CalendarPage({ tasks }: CalendarPageProps) {
  const [currentMonth] = useState(new Date(2025, 10)); // November 2025

  const daysInMonth = new Date(2025, 11, 0).getDate(); // 30 days in November
  const firstDayOfMonth = new Date(2025, 10, 1).getDay(); // Day of week for Nov 1

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Empty cells before month starts
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Mock completion data
  const completionData: Record<number, number> = {
    1: 4, 2: 3, 3: 5, 4: 2, 5: 4, 6: 3, 7: 4,
    8: 5, 9: 3, 10: 4, 11: 2, 12: 3, 13: 5, 14: 4,
    15: 3, 16: 4, 17: 5, 18: 3, 19: 4, 20: 2, 21: 5,
    22: 3 // Today
  };

  const getCompletionColor = (count: number) => {
    if (count === 0) return 'bg-slate-900/40 border-slate-800/30';
    if (count <= 2) return 'bg-teal-950/60 border-teal-900/40';
    if (count <= 4) return 'bg-teal-900/70 border-teal-800/50';
    return 'bg-gradient-to-br from-teal-800/80 to-amber-900/60 border-amber-700/60';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 pb-8">
      {/* Header */}
      <div className="relative px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-teal-600" />
            <p className="text-teal-400/60 text-xs tracking-[0.3em]">修炼日历</p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-teal-600" />
          </div>
          <h1 className="text-xl tracking-wide text-teal-100">
            宗门卷轴 · 日日精进
          </h1>
        </motion.div>

        {/* Month selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-6 px-4"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg bg-slate-900/60 border-2 border-teal-900/30 flex items-center justify-center text-teal-400/60 hover:border-teal-800/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>

          <div className="text-center">
            <p className="text-teal-200 tracking-wider">
              {currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg bg-slate-900/60 border-2 border-teal-900/30 flex items-center justify-center text-teal-400/60 hover:border-teal-800/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>
        </motion.div>
      </div>

      {/* Calendar */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/90 to-teal-950/50 backdrop-blur-sm border-2 border-teal-800/30 p-4"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(20, 184, 166, 0.1)'
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-3" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #14b8a6 20px, #14b8a6 21px)'
          }} />

          <div className="relative">
            {/* Week day headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {weekDays.map((day, i) => (
                <div
                  key={i}
                  className="text-center text-teal-400/60 text-xs tracking-wider py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (i * 0.01) }}
                  className="aspect-square"
                >
                  {day ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative h-full rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                        day === 22
                          ? 'bg-gradient-to-br from-teal-800/60 to-amber-800/40 border-amber-600/80'
                          : getCompletionColor(completionData[day] || 0)
                      }`}
                      style={{
                        boxShadow: day === 22 ? '0 0 15px rgba(245, 158, 11, 0.3)' : 'none'
                      }}
                    >
                      {/* Day number */}
                      <span className={`text-sm mb-1 ${
                        day === 22 
                          ? 'text-amber-300' 
                          : completionData[day] 
                            ? 'text-teal-200' 
                            : 'text-teal-500/40'
                      }`}>
                        {day}
                      </span>

                      {/* Completion indicator */}
                      {completionData[day] > 0 && (
                        <div className="flex gap-0.5">
                          {[...Array(Math.min(completionData[day], 5))].map((_, j) => (
                            <Circle
                              key={j}
                              className={`w-1 h-1 ${
                                day === 22 ? 'text-amber-400 fill-amber-400' : 'text-teal-500 fill-teal-500'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Today marker */}
                      {day === 22 && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"
                        />
                      )}
                    </motion.div>
                  ) : (
                    <div className="h-full" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-lg bg-slate-900/60 border border-teal-900/30"
        >
          <p className="text-teal-400/60 text-xs mb-3 tracking-wide">修行完成度</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-900/60 border-2 border-slate-800/40" />
              <span className="text-teal-400/60 text-xs">无</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-teal-950/60 border-2 border-teal-900/40" />
              <span className="text-teal-400/60 text-xs">1-2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-teal-900/70 border-2 border-teal-800/50" />
              <span className="text-teal-400/60 text-xs">3-4</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-800/80 to-amber-900/60 border-2 border-amber-700/60" />
              <span className="text-teal-400/60 text-xs">5+</span>
            </div>
          </div>
        </motion.div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-3 gap-3"
        >
          {[
            { label: '本月完成', value: '78', color: 'teal' },
            { label: '连续修行', value: '7天', color: 'amber' },
            { label: '最佳记录', value: '5次', color: 'teal' }
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-slate-900/60 border border-teal-900/30 text-center"
            >
              <p className={`text-${stat.color}-400 mb-1`}>{stat.value}</p>
              <p className="text-teal-400/60 text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
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
            日积月累 · 水滴石穿
          </p>
        </motion.div>
      </div>
    </div>
  );
}
