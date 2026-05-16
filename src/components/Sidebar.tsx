import { LayoutDashboard, Activity, Zap, Trophy, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'live', icon: Activity, label: 'Live Match' },
    { id: 'predict', icon: Zap, label: 'Predictions' },
    { id: 'ranks', icon: Trophy, label: 'Leaderboard' },
  ];

  return (
    <nav className="h-screen w-64 fixed left-0 top-0 pt-16 hidden lg:flex flex-col bg-surface-container-lowest/50 backdrop-blur-2xl border-r border-white/5 z-40">
      <div className="p-md border-b border-white/5 mb-sm">
        <h2 className="font-display text-4xl font-black text-primary italic tracking-tighter">Pulse Elite</h2>
        <p className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase mt-1">Pro Analyst Mode</p>
      </div>
      
      <div className="flex flex-col py-md gap-sm flex-grow">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-sm px-6 py-4 transition-all duration-300 ease-in-out text-left w-full ${
              activeTab === item.id 
                ? 'bg-primary/10 text-primary border-r-4 border-primary font-bold shadow-[inset_0_0_20px_rgba(255,179,175,0.1)]' 
                : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
            }`}
          >
            <item.icon size={20} fill={activeTab === item.id ? "currentColor" : "none"} />
            <span className="text-sm font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}

        <button
          className="flex items-center gap-sm px-6 py-4 text-on-surface-variant hover:bg-white/5 hover:text-on-surface mt-auto border-t border-white/5 pt-md text-left w-full"
        >
          <Settings size={20} />
          <span className="text-sm font-semibold tracking-wide">Settings</span>
        </button>
      </div>

      <div className="p-md">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-white/5 border border-secondary-container text-secondary-container font-semibold text-sm rounded-lg hover:shadow-[0_0_12px_rgba(255,219,60,0.3)] transition-all flex items-center justify-center gap-2"
        >
          Go Premium
        </motion.button>
      </div>
    </nav>
  );
}
