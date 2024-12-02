import { create } from 'zustand';
import { useTaskStore } from './taskStore';
import { useGoalStore } from './goalStore';
import { usePhysicalActivityStore } from './physicalActivityStore';

interface Activity {
  id: string;
  name: string;
  duration: number;
  category: string;
  timestamp: Date;
}

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  removeActivity: (id: string) => void;
  getActivityStats: () => {
    totalDuration: number;
    categoryDistribution: { [key: string]: number };
    weeklyProgress: { [key: string]: number };
  };
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({
      activities: [
        ...state.activities,
        { ...activity, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  removeActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    })),
  getActivityStats: () => {
    const state = get();
    const tasks = useTaskStore.getState().tasks;
    const goals = useGoalStore.getState().goals;
    const physicalActivities = usePhysicalActivityStore.getState().activities;

    // Combine all activities for comprehensive stats
    const allActivities = [
      ...state.activities,
      ...tasks.map(task => ({
        id: task.id,
        name: task.title,
        duration: task.completed ? 60 : 0, // Assuming 1 hour per completed task
        category: 'Tasks',
        timestamp: task.dueDate
      })),
      ...goals.map(goal => ({
        id: goal.id,
        name: goal.title,
        duration: 120, // Assuming 2 hours per goal
        category: 'Goals',
        timestamp: goal.targetDate
      })),
      ...physicalActivities.map(activity => ({
        id: activity.id,
        name: activity.type,
        duration: activity.duration,
        category: 'Physical',
        timestamp: activity.date
      }))
    ];

    // Calculate total duration
    const totalDuration = allActivities.reduce(
      (sum, activity) => sum + activity.duration,
      0
    );

    // Calculate category distribution
    const categoryDistribution = allActivities.reduce((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + activity.duration;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate weekly progress
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weeklyProgress = allActivities
      .filter(activity => activity.timestamp >= weekStart)
      .reduce((acc, activity) => {
        const day = activity.timestamp.toLocaleDateString('en-US', { weekday: 'short' });
        acc[day] = (acc[day] || 0) + activity.duration;
        return acc;
      }, {} as { [key: string]: number });

    return {
      totalDuration,
      categoryDistribution,
      weeklyProgress,
    };
  },
}));