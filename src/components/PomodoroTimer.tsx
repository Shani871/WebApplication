import React, { useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { usePomodoroStore } from '../store/pomodoroStore';

export const PomodoroTimer = () => {
  const { isRunning, timeLeft, isBreak, toggleTimer, resetTimer, tick } =
    usePomodoroStore();

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isBreak ? 'Break Time' : 'Work Time'}
      </h2>
      <div className="text-6xl font-bold text-center mb-6">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          {isRunning ? (
            <>
              <Pause className="h-5 w-5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              <span>Start</span>
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};