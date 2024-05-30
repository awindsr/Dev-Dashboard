import React, { useState } from 'react';

function AddProjectModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('on going');
  const [phases, setPhases] = useState([{ text: '', isCompleted: false }]);

  const handleAddPhase = () => {
    setPhases([...phases, { text: '', isCompleted: false }]);
  };

  const handleDeletePhase = (index) => {
    const updatedPhases = phases.filter((_, i) => i !== index);
    setPhases(updatedPhases);
  };

  const handlePhaseChange = (index, text) => {
    const updatedPhases = phases.map((phase, i) =>
      i === index ? { ...phase, text } : phase
    );
    setPhases(updatedPhases);
  };

  const handleSave = () => {
    const newProject = {
      title,
      description,
      projectComplete: status === 'completed',
      phases,
      status
    };
    onSave(newProject);
    onClose();
    console.log(newProject);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl mb-4">Add New Project</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 mb-4"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 mb-4"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border w-full p-2 mb-4"
        >
          <option value="completed">Completed</option>
          <option value="on going">On Going</option>
          <option value="an idea">An Idea</option>
        </select>
        <div className="mb-4">
          <h3 className="mb-2">Phases</h3>
          {phases.map((phase, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                placeholder={`Phase ${index + 1}`}
                value={phase.text}
                onChange={(e) => handlePhaseChange(index, e.target.value)}
                className="border w-full p-2"
              />
              <button
                onClick={() => handleDeletePhase(index)}
                className="ml-2 bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={handleAddPhase}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Another Phase
          </button>
        </div>
        <button
          onClick={handleSave}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddProjectModal;
