import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ScrollText, ChevronLeft, Globe, Users, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  from: string;
  avatar: string;
  content: string;
  time: string;
  type: 'received' | 'sent';
}

interface FriendConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface MessagesPageProps {
  selectedFriend: string | null;
  onClearSelectedFriend: () => void;
  onSelectFriend?: (friendId: string) => void;
}

export default function MessagesPage({ selectedFriend, onClearSelectedFriend, onSelectFriend }: MessagesPageProps) {
  const [activeTab, setActiveTab] = useState<'public' | 'friends'>('public');
  const [messageInput, setMessageInput] = useState('');

  const friendsMap: Record<string, { name: string; avatar: string }> = {
    '1': { name: '青云子', avatar: '⚔️' },
    '2': { name: '长河散人', avatar: '🔮' },
    '3': { name: '寒月仙子', avatar: '❄️' },
    '4': { name: '玄木道人', avatar: '📜' },
    '5': { name: '烈火真君', avatar: '🔥' }
  };

  // 公开消息（广场）
  const publicMessages: Message[] = [
    {
      id: '1',
      from: '青云子',
      avatar: '⚔️',
      content: '诸位道友，今日青云宗开坛讲法，欢迎前来听讲。',
      time: '08:30',
      type: 'received'
    },
    {
      id: '2',
      from: '寒月仙子',
      avatar: '❄️',
      content: '近日修行颇有感悟，愿与诸位道友分享心得。',
      time: '09:15',
      type: 'received'
    },
    {
      id: '3',
      from: '我',
      avatar: '🧘',
      content: '今日突破境界瓶颈，感谢诸位道友指点。',
      time: '10:20',
      type: 'sent'
    },
    {
      id: '4',
      from: '长河散人',
      avatar: '🔮',
      content: '贫道新炼一炉丹药，效果奇佳，可提升修为。有意者可来洞府一叙。',
      time: '14:30',
      type: 'received'
    },
    {
      id: '5',
      from: '烈火真君',
      avatar: '🔥',
      content: '修行之路漫漫，唯有勤勉方能有所成就。与诸位道友共勉！',
      time: '15:45',
      type: 'received'
    }
  ];

  // 好友私信列表
  const friendConversations: FriendConversation[] = [
    {
      id: '1',
      name: '青云子',
      avatar: '⚔️',
      lastMessage: '道友今日修行进展如何？',
      time: '10分钟前',
      unread: 2
    },
    {
      id: '3',
      name: '寒月仙子',
      avatar: '❄️',
      lastMessage: '明日可否结伴修炼？',
      time: '1小时前',
      unread: 0
    },
    {
      id: '2',
      name: '长河散人',
      avatar: '🔮',
      lastMessage: '这枚丹药送予道友',
      time: '3小时前',
      unread: 1
    },
    {
      id: '5',
      name: '烈火真君',
      avatar: '🔥',
      lastMessage: '多谢道友援手之恩',
      time: '昨天',
      unread: 0
    },
    {
      id: '4',
      name: '玄木道人',
      avatar: '📜',
      lastMessage: '这卷功法还请道友参详',
      time: '2天前',
      unread: 0
    }
  ];

  // 选中好友的私信记录
  const privateMessages: Message[] = selectedFriend ? [
    {
      id: 'p1',
      from: friendsMap[selectedFriend]?.name,
      avatar: friendsMap[selectedFriend]?.avatar,
      content: '道友，今日修行可有进展？',
      time: '09:30',
      type: 'received'
    },
    {
      id: 'p2',
      from: '我',
      avatar: '🧘',
      content: '多谢道友关心，略有所获。',
      time: '09:35',
      type: 'sent'
    },
    {
      id: 'p3',
      from: friendsMap[selectedFriend]?.name,
      avatar: friendsMap[selectedFriend]?.avatar,
      content: '那便好，若有疑惑之处，尽管相询。',
      time: '09:40',
      type: 'received'
    },
    {
      id: 'p4',
      from: '我',
      avatar: '🧘',
      content: '定当如此，再次感谢道友。',
      time: '09:45',
      type: 'sent'
    }
  ] : [];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // 处理发送消息逻辑
      setMessageInput('');
    }
  };

  // 如果选中了好友，显示私聊界面
  if (selectedFriend) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 pb-8">
        {/* Header */}
        <div className="relative px-5 pt-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center mb-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClearSelectedFriend}
                className="text-teal-400/60 hover:text-teal-400 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
              </motion.button>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-900/60 to-teal-950/60 border-2 border-teal-700/40 flex items-center justify-center text-lg">
                    {friendsMap[selectedFriend]?.avatar}
                  </div>
                  <p className="text-teal-100 tracking-wide">
                    {friendsMap[selectedFriend]?.name || '道友'}
                  </p>
                </div>
              </div>
              <div className="w-6" />
            </div>
          </motion.div>
        </div>

        {/* Messages */}
        <div className="px-5 pb-24">
          <div className="space-y-4">
            {privateMessages.map((message, i) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.type === 'received' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={`flex gap-3 ${message.type === 'sent' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-10 h-10 bg-gradient-to-br from-slate-900/80 to-teal-950/60 rounded border-2 border-teal-800/40 flex items-center justify-center">
                    <span className="text-lg">{message.avatar}</span>
                    
                    {/* Floating glow */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute inset-0 bg-teal-500/20 rounded blur-md"
                    />
                  </div>
                </div>

                {/* Message content */}
                <div className={`flex-1 max-w-[75%] ${message.type === 'sent' ? 'flex flex-col items-end' : ''}`}>
                  {message.type === 'received' && (
                    <p className="text-teal-400/60 text-xs mb-1 tracking-wide">{message.from}</p>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`relative overflow-hidden rounded-lg p-3 ${
                      message.type === 'sent'
                        ? 'bg-gradient-to-br from-teal-800/60 to-amber-900/40 border-2 border-teal-700/50'
                        : 'bg-gradient-to-br from-slate-900/80 to-teal-950/50 border-2 border-teal-800/30'
                    }`}
                    style={{
                      boxShadow: message.type === 'sent' 
                        ? '0 4px 20px rgba(20, 184, 166, 0.2)' 
                        : '0 2px 12px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, #14b8a6 8px, #14b8a6 9px)'
                    }} />

                    <p className={`relative text-sm ${
                      message.type === 'sent' ? 'text-teal-100' : 'text-teal-200'
                    }`}>
                      {message.content}
                    </p>
                  </motion.div>

                  <p className="text-teal-400/40 text-xs mt-1 tracking-wide">{message.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input area */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="fixed bottom-20 left-0 right-0 px-5"
        >
          <div 
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/95 to-teal-950/90 backdrop-blur-xl border-2 border-teal-800/40 p-3"
            style={{
              boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, #14b8a6 12px, #14b8a6 13px)'
            }} />

            <div className="relative flex items-center gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="书写灵符传讯..."
                className="flex-1 bg-slate-950/60 border border-teal-900/40 rounded px-4 py-2.5 text-sm text-teal-100 placeholder-teal-700/40 focus:outline-none focus:border-teal-700/60 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-teal-700/80 to-amber-700/60 border border-teal-600/60 flex items-center justify-center"
                style={{
                  boxShadow: '0 2px 15px rgba(20, 184, 166, 0.3)'
                }}
              >
                <Send className="w-5 h-5 text-teal-100" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 主界面：公开消息和好友列表
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
            <ScrollText className="w-4 h-4 text-teal-500/60" strokeWidth={1.5} />
            <p className="text-teal-400/60 text-xs tracking-[0.3em]">道友传音</p>
            <ScrollText className="w-4 h-4 text-teal-500/60" strokeWidth={1.5} />
          </div>
          <h1 className="text-xl tracking-wide text-teal-100">
            灵符传讯 · 千里之外
          </h1>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('public')}
            className={`flex-1 relative overflow-hidden rounded-lg py-3 px-4 transition-all ${
              activeTab === 'public'
                ? 'bg-gradient-to-br from-teal-900/60 to-slate-900/60 border-2 border-teal-700/60'
                : 'bg-slate-900/40 border-2 border-teal-900/20 hover:border-teal-800/40'
            }`}
            style={{
              boxShadow: activeTab === 'public' ? '0 0 20px rgba(20, 184, 166, 0.2)' : 'none'
            }}
          >
            {activeTab === 'public' && (
              <motion.div
                layoutId="message-tab-selected"
                className="absolute inset-0 bg-teal-600/10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative flex items-center justify-center gap-2">
              <Globe className={`w-5 h-5 ${
                activeTab === 'public' ? 'text-teal-400' : 'text-teal-600/60'
              }`} strokeWidth={1.5} />
              <span className={`${
                activeTab === 'public' ? 'text-teal-200' : 'text-teal-400/60'
              }`}>
                公开传音
              </span>
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('friends')}
            className={`flex-1 relative overflow-hidden rounded-lg py-3 px-4 transition-all ${
              activeTab === 'friends'
                ? 'bg-gradient-to-br from-teal-900/60 to-slate-900/60 border-2 border-teal-700/60'
                : 'bg-slate-900/40 border-2 border-teal-900/20 hover:border-teal-800/40'
            }`}
            style={{
              boxShadow: activeTab === 'friends' ? '0 0 20px rgba(20, 184, 166, 0.2)' : 'none'
            }}
          >
            {activeTab === 'friends' && (
              <motion.div
                layoutId="message-tab-selected"
                className="absolute inset-0 bg-teal-600/10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative flex items-center justify-center gap-2">
              <Users className={`w-5 h-5 ${
                activeTab === 'friends' ? 'text-teal-400' : 'text-teal-600/60'
              }`} strokeWidth={1.5} />
              <span className={`${
                activeTab === 'friends' ? 'text-teal-200' : 'text-teal-400/60'
              }`}>
                好友私信
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'public' ? (
          /* Public Messages */
          <motion.div
            key="public"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-24"
          >
            <div className="space-y-4">
              {publicMessages.map((message, i) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'received' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex gap-3 ${message.type === 'sent' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-slate-900/80 to-teal-950/60 rounded border-2 border-teal-800/40 flex items-center justify-center">
                      <span className="text-lg">{message.avatar}</span>
                      
                      {/* Floating glow */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute inset-0 bg-teal-500/20 rounded blur-md"
                      />
                    </div>
                  </div>

                  {/* Message content */}
                  <div className={`flex-1 max-w-[85%] ${message.type === 'sent' ? 'flex flex-col items-end' : ''}`}>
                    {message.type === 'received' && (
                      <p className="text-teal-400/60 text-xs mb-1 tracking-wide">{message.from}</p>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`relative overflow-hidden rounded-lg p-3 ${
                        message.type === 'sent'
                          ? 'bg-gradient-to-br from-teal-800/60 to-amber-900/40 border-2 border-teal-700/50'
                          : 'bg-gradient-to-br from-slate-900/80 to-teal-950/50 border-2 border-teal-800/30'
                      }`}
                      style={{
                        boxShadow: message.type === 'sent' 
                          ? '0 4px 20px rgba(20, 184, 166, 0.2)' 
                          : '0 2px 12px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, #14b8a6 8px, #14b8a6 9px)'
                      }} />

                      <p className={`relative text-sm ${
                        message.type === 'sent' ? 'text-teal-100' : 'text-teal-200'
                      }`}>
                        {message.content}
                      </p>
                    </motion.div>

                    <p className="text-teal-400/40 text-xs mt-1 tracking-wide">{message.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Friend Conversations */
          <motion.div
            key="friends"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-24"
          >
            <div className="space-y-3">
              {friendConversations.map((conversation, i) => (
                <motion.button
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectFriend?.(conversation.id)}
                  className="w-full relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-teal-950/40 backdrop-blur-sm border-2 border-teal-800/30 p-4 text-left transition-all hover:border-teal-700/50"
                  style={{
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #14b8a6 10px, #14b8a6 11px)'
                  }} />

                  <div className="relative flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-2 opacity-20"
                      >
                        <svg width="56" height="56" viewBox="0 0 56 56">
                          <circle cx="28" cy="28" r="24" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
                        </svg>
                      </motion.div>
                      <div className="relative w-12 h-12 rounded bg-gradient-to-br from-slate-900/60 to-teal-950/60 border-2 border-teal-700/40 flex items-center justify-center text-xl">
                        {conversation.avatar}
                      </div>
                      {conversation.unread > 0 && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-600 to-red-700 border-2 border-slate-950 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white text-xs">{conversation.unread}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-teal-100 tracking-wide">{conversation.name}</h3>
                        <span className="text-teal-400/50 text-xs whitespace-nowrap ml-2">{conversation.time}</span>
                      </div>
                      <p className="text-teal-400/60 text-sm truncate">{conversation.lastMessage}</p>
                    </div>

                    {/* Arrow */}
                    <MessageCircle className="w-5 h-5 text-teal-400/40 flex-shrink-0" strokeWidth={1.5} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area - only for public messages */}
      {activeTab === 'public' && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="fixed bottom-20 left-0 right-0 px-5"
        >
          <div 
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/95 to-teal-950/90 backdrop-blur-xl border-2 border-teal-800/40 p-3"
            style={{
              boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, #14b8a6 12px, #14b8a6 13px)'
            }} />

            <div className="relative flex items-center gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="向诸位道友传音..."
                className="flex-1 bg-slate-950/60 border border-teal-900/40 rounded px-4 py-2.5 text-sm text-teal-100 placeholder-teal-700/40 focus:outline-none focus:border-teal-700/60 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-teal-700/80 to-amber-700/60 border border-teal-600/60 flex items-center justify-center"
                style={{
                  boxShadow: '0 2px 15px rgba(20, 184, 166, 0.3)'
                }}
              >
                <Send className="w-5 h-5 text-teal-100" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}