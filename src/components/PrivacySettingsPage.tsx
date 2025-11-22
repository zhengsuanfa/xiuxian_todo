import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Shield, Eye, EyeOff, Lock, Users, Globe } from 'lucide-react';

interface PrivacySettingsPageProps {
  onBack: () => void;
}

export default function PrivacySettingsPage({ onBack }: PrivacySettingsPageProps) {
  const [settings, setSettings] = useState({
    profileVisibility: 'public', // public, friends, private
    showSpirit: true,
    showLevel: true,
    showProgress: true,
    allowFriendRequests: true,
    showOnlineStatus: true,
    taskVisibility: 'friends' // public, friends, private
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const visibilityOptions = [
    { value: 'public', label: '公开', icon: Globe, desc: '所有道友可见' },
    { value: 'friends', label: '道友可见', icon: Users, desc: '仅好友可见' },
    { value: 'private', label: '私密', icon: Lock, desc: '仅自己可见' }
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
                <Shield className="w-4 h-4 text-teal-500/60" strokeWidth={1.5} />
                <p className="text-teal-400/60 text-xs tracking-[0.3em]">隐私设置</p>
              </div>
              <h1 className="text-xl tracking-wide text-teal-100">
                守护道心 · 隐私为重
              </h1>
            </div>
            <div className="w-6" />
          </div>
        </motion.div>
      </div>

      {/* Profile Visibility */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
          <h3 className="text-teal-200 tracking-wider text-sm">资料可见性</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {visibilityOptions.map((option, i) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSettings(prev => ({ ...prev, profileVisibility: option.value }))}
              className={`relative overflow-hidden rounded-lg border-2 p-4 text-left transition-all ${
                settings.profileVisibility === option.value
                  ? 'bg-gradient-to-br from-teal-900/40 to-slate-900/60 border-teal-700/60'
                  : 'bg-slate-900/40 border-teal-900/20 hover:border-teal-800/40'
              }`}
              style={{
                boxShadow: settings.profileVisibility === option.value ? '0 0 20px rgba(20, 184, 166, 0.2)' : 'none'
              }}
            >
              {settings.profileVisibility === option.value && (
                <motion.div
                  layoutId="visibility-selected"
                  className="absolute inset-0 bg-teal-600/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative flex items-center gap-3">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${
                  settings.profileVisibility === option.value
                    ? 'bg-teal-900/60 border-2 border-teal-700/60'
                    : 'bg-slate-950/60 border-2 border-teal-900/30'
                }`}>
                  <option.icon className={`w-5 h-5 ${
                    settings.profileVisibility === option.value ? 'text-teal-400' : 'text-teal-600/60'
                  }`} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm mb-0.5 ${
                    settings.profileVisibility === option.value ? 'text-teal-200' : 'text-teal-400/60'
                  }`}>
                    {option.label}
                  </p>
                  <p className={`text-xs ${
                    settings.profileVisibility === option.value ? 'text-teal-400/60' : 'text-teal-600/40'
                  }`}>
                    {option.desc}
                  </p>
                </div>
                {settings.profileVisibility === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-teal-600/60 border-2 border-teal-500 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detailed Settings */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
          <h3 className="text-teal-200 tracking-wider text-sm">详细权限</h3>
        </div>

        <div className="space-y-3">
          {[
            { key: 'showSpirit', icon: Eye, label: '显示灵力值', desc: '其他道友可查看你的灵力' },
            { key: 'showLevel', icon: Eye, label: '显示境界等级', desc: '显示你的修为境界' },
            { key: 'showProgress', icon: Eye, label: '显示修行进度', desc: '显示今日修行完成情况' },
            { key: 'allowFriendRequests', icon: Users, label: '接受好友请求', desc: '允许其他道友添加你' },
            { key: 'showOnlineStatus', icon: Globe, label: '显示在线状态', desc: '让道友知道你是否在线' }
          ].map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-slate-950/60 border border-teal-900/40 rounded flex items-center justify-center">
                    {settings[item.key as keyof typeof settings] ? (
                      <item.icon className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
                    ) : (
                      <EyeOff className="w-5 h-5 text-teal-600/40" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1">
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

      {/* Task Visibility */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
          <h3 className="text-teal-200 tracking-wider text-sm">修行任务可见性</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {visibilityOptions.map((option, i) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettings(prev => ({ ...prev, taskVisibility: option.value }))}
              className={`relative overflow-hidden rounded-lg border-2 p-3 text-center transition-all ${
                settings.taskVisibility === option.value
                  ? 'bg-gradient-to-br from-teal-900/40 to-slate-900/60 border-teal-700/60'
                  : 'bg-slate-900/40 border-teal-900/20 hover:border-teal-800/40'
              }`}
            >
              <option.icon className={`w-5 h-5 mx-auto mb-2 ${
                settings.taskVisibility === option.value ? 'text-teal-400' : 'text-teal-600/60'
              }`} strokeWidth={1.5} />
              <p className={`text-xs ${
                settings.taskVisibility === option.value ? 'text-teal-200' : 'text-teal-400/60'
              }`}>
                {option.label}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Save button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
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
            <Shield className="w-5 h-5 text-slate-950" strokeWidth={2} />
            <span className="tracking-wider text-slate-950 font-medium">保存隐私设置</span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
