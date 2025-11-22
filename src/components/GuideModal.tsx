import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Zap, Users, Calendar, Trophy, Eye, Dumbbell, Heart, Home, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'tasks' | 'features'>('intro');

  const tabs = [
    { id: 'intro', label: '修行之道', icon: BookOpen },
    { id: 'tasks', label: '任务类型', icon: Zap },
    { id: 'features', label: '功能详解', icon: Sparkles }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 z-50 overflow-hidden"
          >
            <div className="h-full max-w-2xl mx-auto flex flex-col">
              {/* Header */}
              <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-slate-900/95 to-teal-950/90 backdrop-blur-xl border-2 border-teal-800/40 border-b-0 p-5">
                {/* Pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, #14b8a6 12px, #14b8a6 13px)'
                }} />

                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border-2 border-teal-700/40 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-teal-100 text-lg tracking-wide">修仙指南</h2>
                      <p className="text-teal-400/60 text-xs tracking-wider">初入修行 · 必读经文</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-slate-900/60 border border-teal-800/40 flex items-center justify-center text-teal-400/60 hover:text-teal-400 hover:border-teal-700/60 transition-colors"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </motion.button>
                </div>
              </div>

              {/* Tabs */}
              <div className="relative bg-gradient-to-br from-slate-900/95 to-teal-950/90 backdrop-blur-xl border-2 border-teal-800/40 border-y-0 p-4">
                <div className="relative flex gap-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 relative overflow-hidden rounded-lg py-2.5 px-3 transition-all ${
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
                          layoutId="guide-tab-selected"
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
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 relative overflow-hidden rounded-b-lg bg-gradient-to-br from-slate-900/95 to-teal-950/90 backdrop-blur-xl border-2 border-teal-800/40 border-t-0">
                {/* Pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, #14b8a6 12px, #14b8a6 13px)'
                }} />

                <div className="relative h-full overflow-y-auto p-5">
                  <AnimatePresence mode="wait">
                    {/* 修行之道 */}
                    {activeTab === 'intro' && (
                      <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        {/* 应用介绍 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-amber-500" />
                          <div className="relative">
                            <h3 className="text-teal-200 tracking-wider mb-3 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
                              何为修仙ToDo？
                            </h3>
                            <p className="text-teal-300/80 text-sm leading-relaxed mb-3">
                              这是一款将现实任务与修仙世界结合的效率应用。每完成一项任务，即可获得灵力值，提升修为境界。
                            </p>
                            <p className="text-teal-400/60 text-xs leading-relaxed italic">
                              "修行之路漫漫，唯有日积月累，方能登临绝顶。现实中的每一次努力，都是你修行路上的基石。"
                            </p>
                          </div>
                        </div>

                        {/* 核心玩法 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-teal-500" />
                          <div className="relative">
                            <h3 className="text-teal-200 tracking-wider mb-4">核心玩法</h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border border-teal-700/40 flex items-center justify-center flex-shrink-0">
                                  <span className="text-teal-400">①</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-teal-300 text-sm mb-1">创建修行任务</p>
                                  <p className="text-teal-400/60 text-xs">将现实中的待办事项转化为修仙任务，选择对应的类型和优先级。</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border border-teal-700/40 flex items-center justify-center flex-shrink-0">
                                  <span className="text-teal-400">②</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-teal-300 text-sm mb-1">完成获得灵力</p>
                                  <p className="text-teal-400/60 text-xs">每完成一项任务，获得对应灵力值，灵力累积可提升境界。</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border border-teal-700/40 flex items-center justify-center flex-shrink-0">
                                  <span className="text-teal-400">③</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-teal-300 text-sm mb-1">境界突破</p>
                                  <p className="text-teal-400/60 text-xs">从练气期开始，依次突破筑基、金丹、元婴等境界，成为修仙大能。</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border border-teal-700/40 flex items-center justify-center flex-shrink-0">
                                  <span className="text-teal-400">④</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-teal-300 text-sm mb-1">结交道友</p>
                                  <p className="text-teal-400/60 text-xs">添加好友，互相监督，共同进步，修行路上不孤单。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 境界系统 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-amber-500" />
                          <div className="relative">
                            <h3 className="text-teal-200 tracking-wider mb-4 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
                              境界体系
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { rank: '练气期', level: '初、中、后期', color: 'from-slate-700 to-slate-800' },
                                { rank: '筑基期', level: '初、中、后期', color: 'from-teal-800 to-teal-900' },
                                { rank: '金丹期', level: '初、中、后期', color: 'from-amber-700 to-amber-800' },
                                { rank: '元婴期', level: '初、中、后期', color: 'from-purple-800 to-purple-900' },
                                { rank: '化神期', level: '初、中、后期', color: 'from-blue-800 to-blue-900' },
                                { rank: '合体期', level: '待解锁', color: 'from-red-900 to-red-950' }
                              ].map((item, i) => (
                                <div key={i} className={`relative overflow-hidden rounded p-3 bg-gradient-to-br ${item.color} border border-teal-800/20`}>
                                  <p className="text-teal-200 text-sm mb-1">{item.rank}</p>
                                  <p className="text-teal-400/60 text-xs">{item.level}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* 任务类型 */}
                    {activeTab === 'tasks' && (
                      <motion.div
                        key="tasks"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        {/* 灵识任务 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-teal-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-900/60 to-slate-900/60 border-2 border-blue-700/40 flex items-center justify-center">
                                <Eye className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                              </div>
                              <div>
                                <h3 className="text-teal-200 tracking-wider">灵识任务 · 专注修行</h3>
                                <p className="text-teal-400/60 text-xs">对应现实：学习、工作、专注类任务</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 工作任务、学习课程、技能提升</p>
                              <p>• 专注力训练、深度思考</p>
                              <p>• 创作写作、编程开发</p>
                            </div>
                            <div className="mt-3 px-3 py-2 rounded bg-slate-950/60 border border-teal-900/30">
                              <p className="text-teal-400/80 text-xs italic">
                                "神识清明，方能洞察天地玄机。"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 体修任务 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-orange-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-red-900/60 to-slate-900/60 border-2 border-red-700/40 flex items-center justify-center">
                                <Dumbbell className="w-5 h-5 text-red-400" strokeWidth={1.5} />
                              </div>
                              <div>
                                <h3 className="text-teal-200 tracking-wider">体修任务 · 强健体魄</h3>
                                <p className="text-teal-400/60 text-xs">对应现实：运动、健身、身体锻炼</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 跑步、健身、瑜伽、游泳</p>
                              <p>• 晨练、拉伸、体能训练</p>
                              <p>• 户外运动、竞技活动</p>
                            </div>
                            <div className="mt-3 px-3 py-2 rounded bg-slate-950/60 border border-teal-900/30">
                              <p className="text-teal-400/80 text-xs italic">
                                "肉身强健，灵力才能源源不绝。"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 心法任务 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-900/60 to-slate-900/60 border-2 border-purple-700/40 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
                              </div>
                              <div>
                                <h3 className="text-teal-200 tracking-wider">心法任务 · 修心养性</h3>
                                <p className="text-teal-400/60 text-xs">对应现实：阅读、冥想、心理成长</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 读书阅读、知识积累</p>
                              <p>• 冥想打坐、情绪管理</p>
                              <p>• 心理咨询、自我反思</p>
                            </div>
                            <div className="mt-3 px-3 py-2 rounded bg-slate-950/60 border border-teal-900/30">
                              <p className="text-teal-400/80 text-xs italic">
                                "道心坚定，方能抵御心魔侵扰。"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 杂务 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-green-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border-2 border-teal-700/40 flex items-center justify-center">
                                <Home className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                              </div>
                              <div>
                                <h3 className="text-teal-200 tracking-wider">杂务 · 日常琐事</h3>
                                <p className="text-teal-400/60 text-xs">对应现实：家务、生活琐事</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 打扫卫生、整理房间</p>
                              <p>• 洗衣做饭、生活采购</p>
                              <p>• 缴费办事、日常琐碎</p>
                            </div>
                            <div className="mt-3 px-3 py-2 rounded bg-slate-950/60 border border-teal-900/30">
                              <p className="text-teal-400/80 text-xs italic">
                                "修行之人，亦需料理洞府杂务。"
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* 功能详解 */}
                    {activeTab === 'features' && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        {/* 今日修行 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-amber-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-teal-900/60 to-slate-900/60 border-2 border-teal-700/40 flex items-center justify-center">
                                <Home className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                              </div>
                              <h3 className="text-teal-200 tracking-wider">今日修行</h3>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 查看当前境界和灵力进度</p>
                              <p>• 管理今日所有修行任务</p>
                              <p>• 快速创建新任务「立誓」</p>
                              <p>• 完成任务获得灵力值</p>
                              <p>• 已完成任务自动折叠收纳</p>
                            </div>
                          </div>
                        </div>

                        {/* 道友系统 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-900/60 to-slate-900/60 border-2 border-purple-700/40 flex items-center justify-center">
                                <Users className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
                              </div>
                              <h3 className="text-teal-200 tracking-wider">道友系统</h3>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 查看所有道友列表和境界</p>
                              <p>• 比较修行进度和灵力值</p>
                              <p>• 点击头像进入私聊传音</p>
                              <p>• 添加新道友共同修行</p>
                              <p>• 推荐道友、附近道友、搜索</p>
                            </div>
                          </div>
                        </div>

                        {/* 修为境界 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-900/60 to-slate-900/60 border-2 border-amber-700/40 flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                              </div>
                              <h3 className="text-teal-200 tracking-wider">修为境界</h3>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 查看详细境界信息</p>
                              <p>• 各类任务完成统计</p>
                              <p>• 连续签到天数记录</p>
                              <p>• 成就徽章展示</p>
                              <p>• 修行历程回顾</p>
                            </div>
                          </div>
                        </div>

                        {/* 修炼日历 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-teal-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-green-900/60 to-slate-900/60 border-2 border-green-700/40 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-green-400" strokeWidth={1.5} />
                              </div>
                              <h3 className="text-teal-200 tracking-wider">修炼日历</h3>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 日历形式查看所有任务</p>
                              <p>• 点击日期查看当日详情</p>
                              <p>• 修行强度热力图</p>
                              <p>• 月度完成统计</p>
                              <p>• 计划未来修行安排</p>
                            </div>
                          </div>
                        </div>

                        {/* 道友传音 */}
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/60 to-teal-950/40 border-2 border-teal-800/30 p-5">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-900/60 to-slate-900/60 border-2 border-blue-700/40 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                              </div>
                              <h3 className="text-teal-200 tracking-wider">道友传音</h3>
                            </div>
                            <div className="space-y-2 text-sm text-teal-300/80">
                              <p>• 公开传音：修仙界的公共广场</p>
                              <p>• 好友私信：一对一私密对话</p>
                              <p>• 灵符传讯：千里之外即时通讯</p>
                              <p>• 分享修行心得和经验</p>
                              <p>• 互相鼓励，共同进步</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
