import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, UserPlus, MapPin, Sparkles, Users, TrendingUp, Check } from 'lucide-react';

interface AddFriendPageProps {
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  title: string;
  rank: string;
  stage: string;
  level: number;
  spirit: number;
  avatar: string;
  location: string;
  distance?: string;
  commonFriends?: number;
  isRequested?: boolean;
}

export default function AddFriendPage({ onBack }: AddFriendPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'recommend' | 'nearby' | 'search'>('recommend');
  const [requestedUsers, setRequestedUsers] = useState<Set<string>>(new Set());

  // 推荐道友
  const recommendedUsers: User[] = [
    {
      id: '6',
      name: '流云真人',
      title: '青云宗长老',
      rank: '金丹',
      stage: '初期',
      level: 1,
      spirit: 8500,
      avatar: '☁️',
      location: '青云宗',
      commonFriends: 3
    },
    {
      id: '7',
      name: '紫霞仙子',
      title: '天剑宗弟子',
      rank: '筑基',
      stage: '后期',
      level: 9,
      spirit: 4200,
      avatar: '🌸',
      location: '天剑宗',
      commonFriends: 2
    },
    {
      id: '8',
      name: '星辰散人',
      title: '散修',
      rank: '筑基',
      stage: '中期',
      level: 5,
      spirit: 3100,
      avatar: '✨',
      location: '无归之地',
      commonFriends: 1
    },
    {
      id: '9',
      name: '玄冰道人',
      title: '冰魄宫弟子',
      rank: '筑基',
      stage: '初期',
      level: 2,
      spirit: 2400,
      avatar: '❄️',
      location: '冰魄宫',
      commonFriends: 0
    }
  ];

  // 附近的道友
  const nearbyUsers: User[] = [
    {
      id: '10',
      name: '清风道长',
      title: '青云宗弟子',
      rank: '筑基',
      stage: '中期',
      level: 4,
      spirit: 2900,
      avatar: '🍃',
      location: '青云宗·东峰',
      distance: '500米'
    },
    {
      id: '11',
      name: '明月仙子',
      title: '青云宗弟子',
      rank: '筑基',
      stage: '初期',
      level: 3,
      spirit: 2600,
      avatar: '🌙',
      location: '青云宗·灵药园',
      distance: '1.2公里'
    },
    {
      id: '12',
      name: '赤焰真君',
      title: '烈火门弟子',
      rank: '筑基',
      stage: '后期',
      level: 8,
      spirit: 3800,
      avatar: '🔥',
      location: '青云城',
      distance: '3公里'
    }
  ];

  // 搜索结果
  const searchResults: User[] = searchQuery.length > 0 ? [
    {
      id: '13',
      name: '幻影散人',
      title: '散修',
      rank: '筑基',
      stage: '中期',
      level: 6,
      spirit: 3300,
      avatar: '🌫️',
      location: '迷雾森林'
    },
    {
      id: '14',
      name: '雷霆真人',
      title: '雷音寺弟子',
      rank: '金丹',
      stage: '初期',
      level: 2,
      spirit: 9200,
      avatar: '⚡',
      location: '雷音寺'
    }
  ].filter(user => user.name.includes(searchQuery)) : [];

  const handleSendRequest = (userId: string) => {
    setRequestedUsers(prev => new Set(prev).add(userId));
  };

  const getCurrentUsers = () => {
    if (activeTab === 'search' && searchQuery.length > 0) {
      return searchResults;
    }
    if (activeTab === 'nearby') {
      return nearbyUsers;
    }
    return recommendedUsers;
  };

  const tabs = [
    { id: 'recommend', label: '推荐道友', icon: Sparkles },
    { id: 'nearby', label: '附近', icon: MapPin },
    { id: 'search', label: '搜索', icon: Search }
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
                <UserPlus className="w-4 h-4 text-teal-500/60" strokeWidth={1.5} />
                <p className="text-teal-400/60 text-xs tracking-[0.3em]">添加道友</p>
              </div>
              <h1 className="text-xl tracking-wide text-teal-100">
                寻觅同道 · 共修大道
              </h1>
            </div>
            <div className="w-6" />
          </div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-teal-400/60" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 0) {
                    setActiveTab('search');
                  }
                }}
                placeholder="搜索道友名号..."
                className="flex-1 bg-transparent text-teal-100 placeholder:text-teal-600/40 focus:outline-none"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="text-teal-400/60 hover:text-teal-400"
                >
                  <div className="w-5 h-5 rounded-full bg-teal-900/40 flex items-center justify-center">
                    <span className="text-xs">✕</span>
                  </div>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                if (tab.id !== 'search') {
                  setSearchQuery('');
                }
              }}
              className={`flex-1 relative overflow-hidden rounded-lg py-3 px-4 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-br from-teal-900/60 to-slate-900/60 border-2 border-teal-700/60'
                  : 'bg-slate-900/40 border-2 border-teal-900/20 hover:border-teal-800/40'
              }`}
              style={{
                boxShadow: activeTab === tab.id ? '0 0 20px rgba(20, 184, 166, 0.2)' : 'none'
              }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-selected"
                  className="absolute inset-0 bg-teal-600/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative flex items-center justify-center gap-2">
                <tab.icon className={`w-4 h-4 ${
                  activeTab === tab.id ? 'text-teal-400' : 'text-teal-600/60'
                }`} strokeWidth={1.5} />
                <span className={`text-sm ${
                  activeTab === tab.id ? 'text-teal-200' : 'text-teal-400/60'
                }`}>
                  {tab.label}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* User List */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tab description */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-amber-500" />
              <h3 className="text-teal-200 tracking-wider text-sm">
                {activeTab === 'recommend' && '为你推荐'}
                {activeTab === 'nearby' && '附近的道友'}
                {activeTab === 'search' && searchQuery.length > 0 && `找到 ${searchResults.length} 位道友`}
                {activeTab === 'search' && searchQuery.length === 0 && '输入道友名号搜索'}
              </h3>
            </div>

            {/* Empty state for search */}
            {activeTab === 'search' && searchQuery.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-900/60 border-2 border-teal-900/30 flex items-center justify-center">
                  <Search className="w-10 h-10 text-teal-600/40" strokeWidth={1.5} />
                </div>
                <p className="text-teal-400/60 text-sm">请输入道友名号进行搜索</p>
              </motion.div>
            )}

            {/* User cards */}
            {(activeTab !== 'search' || searchQuery.length > 0) && (
              <div className="space-y-3">
                {getCurrentUsers().map((user, i) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4"
                    style={{
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #14b8a6 10px, #14b8a6 11px)'
                    }} />

                    <div className="relative flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                          className="absolute -inset-2 opacity-20"
                        >
                          <svg width="72" height="72" viewBox="0 0 72 72">
                            <circle cx="36" cy="36" r="30" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
                          </svg>
                        </motion.div>
                        <div className="relative w-16 h-16 rounded bg-gradient-to-br from-slate-900/60 to-teal-950/60 border-2 border-teal-700/40 flex items-center justify-center text-2xl">
                          {user.avatar}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-teal-100 mb-1 tracking-wide">{user.name}</h3>
                            <p className="text-teal-400/60 text-xs mb-1">{user.title}</p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-amber-500/80" strokeWidth={1.5} />
                            <span className="text-xs text-teal-300/80">
                              {user.rank} {user.stage}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-teal-500/80" strokeWidth={1.5} />
                            <span className="text-xs text-teal-300/80">
                              灵力 {user.spirit.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Location / Common Friends */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-teal-500/60" strokeWidth={1.5} />
                            <span className="text-xs text-teal-400/60">{user.location}</span>
                          </div>
                          {user.distance && (
                            <span className="text-xs text-amber-400/80">距离 {user.distance}</span>
                          )}
                          {user.commonFriends !== undefined && user.commonFriends > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-teal-500/60" strokeWidth={1.5} />
                              <span className="text-xs text-teal-400/60">
                                {user.commonFriends} 位共同道友
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        {requestedUsers.has(user.id) ? (
                          <div className="flex items-center gap-2 px-3 py-2 rounded bg-slate-900/60 border border-teal-900/40">
                            <Check className="w-4 h-4 text-teal-500" strokeWidth={2} />
                            <span className="text-sm text-teal-400/80">已发送请求</span>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSendRequest(user.id)}
                            className="w-full relative overflow-hidden rounded py-2 px-4"
                            style={{
                              background: 'linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%)',
                              boxShadow: '0 2px 12px rgba(20, 184, 166, 0.3)'
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
                              <UserPlus className="w-4 h-4 text-slate-950" strokeWidth={2} />
                              <span className="text-sm text-slate-950 font-medium">添加道友</span>
                            </div>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No results */}
            {activeTab === 'search' && searchQuery.length > 0 && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-900/60 border-2 border-teal-900/30 flex items-center justify-center">
                  <Search className="w-10 h-10 text-teal-600/40" strokeWidth={1.5} />
                </div>
                <p className="text-teal-400/60 text-sm mb-2">未找到匹配的道友</p>
                <p className="text-teal-600/40 text-xs">请尝试其他关键词</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-5 mt-8"
      >
        <div className="text-center p-4 rounded-lg bg-slate-900/40 border border-teal-900/20">
          <p className="text-teal-400/50 text-xs tracking-wide italic">
            "修行路上多结善缘，同道相伴方能走得更远"
          </p>
        </div>
      </motion.div>
    </div>
  );
}
