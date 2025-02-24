import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Edit2, Save } from "lucide-react";

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

const StatsPanel: React.FC<StatsPanelProps> = ({
  currentWeight = 70,
  age = 25,
  goalWeight = 65,
  fitnessGoal = "maintenance",
  onStatsUpdate = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<Stats>({
    currentWeight,
    age,
    goalWeight,
    fitnessGoal,
  });

  const handleSave = () => {
    setIsEditing(false);
    onStatsUpdate(stats);
  };

  return (
    <Card className="p-6 bg-background border-border">
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
    </Card>
  );
};

const Home: React.FC = () => {
  const handleStatsUpdate = (stats: Stats) => {
    console.log('Stats updated:', stats);
    // Here you can add API call to save stats
  };

  return (
    <div className="container mx-auto p-4">
      <StatsPanel onStatsUpdate={handleStatsUpdate} />
    </div>
  );
};

export default Home;
