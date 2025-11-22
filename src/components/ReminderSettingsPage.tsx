import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Bell, Clock, Calendar as CalendarIcon, Sunrise, Sunset, Moon } from 'lucide-react';

interface ReminderSettingsPageProps {
  onBack: () => void;
}

export default function ReminderSettingsPage({ onBack }: ReminderSettingsPageProps) {
  const [settings, setSettings] = useState({
    dailyReminder: true,
    reminderTime: '08:00',
    morningReminder: true,
    morningTime: '06:00',
    eveningReminder: true,
    eveningTime: '18:00',
    nightReminder: false,
    nightTime: '21:00',
    weekendReminder: true,
    soundEnabled: true,
    vibrationEnabled: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const handleTimeChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const reminderPeriods = [
    { 
      key: 'morningReminder', 
      timeKey: 'morningTime',
      icon: Sunrise, 
      label: '晨修提醒', 
      desc: '清晨修行，养气凝神',
      color: 'amber'
    },
    { 
      key: 'eveningReminder', 
      timeKey: 'eveningTime',
      icon: Sunset, 
      label: '晚修提醒', 
      desc: '日落而修，精进不怠',
      color: 'teal'
    },
    { 
      key: 'nightReminder', 
      timeKey: 'nightTime',
      icon: Moon, 
      label: '夜修提醒', 
      desc: '夜深人静，正是悟道时',
      color: 'slate'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 pb-8">
      {/* Header */}
      <div className="relative px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="text-teal-400/60 hover:text-teal-400 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            </motion.button>
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-teal-500/60" strokeWidth={1.5} />
                <p className="text-teal-400/60 text-xs tracking-[0.3em]">修行提醒</p>
              </div>
              <h1 className="text-xl tracking-wide text-teal-100">
                定时修行 · 日日精进
              </h1>
            </div>
            <div className="w-6" />
          </div>
        </motion.div>
      </div>

      {/* Main Daily Reminder */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(20, 184, 166, 0.15)'
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, #14b8a6 15px, #14b8a6 16px)'
          }} />

          <div className="relative p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-900/40 border-2 border-teal-700/40 rounded flex items-center justify-center">
                  <Clock className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-teal-200 mb-1">每日修行提醒</p>
                  <p className="text-teal-400/60 text-xs">开启后每天定时提醒</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleToggle('dailyReminder')}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  settings.dailyReminder ? 'bg-teal-700/60' : 'bg-slate-800/60'
                }`}
              >
                <motion.div
                  animate={{ x: settings.dailyReminder ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full border-2 ${
                    settings.dailyReminder
                      ? 'bg-teal-500 border-teal-400'
                      : 'bg-slate-700 border-slate-600'
                  }`}
                />
              </motion.button>
            </div>

            {settings.dailyReminder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-teal-800/30"
              >
                <label className="block text-teal-300/80 text-sm mb-2">提醒时间</label>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => handleTimeChange('reminderTime', e.target.value)}
                  className="w-full bg-slate-950/60 border-2 border-teal-900/40 rounded px-4 py-2.5 text-teal-200 focus:outline-none focus:border-teal-700/60 transition-colors"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Time Period Reminders */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
          <h3 className="text-teal-200 tracking-wider text-sm">时段提醒</h3>
        </div>

        <div className="space-y-3">
          {reminderPeriods.map((period, i) => (
            <motion.div
              key={period.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 bg-${period.color}-900/40 border border-${period.color}-800/40 rounded flex items-center justify-center`}>
                    <period.icon className={`w-5 h-5 text-${period.color}-400/80`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-teal-200 text-sm mb-0.5">{period.label}</p>
                    <p className="text-teal-400/50 text-xs">{period.desc}</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggle(period.key as keyof typeof settings)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[period.key as keyof typeof settings] ? 'bg-teal-700/60' : 'bg-slate-800/60'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings[period.key as keyof typeof settings] ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full border ${
                      settings[period.key as keyof typeof settings]
                        ? 'bg-teal-500 border-teal-400'
                        : 'bg-slate-700 border-slate-600'
                    }`}
                  />
                </motion.button>
              </div>

              {settings[period.key as keyof typeof settings] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-3 border-t border-teal-800/20"
                >
                  <input
                    type="time"
                    value={settings[period.timeKey as keyof typeof settings] as string}
                    onChange={(e) => handleTimeChange(period.timeKey as keyof typeof settings, e.target.value)}
                    className="w-full bg-slate-950/60 border border-teal-900/40 rounded px-3 py-2 text-sm text-teal-200 focus:outline-none focus:border-teal-700/60 transition-colors"
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
          <h3 className="text-teal-200 tracking-wider text-sm">其他设置</h3>
        </div>

        <div className="space-y-3">
          {[
            { key: 'weekendReminder', icon: CalendarIcon, label: '周末提醒', desc: '周末也保持修行' },
            { key: 'soundEnabled', icon: Bell, label: '提醒音效', desc: '开启提醒声音' },
            { key: 'vibrationEnabled', icon: Bell, label: '振动提醒', desc: '开启振动反馈' }
          ].map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/70 to-teal-950/30 backdrop-blur-sm border-2 border-teal-800/20 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-950/60 border border-teal-900/40 rounded flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-teal-400/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-teal-200 text-sm mb-0.5">{item.label}</p>
                    <p className="text-teal-400/50 text-xs">{item.desc}</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggle(item.key as keyof typeof settings)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings[item.key as keyof typeof settings] ? 'bg-teal-700/60' : 'bg-slate-800/60'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings[item.key as keyof typeof settings] ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full border ${
                      settings[item.key as keyof typeof settings]
                        ? 'bg-teal-500 border-teal-400'
                        : 'bg-slate-700 border-slate-600'
                    }`}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-5"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
            <Bell className="w-5 h-5 text-slate-950" strokeWidth={2} />
            <span className="tracking-wider text-slate-950 font-medium">保存提醒设置</span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
