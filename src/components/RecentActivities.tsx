import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { useGoalStore } from '../store/goalStore';
import { usePhysicalActivityStore } from '../store/physicalActivityStore';
import { CheckCircle, Target, Activity } from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'task' | 'goal' | 'activity';
  title: string;
  timestamp: Date;
  description: string;
}

export const RecentActivities = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const goals = useGoalStore((state) => state.goals);
  const activities = usePhysicalActivityStore((state) => state.activities);

  const timelineItems: TimelineItem[] = [
    ...tasks.map((task) => ({
      id: task.id,
      type: 'task' as const,
      title: task.title,
      timestamp: task.dueDate,
      description: task.description,
    })),
    ...goals.map((goal) => ({
      id: goal.id,
      type: 'goal' as const,
      title: goal.title,
      timestamp: goal.targetDate,
      description: `Progress: ${goal.progress}%`,
    })),
    ...activities.map((activity) => ({
      id: activity.id,
      type: 'activity' as const,
      title: activity.type,
      timestamp: activity.date,
      description: `${activity.duration} minutes | ${activity.caloriesBurned} calories`,
    })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'task':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'goal':
        return <Target className="h-6 w-6 text-indigo-500" />;
      case 'activity':
        return <Activity className="h-6 w-6 text-orange-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
      <div className="space-y-4">
        {timelineItems.slice(0, 10).map((item) => (
          <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            {getIcon(item.type)}
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};