import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Bell, MessageCircle, UserPlus, Award, TrendingUp, Mail } from 'lucide-react';

interface NotificationSettingsPageProps {
  onBack: () => void;
}

export default function NotificationSettingsPage({ onBack }: NotificationSettingsPageProps) {
  const [settings, setSettings] = useState({
    // Message notifications
    newMessage: true,
    friendMessage: true,
    groupMessage: false,
    
    // Social notifications
    friendRequest: true,
    friendAccepted: true,
    friendActivity: false,
    
    // Achievement notifications
    taskCompleted: true,
    levelUp: true,
    milestone: true,
    streak: true,
    
    // System notifications
    systemUpdates: true,
    maintenance: true,
    
    // Notification method
    pushEnabled: true,
    emailEnabled: false,
    inAppOnly: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationCategories = [
    {
      title: '传音通知',
      icon: MessageCircle,
      items: [
        { key: 'newMessage', label: '新消息', desc: '收到新传音符时提醒' },
        { key: 'friendMessage', label: '道友消息', desc: '好友发来消息时提醒' },
        { key: 'groupMessage', label: '群组消息', desc: '群组有新消息时提醒' }
      ]
    },
    {
      title: '社交通知',
      icon: UserPlus,
      items: [
        { key: 'friendRequest', label: '好友请求', desc: '有人想添加你为道友' },
        { key: 'friendAccepted', label: '请求通过', desc: '对方接受了你的好友请求' },
        { key: 'friendActivity', label: '道友动态', desc: '道友完成重要修行时' }
      ]
    },
    {
      title: '成就通知',
      icon: Award,
      items: [
        { key: 'taskCompleted', label: '任务完成', desc: '完成修行任务时' },
        { key: 'levelUp', label: '境界突破', desc: '修为境界提升时' },
        { key: 'milestone', label: '里程碑', desc: '达成特殊成就时' },
        { key: 'streak', label: '连续修行', desc: '连续修行天数提醒' }
      ]
    },
    {
      title: '系统通知',
      icon: Bell,
      items: [
        { key: 'systemUpdates', label: '系统更新', desc: '应用有新版本时' },
        { key: 'maintenance', label: '维护公告', desc: '系统维护通知' }
      ]
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
                <p className="text-teal-400/60 text-xs tracking-[0.3em]">消息通知</p>
              </div>
              <h1 className="text-xl tracking-wide text-teal-100">
                灵符传讯 · 即时知晓
              </h1>
            </div>
            <div className="w-6" />
          </div>
        </motion.div>
      </div>

      {/* Notification Method */}
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
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
              <h3 className="text-teal-200 tracking-wider text-sm">通知方式</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-teal-900/30">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
                  <div>
                    <p className="text-teal-200 text-sm">推送通知</p>
                    <p className="text-teal-400/50 text-xs">在设备上显示通知</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggle('pushEnabled')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.pushEnabled ? 'bg-teal-700/60' : 'bg-slate-800/60'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.pushEnabled ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full border ${
                      settings.pushEnabled
                        ? 'bg-teal-500 border-teal-400'
                        : 'bg-slate-700 border-slate-600'
                    }`}
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-teal-900/30">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
                  <div>
                    <p className="text-teal-200 text-sm">邮件通知</p>
                    <p className="text-teal-400/50 text-xs">发送到注册邮箱</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggle('emailEnabled')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.emailEnabled ? 'bg-teal-700/60' : 'bg-slate-800/60'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.emailEnabled ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full border ${
                      settings.emailEnabled
                        ? 'bg-teal-500 border-teal-400'
                        : 'bg-slate-700 border-slate-600'
                    }`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notification Categories */}
      {notificationCategories.map((category, catIndex) => (
        <div key={category.title} className="px-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
            <category.icon className="w-4 h-4 text-teal-400/80" strokeWidth={1.5} />
            <h3 className="text-teal-200 tracking-wider text-sm">{category.title}</h3>
          </div>

          <div className="space-y-3">
            {category.items.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + catIndex * 0.15 + i * 0.05 }}
                className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-teal-200 text-sm mb-0.5">{item.label}</p>
                    <p className="text-teal-400/50 text-xs">{item.desc}</p>
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
      ))}

      {/* Save button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
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
            <span className="tracking-wider text-slate-950 font-medium">保存通知设置</span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
