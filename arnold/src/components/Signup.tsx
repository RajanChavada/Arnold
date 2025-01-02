import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Signup() {
  const [open, setOpen] = React.useState(true); // Set to true to open on page load
  const [secondModalOpen, setSecondModalOpen] = React.useState(false); // State for the second modal
  const [selectedGoal, setSelectedGoal] = React.useState(""); // State to track selected goal
  const [currentWeight, setCurrentWeight] = React.useState(""); // State for current weight
  const [goalWeightChange, setGoalWeightChange] = React.useState(""); // State for goal weight change
  const [trainingIntensity, setTrainingIntensity] = React.useState(""); // State for training intensity
  const [age, setAge] = React.useState(""); // State for age
  const [height, setHeight] = React.useState(""); // State for height

  const handleOpen = () => setOpen((cur) => !cur);
  const handleNext = () => {
    setSecondModalOpen(true); // Open the second modal
    handleOpen(); // Close the first modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Delivery Method
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            What are your fitness goals?
          </Typography>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div>
              <input
                type="radio"
                id="standard"
                name="hosting"
                value="standard"
                className="peer hidden"
                required
              />
              <label
                htmlFor="standard"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold">
                    Cut
                  </Typography>
                  <Typography className="font-normal text-gray-600">
                    For those who wish to cut body fat and get leaner{" "}
                    <strong className="text-gray-900"></strong>
                  </Typography>
                </div>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="express"
                name="hosting"
                defaultChecked
                value="express"
                className="peer hidden"
                required
              />
              <label
                htmlFor="express"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold">
                    Maintain
                  </Typography>
                  <Typography className="font-normal text-gray-600">
                    For those who wish to maintain their weight, but also get stronger{" "}
                    <strong className="text-gray-900"></strong>
                  </Typography>
                </div>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="store"
                name="hosting"
                value="store"
                className="peer hidden"
                required
              />
              <label
                htmlFor="store"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold">
                    Bulk
                  </Typography>
                  <Typography className="font-normal text-gray-600">
                    For those trying to get stronger and bigger{" "}
                    <strong className="text-gray-900"></strong>
                  </Typography>
                </div>
              </label>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <button
            className="ml-auto bg-blue-500 px-4 py-2 text-white rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </DialogFooter>
      </Dialog>

      <Dialog size="sm" open={secondModalOpen} handler={() => setSecondModalOpen(false)} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Your Goal
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography>Your goal is: {selectedGoal}</Typography>
          <input
            type="number"
            placeholder="Current Weight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded text-gray-900"
          />
          {selectedGoal === "Cut" || selectedGoal === "Bulk" ? (
            <input
              type="number"
              placeholder="Goal Weight Change per Week"
              value={goalWeightChange}
              onChange={(e) => setGoalWeightChange(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded text-gray-900"
            />
          ) : null}
          <div className="mt-4">
            <Typography>Training Intensity (1-5):</Typography>
            {[1, 2, 3, 4, 5].map((intensity) => (
              <div key={intensity}>
                <input
                  type="radio"
                  id={`intensity-${intensity}`}
                  name="trainingIntensity"
                  value={intensity}
                  onChange={(e) => setTrainingIntensity(e.target.value)}
                  className="peer hidden"
                  required
                />
                <label
                  htmlFor={`intensity-${intensity}`}
                  className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
                >
                  {intensity}
                </label>
              </div>
            ))}
          </div>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="number"
            placeholder="Height (in cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded text-gray-900"
          />
        </DialogBody>
        <DialogFooter>
          <button
            className="ml-auto bg-blue-500 px-4 py-2 text-white rounded"
            onClick={() => setSecondModalOpen(false)}
          >
            Submit
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
