import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import CreateTaskPage from './components/CreateTaskPage';
import FriendsPage from './components/FriendsPage';
import ProfilePage from './components/ProfilePage';
import CalendarPage from './components/CalendarPage';
import MessagesPage from './components/MessagesPage';
import UserCenterPage from './components/UserCenterPage';
import PrivacySettingsPage from './components/PrivacySettingsPage';
import ReminderSettingsPage from './components/ReminderSettingsPage';
import NotificationSettingsPage from './components/NotificationSettingsPage';
import AddFriendPage from './components/AddFriendPage';
import Navigation from './components/Navigation';

export interface Task {
  id: string;
  title: string;
  category: '灵识任务' | '体修任务' | '心法任务' | '杂务';
  completed: boolean;
  priority: number;
  reminder?: string;
  repeat?: boolean;
  date: string;
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'friends' | 'profile' | 'calendar' | 'messages'>('home');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showUserCenter, setShowUserCenter] = useState(false);
  const [showSettings, setShowSettings] = useState<'privacy' | 'reminder' | 'notification' | null>(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '晨间打坐冥想',
      category: '灵识任务',
      completed: false,
      priority: 3,
      repeat: true,
      date: '2025-11-22'
    },
    {
      id: '2',
      title: '研读道德经第三章',
      category: '心法任务',
      completed: true,
      priority: 2,
      repeat: true,
      date: '2025-11-22'
    },
    {
      id: '3',
      title: '炼体功法一百式',
      category: '体修任务',
      completed: false,
      priority: 2,
      reminder: '06:00',
      date: '2025-11-22'
    },
    {
      id: '4',
      title: '整理洞府杂物',
      category: '杂务',
      completed: false,
      priority: 1,
      date: '2025-11-22'
    }
  ]);

  const [userLevel, setUserLevel] = useState({
    rank: '筑基',
    stage: '中期',
    level: 3,
    exp: 3240,
    nextLevelExp: 5000,
    attributes: {
      diligence: 85, // 勤奋灵根
      wisdom: 72,    // 心法灵根
      body: 68       // 体修灵根
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    if (!tasks.find(t => t.id === id)?.completed) {
      setUserLevel(prev => ({ ...prev, exp: prev.exp + 60 }));
    }
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    setShowCreateTask(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  if (showWelcome) {
    return <WelcomePage />;
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {showAddFriend ? (
          <AddFriendPage onBack={() => setShowAddFriend(false)} />
        ) : showSettings ? (
          <>
            {showSettings === 'privacy' && (
              <PrivacySettingsPage onBack={() => setShowSettings(null)} />
            )}
            {showSettings === 'reminder' && (
              <ReminderSettingsPage onBack={() => setShowSettings(null)} />
            )}
            {showSettings === 'notification' && (
              <NotificationSettingsPage onBack={() => setShowSettings(null)} />
            )}
          </>
        ) : showUserCenter ? (
          <UserCenterPage 
            onBack={() => setShowUserCenter(false)} 
            onNavigateToSettings={(page) => setShowSettings(page)}
          />
        ) : !showCreateTask ? (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-20"
          >
            {currentPage === 'home' && (
              <HomePage
                tasks={tasks}
                userLevel={userLevel}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onCreateTask={() => setShowCreateTask(true)}
              />
            )}
            {currentPage === 'friends' && (
              <FriendsPage 
                onStartChat={(friendId) => {
                  setSelectedFriend(friendId);
                  setCurrentPage('messages');
                }}
                onNavigateToAddFriend={() => setShowAddFriend(true)}
              />
            )}
            {currentPage === 'profile' && (
              <ProfilePage 
                userLevel={userLevel} 
                tasks={tasks}
                onOpenUserCenter={() => setShowUserCenter(true)}
              />
            )}
            {currentPage === 'calendar' && <CalendarPage tasks={tasks} />}
            {currentPage === 'messages' && (
              <MessagesPage 
                selectedFriend={selectedFriend}
                onClearSelectedFriend={() => setSelectedFriend(null)}
                onSelectFriend={(friendId) => setSelectedFriend(friendId)}
              />
            )}
          </motion.div>
        ) : (
          <CreateTaskPage
            onAdd={handleAddTask}
            onClose={() => setShowCreateTask(false)}
          />
        )}
      </AnimatePresence>

      {!showCreateTask && !showUserCenter && !showSettings && !showAddFriend && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </div>
  );
}