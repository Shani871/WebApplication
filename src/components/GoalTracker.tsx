import React, { useState } from 'react';
import { Target, Plus, Edit, Trash } from 'lucide-react';
import { useGoalStore } from '../store/goalStore';
import type { Goal } from '../store/goalStore';

export const GoalTracker = () => {
  const { goals, addGoal, updateGoal, deleteGoal, updateProgress } = useGoalStore();
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    targetDate: new Date(),
    progress: 0,
    category: '',
    milestones: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal(newGoal as Omit<Goal, 'id'>);
    setNewGoal({
      title: '',
      description: '',
      targetDate: new Date(),
      progress: 0,
      category: '',
      milestones: [],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Goals</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4">
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            placeholder="Goal title"
            className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <textarea
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            placeholder="Goal description"
            className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Add Goal
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{goal.title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateGoal(goal.id, { progress: Math.min(goal.progress + 10, 100) })}
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <Target className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{goal.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{goal.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
};