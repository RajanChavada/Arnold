import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { AiTrainer } from './AiTrainer';
import { DietTrainer } from "./DietTrainer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Edit2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WeightTracker } from './WeightTracker';

interface StatsPanelProps {
  currentWeight?: number;
  age?: number;
  goalWeight?: number;
  fitnessGoal?: "cutting" | "bulking" | "maintenance";
  onStatsUpdate?: (stats: Stats) => void;
}

interface Stats {
  currentWeight: number;
  age: number;
  goalWeight: number;
  fitnessGoal: string;
}

interface UserData {
  email: string;
  selectedGoal: string;
  currentWeight: number;
  goalWeightChange: number;
  trainingIntensity: number;
  age: number;
  height: number;
}

interface WeightEntry {
  date: Date;
  currentWeight: number;
  goalWeight: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  currentWeight = 70,
  age = 25,
  goalWeight = 65,
  fitnessGoal = "maintenance",
  onStatsUpdate = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dietPlanType, setDietPlanType] = useState<'weekly' | 'daily'>('weekly');
  const [dietType, setDietType] = useState<'nonvegetarian' | 'vegetarian' | 'vegan'>('nonvegetarian');

  const [stats, setStats] = useState<Stats>({
    currentWeight,
    age,
    goalWeight,
    fitnessGoal,
  });

  useEffect(() => { 
    setStats({
      currentWeight,
      age,
      goalWeight,
      fitnessGoal,
    }); 
  }, [currentWeight, age, goalWeight, fitnessGoal]); 

  const handleSave = () => {
    setIsEditing(false);
    onStatsUpdate(stats);
  };

  return (
    <>
      <Card className="p-6 bg-background  bg-white text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">Fitness Stats</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Edit2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentWeight">Current Weight (kg)</Label>
            <Input
              id="currentWeight"
              type="number"
              value={stats.currentWeight}
              disabled={!isEditing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStats({ ...stats, currentWeight: parseFloat(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={stats.age}
              disabled={!isEditing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStats({ ...stats, age: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
            <Input
              id="goalWeight"
              type="number"
              value={stats.goalWeight}
              disabled={!isEditing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStats({ ...stats, goalWeight: parseFloat(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fitnessGoal">Fitness Goal</Label>
            <Select
              disabled={!isEditing}
              value={stats.fitnessGoal}
              onValueChange={(value: string) =>
                setStats({ ...stats, fitnessGoal: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cutting">Cutting</SelectItem>
                <SelectItem value="bulking">Bulking</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card >
      <div className="grid grid-cols-2 gap-4"> 
        <Card className="p-6 bg-background bg-white text-black mt-5 h-[600px] overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Training</h2>
          </div>   
          <div className="h-[calc(100%-4rem)] overflow-y-auto scrollbar-custom">
            <AiTrainer />
          </div>
        </Card>
        <Card className="p-6 bg-background bg-white text-black mt-5 h-[600px] overflow-hidden">
          <div className="flex flex-col mb-4">
            <h2 className="text-2xl font-bold text-black mb-4">Diet Plan</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="nonvegetarian"
                  name="diet-plan"
                  onChange={() => setDietType('nonvegetarian')}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="nonvegetarian" className="text-sm font-medium text-gray-700">
                  Non-Vegetarian
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="vegetarian"
                  name="diet-plan"
                  onChange={() => setDietType('vegetarian')}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="vegetarian" className="text-sm font-medium text-gray-700">
                  Vegetarian
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="vegan"
                  name="diet-plan"
                  onChange={() => setDietType('vegan')}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="vegan" className="text-sm font-medium text-gray-700">
                  Vegan
                </label>
              </div>
            </div>
          </div>   
          <div className="h-[calc(100%-4rem)] overflow-y-auto scrollbar-custom">
            <DietTrainer 
              currentWeight={stats.currentWeight}
              goalWeight={stats.goalWeight}
              fitnessGoal={stats.fitnessGoal}
              age={stats.age}
              dietType={dietType}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const navigate = useNavigate();
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          navigate('/signup-login');
          return;
        }

        const response = await fetch(`http://localhost:5001/api/user-data/${email}`);
        const data = await response.json();

        if (!data.hasData) {
          navigate('/signup');
          return;
        }

        setUserData(data.hasData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('weightHistory');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setWeightHistory(parsed.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })));
    }
  }, []);

  const mapGoalToFitnessGoal = (goal: string): "cutting" | "bulking" | "maintenance" => {
    const goalMap: { [key: string]: "cutting" | "bulking" | "maintenance" } = {
      "cutting": "cutting",
      "bulking": "bulking",
      "maintenance": "maintenance"
    };
    return goalMap[goal] || "maintenance";
  };

  const handleStatsUpdate = async (stats: Stats) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData?.email,
          currentWeight: stats.currentWeight,
          age: stats.age,
          goalWeight: stats.goalWeight,
          fitnessGoal: stats.fitnessGoal,
        }),
      };

      const response = await fetch('http://localhost:5001/api/updateStats', requestOptions);
      if (!response.ok) throw new Error('Failed to update stats');

      const newEntry: WeightEntry = {
        date: new Date(),
        currentWeight: stats.currentWeight,
        goalWeight: stats.goalWeight
      };

      const updatedHistory = [...weightHistory, newEntry];
      setWeightHistory(updatedHistory);

      localStorage.setItem('weightHistory', JSON.stringify(updatedHistory));

      setSuccessMessage('Successfully updated user statistics!');
      setTimeout(() => setSuccessMessage(''), 2000);

      fetchUpdatedUserData();

    } catch (error) {
      console.error('Error updating stats:', error);
    }
  };
  
  const fetchUpdatedUserData = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) return;
  
      const response = await fetch(`http://localhost:5001/api/user-data/${email}`);
      const data = await response.json();
  
      if (data.hasData) {
        console.log(data.hasData); 
        setUserData(data.hasData); 
      }
    } catch (error) {
      console.error('Error fetching updated user data:', error);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div className="container mx-auto p-4">
      {successMessage && (
        <div className="bg-green-700 text-white p-4 rounded mb-4">{successMessage}</div>
      )}
      <StatsPanel 
        currentWeight={userData.currentWeight}
        age={userData.age}
        goalWeight={userData.goalWeightChange}
        fitnessGoal={mapGoalToFitnessGoal(userData.selectedGoal)}
        onStatsUpdate={handleStatsUpdate}
      />
      
      <div className="mt-5 h-[600px]">
        <WeightTracker weightHistory={weightHistory} />
      </div>

      
    </div>
  );
};

export default Home;

