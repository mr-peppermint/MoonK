import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type InfinityStone = 'space' | 'time' | 'reality' | 'power' | 'mind' | 'soul';

export interface StoneTheme {
  id: InfinityStone;
  name: string;
  label: string;
  color: string;
  rgb: string;
  emoji: string;
  gradient: string;
  bgGradient: string;
}

export const STONE_THEMES: Record<InfinityStone, StoneTheme> = {
  space: {
    id: 'space',
    name: 'Space Stone',
    label: 'Tesseract',
    color: '#00b4d8',
    rgb: '0, 180, 216',
    emoji: '🌌',
    gradient: 'from-cyan-400 via-blue-500 to-cyan-600',
    bgGradient: 'linear-gradient(135deg, #00b4d8, #0077b6)',
  },
  time: {
    id: 'time',
    name: 'Time Stone',
    label: 'Eye of Agamotto',
    color: '#2f8d46',
    rgb: '47, 141, 70',
    emoji: '⏳',
    gradient: 'from-green-400 via-emerald-500 to-green-600',
    bgGradient: 'linear-gradient(135deg, #2f8d46, #1a6e2e)',
  },
  reality: {
    id: 'reality',
    name: 'Reality Stone',
    label: 'Aether',
    color: '#e63946',
    rgb: '230, 57, 70',
    emoji: '🔴',
    gradient: 'from-red-400 via-rose-500 to-red-600',
    bgGradient: 'linear-gradient(135deg, #e63946, #c1121f)',
  },
  power: {
    id: 'power',
    name: 'Power Stone',
    label: 'Orb',
    color: '#9b5de5',
    rgb: '155, 93, 229',
    emoji: '🟣',
    gradient: 'from-purple-400 via-violet-500 to-purple-600',
    bgGradient: 'linear-gradient(135deg, #9b5de5, #7b2cbf)',
  },
  mind: {
    id: 'mind',
    name: 'Mind Stone',
    label: 'Scepter',
    color: '#f4a261',
    rgb: '244, 162, 97',
    emoji: '🟡',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    bgGradient: 'linear-gradient(135deg, #f4a261, #e76f51)',
  },
  soul: {
    id: 'soul',
    name: 'Soul Stone',
    label: 'Vormir',
    color: '#e76f51',
    rgb: '231, 111, 81',
    emoji: '🟠',
    gradient: 'from-orange-400 via-amber-600 to-orange-700',
    bgGradient: 'linear-gradient(135deg, #e76f51, #d62828)',
  },
};

interface ThemeContextType {
  stone: InfinityStone;
  theme: StoneTheme;
  setStone: (stone: InfinityStone) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [stone, setStoneState] = useState<InfinityStone>('space');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const setStone = useCallback((s: InfinityStone) => {
    setStoneState(s);
    document.documentElement.style.setProperty('--glow-color', STONE_THEMES[s].color);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return React.createElement(
    ThemeContext.Provider,
    {
      value: {
        stone,
        theme: STONE_THEMES[stone],
        setStone,
        soundEnabled,
        toggleSound,
      },
    },
    children
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
