import { create } from 'zustand';

interface PomodoroState {
  isRunning: boolean;
  timeLeft: number;
  isBreak: boolean;
  workDuration: number;
  breakDuration: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const usePomodoroStore = create<PomodoroState>((set) => ({
  isRunning: false,
  timeLeft: 25 * 60,
  isBreak: false,
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  toggleTimer: () => set((state) => ({ isRunning: !state.isRunning })),
  resetTimer: () =>
    set((state) => ({
      timeLeft: state.isBreak ? state.breakDuration : state.workDuration,
      isRunning: false,
    })),
  tick: () =>
    set((state) => ({
      timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      isBreak: state.timeLeft === 0 ? !state.isBreak : state.isBreak,
      timeLeft:
        state.timeLeft === 0
          ? state.isBreak
            ? state.workDuration
            : state.breakDuration
          : state.timeLeft - 1,
    })),
}));