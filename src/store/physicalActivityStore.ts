import { create } from 'zustand';

export interface PhysicalActivity {
  id: string;
  type: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  caloriesBurned: number;
  date: Date;
  notes: string;
}

interface PhysicalActivityState {
  activities: PhysicalActivity[];
  addActivity: (activity: Omit<PhysicalActivity, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<PhysicalActivity>) => void;
  deleteActivity: (id: string) => void;
}

export const usePhysicalActivityStore = create<PhysicalActivityState>((set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({
      activities: [
        ...state.activities,
        { ...activity, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  updateActivity: (id, updatedActivity) =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id ? { ...activity, ...updatedActivity } : activity
      ),
    })),
  deleteActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    })),
}));