import { create } from 'zustand';

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  category: string;
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

interface GoalState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  addGoal: (goal) =>
    set((state) => ({
      goals: [
        ...state.goals,
        { ...goal, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  updateGoal: (id, updatedGoal) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedGoal } : goal
      ),
    })),
  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    })),
  updateProgress: (id, progress) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, progress } : goal
      ),
    })),
  toggleMilestone: (goalId, milestoneId) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              milestones: goal.milestones.map((milestone) =>
                milestone.id === milestoneId
                  ? { ...milestone, completed: !milestone.completed }
                  : milestone
              ),
            }
          : goal
      ),
    })),
}));