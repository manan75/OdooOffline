// HiringStagesForm.jsx
import React, { useState } from "react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";

export default function Form_2() {
  const steps = ["About", "Details", "Application form", "Hiring stages", "Job portals"];
  const [currentStep, setCurrentStep] = useState(3); // Hiring stages

  const [stages, setStages] = useState([
    { name: "Applied", defaultFields: ["Name", "Email", "Number"], optionalFields: [] },
    { name: "Questionnaire", defaultFields: [], optionalFields: [] },
    { name: "Interview", defaultFields: [], optionalFields: [] },
    { name: "Review", defaultFields: [], optionalFields: [] },
    { name: "Hiring complete", defaultFields: [], optionalFields: [] },
  ]);
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const [newField, setNewField] = useState("");

  const handleAddField = () => {
    if (newField.trim()) {
      const updated = [...stages];
      updated[selectedStageIndex].optionalFields.push(newField);
      setStages(updated);
      setNewField("");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      {/* Progress Tracker */}
      <div className="flex justify-between mb-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                idx <= currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {idx + 1}
            </div>
            <span className="ml-2 font-medium">{step}</span>
            {idx < steps.length - 1 && (
              <div className="w-12 h-[2px] bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-1 bg-white rounded-lg shadow overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-gray-50">
          {stages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStageIndex(idx)}
              className={`w-full text-left px-4 py-3 border-b border-gray-200 ${
                idx === selectedStageIndex ? "bg-white font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {stage.name}
            </button>
          ))}
          <button
            onClick={() => setStages([...stages, { name: "New stage", defaultFields: [], optionalFields: [] }])}
            className="w-full px-4 py-3 text-blue-500 hover:bg-blue-50 text-left"
          >
            + New stage
          </button>
        </div>

        {/* Main Panel */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stage name</label>
            <input
              type="text"
              value={stages[selectedStageIndex].name}
              onChange={(e) => {
                const updated = [...stages];
                updated[selectedStageIndex].name = e.target.value;
                setStages(updated);
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Move candidate to next stage once it was added to your list of Candidates.
          </p>

          {/* Default Fields */}
          <h3 className="text-sm font-semibold mb-2">Default form fields</h3>
          <div className="space-y-2 mb-4">
            {stages[selectedStageIndex].defaultFields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              >
                {field === "Name" && <FiUser className="text-gray-500 mr-2" />}
                {field === "Email" && <FiMail className="text-gray-500 mr-2" />}
                {field === "Number" && <FiPhone className="text-gray-500 mr-2" />}
                {field}
              </div>
            ))}
          </div>

          {/* Optional Fields */}
          <h3 className="text-sm font-semibold mb-2">Optional form fields</h3>
          <div className="space-y-2 mb-4">
            {stages[selectedStageIndex].optionalFields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md bg-white"
              >
                <span>{field}</span>
                <button
                  onClick={() => {
                    const updated = [...stages];
                    updated[selectedStageIndex].optionalFields = updated[selectedStageIndex].optionalFields.filter(
                      (_, i) => i !== idx
                    );
                    setStages(updated);
                  }}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              placeholder="Add new field"
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddField}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              + Add
            </button>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Back: Application form
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Next: Job portals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
