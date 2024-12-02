import React, { useState } from 'react';
import { Activity, Plus, Edit, Trash } from 'lucide-react';
import { usePhysicalActivityStore } from '../store/physicalActivityStore';
import type { PhysicalActivity } from '../store/physicalActivityStore';

export const PhysicalActivityTracker = () => {
  const { activities, addActivity, updateActivity, deleteActivity } = usePhysicalActivityStore();
  const [newActivity, setNewActivity] = useState<Partial<PhysicalActivity>>({
    type: '',
    duration: 0,
    intensity: 'medium',
    caloriesBurned: 0,
    date: new Date(),
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity(newActivity as Omit<PhysicalActivity, 'id'>);
    setNewActivity({
      type: '',
      duration: 0,
      intensity: 'medium',
      caloriesBurned: 0,
      date: new Date(),
      notes: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Physical Activities</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newActivity.type}
            onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
            placeholder="Activity type"
            className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="number"
            value={newActivity.duration}
            onChange={(e) => setNewActivity({ ...newActivity, duration: Number(e.target.value) })}
            placeholder="Duration (minutes)"
            className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <select
            value={newActivity.intensity}
            onChange={(e) =>
              setNewActivity({
                ...newActivity,
                intensity: e.target.value as PhysicalActivity['intensity'],
              })
            }
            className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="low">Low Intensity</option>
            <option value="medium">Medium Intensity</option>
            <option value="high">High Intensity</option>
          </select>
          <input
            type="number"
            value={newActivity.caloriesBurned}
            onChange={(e) =>
              setNewActivity({ ...newActivity, caloriesBurned: Number(e.target.value) })
            }
            placeholder="Calories burned"
            className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Add Activity
        </button>
      </form>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{activity.type}</h3>
                <p className="text-sm text-gray-500">
                  {activity.duration} minutes | {activity.intensity} intensity
                </p>
                <p className="text-sm text-gray-500">{activity.caloriesBurned} calories burned</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => deleteActivity(activity.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};