import React, { useState } from 'react';
import { CheckCircle, Circle, Trash, Edit, Plus } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../store/taskStore';

export const TaskList = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTaskStore();
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date(),
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTask as Omit<Task, 'id'>);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: new Date() });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="New task title"
            className="flex-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleComplete(task.id)}
                className="text-gray-500 hover:text-indigo-600"
              >
                {task.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </button>
              <div>
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-500">{task.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(task.id)}
                className="text-gray-500 hover:text-indigo-600"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};