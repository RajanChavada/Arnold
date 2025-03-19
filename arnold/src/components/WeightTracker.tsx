import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeightEntry {
  date: Date;
  currentWeight: number;
  goalWeight: number;
}

interface WeightTrackerProps {
  weightHistory: WeightEntry[];
}

export const WeightTracker: React.FC<WeightTrackerProps> = ({ weightHistory }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight Progress Over Time',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  const data = {
    labels: weightHistory.map(entry => format(entry.date, 'MMM d, yyyy')),
    datasets: [
      {
        label: 'Current Weight',
        data: weightHistory.map(entry => entry.currentWeight),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Goal Weight',
        data: weightHistory.map(entry => entry.goalWeight),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="flex justify-center items-center h-full bg-white rounded-lg">
      <Line options={options} data={data} />
    </div>
  );
};