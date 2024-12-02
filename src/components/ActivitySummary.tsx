import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { useGoalStore } from '../store/goalStore';
import { usePhysicalActivityStore } from '../store/physicalActivityStore';
import { CheckCircle2, Target, Activity } from 'lucide-react';

export const ActivitySummary = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const goals = useGoalStore((state) => state.goals);
  const activities = usePhysicalActivityStore((state) => state.activities);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalCaloriesBurned = activities.reduce(
    (sum, activity) => sum + activity.caloriesBurned,
    0
  );
  const averageGoalProgress =
    goals.reduce((sum, goal) => sum + goal.progress, 0) / (goals.length || 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Tasks Completed</h3>
            <p className="text-3xl font-bold">{completedTasks}/{tasks.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Target className="h-10 w-10 text-indigo-500" />
          <div>
            <h3 className="text-lg font-semibold">Average Goal Progress</h3>
            <p className="text-3xl font-bold">{averageGoalProgress.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Activity className="h-10 w-10 text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Calories Burned</h3>
            <p className="text-3xl font-bold">{totalCaloriesBurned}</p>
          </div>
        </div>
      </div>
    </div>
  );
};