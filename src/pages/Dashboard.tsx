import React from 'react';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { ActivityChart } from '../components/ActivityChart';
import { TaskList } from '../components/TaskList';
import { GoalTracker } from '../components/GoalTracker';
import { PhysicalActivityTracker } from '../components/PhysicalActivityTracker';
import { ActivitySummary } from '../components/ActivitySummary';
import { RecentActivities } from '../components/RecentActivities';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="mb-8">
          <ActivitySummary />
        </div>

        {/* Timer and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PomodoroTimer />
          <ActivityChart />
        </div>

        {/* Recent Activities */}
        <div className="mb-8">
          <RecentActivities />
        </div>

        {/* Task, Goal, and Physical Activity Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TaskList />
          <GoalTracker />
          <PhysicalActivityTracker />
        </div>
      </div>
    </div>
  );
};