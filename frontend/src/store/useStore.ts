import { create } from 'zustand';

interface UserData {
  name: string;
  age: string;
  location: string;
  email: string;
  phone: string;
  grievance: string;
}

interface AppState {
  hasSeenIntro: boolean;
  setHasSeenIntro: (val: boolean) => void;
  
  activeView: 'home' | 'chat' | 'origin' | 'powers' | 'map' | 'mission_control' | 'game';
  setActiveView: (view: 'home' | 'chat' | 'origin' | 'powers' | 'map' | 'mission_control' | 'game') => void;
  
  systemStatus: 'ONLINE' | 'SCANNING' | 'ALERT' | 'OFFLINE';
  setSystemStatus: (status: 'ONLINE' | 'SCANNING' | 'ALERT' | 'OFFLINE') => void;
  
  userData: Partial<UserData>;
  updateUserData: (data: Partial<UserData>) => void;
  
  gameScore: number;
  setGameScore: (score: number) => void;
  
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useStore = create<AppState>((set) => ({
  hasSeenIntro: false,
  setHasSeenIntro: (val) => set({ hasSeenIntro: val }),
  
  activeView: 'home',
  setActiveView: (view) => set({ activeView: view }),
  
  systemStatus: 'ONLINE',
  setSystemStatus: (status) => set({ systemStatus: status }),
  
  userData: {},
  updateUserData: (data) => set((state) => ({ userData: { ...state.userData, ...data } })),
  
  gameScore: 0,
  setGameScore: (score) => set({ gameScore: score }),
  
  theme: 'dark',
  setTheme: (theme) => {
    set({ theme });
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
}));
