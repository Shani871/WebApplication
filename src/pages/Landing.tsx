import React from 'react';
import { Link } from 'react-router-dom';
import { Timer, PieChart, BarChart } from 'lucide-react';
import { ActivitySummary } from '../components/ActivitySummary';
import { RecentActivities } from '../components/RecentActivities';

export const Landing = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Track your productivity</span>
                  <span className="block text-indigo-600">like never before</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Boost your productivity with our comprehensive activity tracking
                  solution. Features include Pomodoro timer, detailed analytics,
                  and intuitive activity management.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <Link
                    to="/dashboard"
                    className="rounded-md shadow px-8 py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Activity Summary Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ActivitySummary />
      </div>

      {/* Recent Activities Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <RecentActivities />
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay productive
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center">
                <Timer className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  Pomodoro Timer
                </h3>
                <p className="mt-2 text-center text-gray-500">
                  Stay focused with customizable work and break intervals
                </p>
              </div>
              <div className="flex flex-col items-center">
                <PieChart className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  Activity Analytics
                </h3>
                <p className="mt-2 text-center text-gray-500">
                  Visualize your productivity with detailed charts and graphs
                </p>
              </div>
              <div className="flex flex-col items-center">
                <BarChart className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  Progress Tracking
                </h3>
                <p className="mt-2 text-center text-gray-500">
                  Monitor your daily, weekly, and monthly progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};