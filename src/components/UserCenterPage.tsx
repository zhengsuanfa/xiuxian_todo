import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, User, Mail, MapPin, Calendar, Edit2, Save, ChevronRight, Shield, Bell } from 'lucide-react';

interface UserCenterPageProps {
  onBack: () => void;
  onNavigateToSettings: (page: 'privacy' | 'reminder' | 'notification') => void;
}

export default function UserCenterPage({ onBack, onNavigateToSettings }: UserCenterPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: '🧘',
    name: '玄清散人',
    title: '筑基修士',
    email: 'xuanqing@cultivation.com',
    location: '青云宗 · 灵峰',
    joinDate: '2024年5月'
  });

  const [editForm, setEditForm] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const menuItems = [
    { icon: Shield, label: '隐私设置', desc: '管理你的隐私偏好', page: 'privacy' as const },
    { icon: Calendar, label: '修行提醒', desc: '设置每日修行提醒', page: 'reminder' as const },
    { icon: Bell, label: '消息通知', desc: '管理消息推送设置', page: 'notification' as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 pb-8">
      {/* Header */}
      <div className="relative px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="text-teal-400/60 hover:text-teal-400 transition-colors"
            >
              <ChevronRight className="w-6 h-6 rotate-180" strokeWidth={1.5} />
            </motion.button>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-6 h-px bg-gradient-to-r from-transparent to-teal-600" />
                <p className="text-teal-400/60 text-xs tracking-[0.3em]">用户中心</p>
                <div className="w-6 h-px bg-gradient-to-l from-transparent to-teal-600" />
              </div>
              <h1 className="text-xl tracking-wide text-teal-100">
                道友信息
              </h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="text-teal-400/60 hover:text-teal-400 transition-colors"
            >
              {isEditing ? (
                <Save className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Edit2 className="w-5 h-5" strokeWidth={1.5} />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Avatar section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
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

          <div className="relative p-8 text-center">
            {/* Avatar with upload button */}
            <div className="relative inline-block mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 opacity-20"
              >
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
                  <circle cx="70" cy="70" r="50" fill="none" stroke="#f59e0b" strokeWidth="0.3" />
                </svg>
              </motion.div>

              <div className="relative w-28 h-28 bg-gradient-to-br from-slate-900/80 to-teal-950/80 rounded-full border-2 border-teal-700/50 flex items-center justify-center shadow-xl text-5xl">
                {userInfo.avatar}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-teal-700/80 to-amber-700/60 border-2 border-teal-600/60 rounded-full flex items-center justify-center"
                style={{
                  boxShadow: '0 2px 15px rgba(20, 184, 166, 0.3)'
                }}
              >
                <Camera className="w-5 h-5 text-teal-100" strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Name and title */}
            {isEditing ? (
              <div className="space-y-3 max-w-xs mx-auto">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-950/60 border-2 border-teal-900/40 rounded px-3 py-2 text-center text-teal-100 focus:outline-none focus:border-teal-700/60 transition-colors"
                />
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full bg-slate-950/60 border-2 border-teal-900/40 rounded px-3 py-2 text-center text-sm text-teal-300/80 focus:outline-none focus:border-teal-700/60 transition-colors"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">
                  {userInfo.name}
                </h2>
                <p className="text-teal-300/80 tracking-wide text-sm">{userInfo.title}</p>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* User info cards */}
      <div className="px-5 space-y-3 mb-6">
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-900/40 border border-teal-800/40 rounded flex items-center justify-center">
              <Mail className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-teal-400/60 text-xs mb-1">道友邮箱</p>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-slate-950/60 border border-teal-900/40 rounded px-2 py-1 text-sm text-teal-200 focus:outline-none focus:border-teal-700/60 transition-colors"
                />
              ) : (
                <p className="text-teal-200 text-sm">{userInfo.email}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-900/40 border border-teal-800/40 rounded flex items-center justify-center">
              <MapPin className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-teal-400/60 text-xs mb-1">所在宗门</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-slate-950/60 border border-teal-900/40 rounded px-2 py-1 text-sm text-teal-200 focus:outline-none focus:border-teal-700/60 transition-colors"
                />
              ) : (
                <p className="text-teal-200 text-sm">{userInfo.location}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Join date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-900/40 border border-teal-800/40 rounded flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-400/80" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-teal-400/60 text-xs mb-1">入门时间</p>
              <p className="text-teal-200 text-sm">{userInfo.joinDate}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Settings menu */}
      <div className="px-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
          <h3 className="text-teal-200 tracking-wider text-sm">设置选项</h3>
        </div>

        <div className="space-y-3">
          {menuItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateToSettings(item.page)}
              className="w-full relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/70 to-teal-950/30 backdrop-blur-sm border-2 border-teal-800/20 p-4 text-left transition-all hover:border-teal-700/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-950/60 border border-teal-900/40 rounded flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-teal-400/70" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-teal-200 text-sm mb-0.5">{item.label}</p>
                  <p className="text-teal-400/50 text-xs">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-teal-400/40" strokeWidth={1.5} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Logout button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-5 mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg bg-slate-900/60 border-2 border-red-900/30 text-red-400/80 hover:border-red-800/50 transition-colors"
        >
          退出登录
        </motion.button>
      </motion.div>
    </div>
  );
}