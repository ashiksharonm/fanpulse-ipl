import { LayoutDashboard, Activity, Zap, Trophy } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dash' },
    { id: 'live', icon: Activity, label: 'Live' },
    { id: 'predict', icon: Zap, label: 'Predict' },
    { id: 'ranks', icon: Trophy, label: 'Ranks' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full lg:hidden bg-surface/90 backdrop-blur-xl border-t border-white/10 z-50 flex justify-around items-center h-16 px-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === item.id ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <item.icon size={20} fill={activeTab === item.id ? "currentColor" : "none"} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
