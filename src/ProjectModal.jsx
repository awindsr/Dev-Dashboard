import React, { useState } from 'react';

const ProjectModal = ({ project, onClose }) => {
  const [newPhaseText, setNewPhaseText] = useState('');
  const [phases, setPhases] = useState(project.phases);

  const handleAddPhase = () => {
    if (newPhaseText.trim() !== '') {
      setPhases([...phases, { text: newPhaseText.trim(), isCompleted: false }]);
      setNewPhaseText('');
    }
  };

  const handleDeletePhase = (index) => {
    const updatedPhases = [...phases];
    updatedPhases.splice(index, 1);
    setPhases(updatedPhases);
  };

  const handleToggleCompleted = (index) => {
    const updatedPhases = [...phases];
    updatedPhases[index].isCompleted = !updatedPhases[index].isCompleted;
    setPhases(updatedPhases);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div>
          {phases.map((phase, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={phase.isCompleted}
                  onChange={() => handleToggleCompleted(index)}
                  className="mr-2"
                />
                <p className={phase.isCompleted ? "line-through" : ""}>{phase.text}</p>
              </div>
              <button onClick={() => handleDeletePhase(index)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5zm2-2a1 1 0 1 0 0-2h8a1 1 0 1 0 0 2H5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M8 11a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4zm4 0a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newPhaseText}
              onChange={(e) => setNewPhaseText(e.target.value)}
              placeholder="Add new phase"
              className="border-b border-gray-300 outline-none mr-2"
            />
            <button onClick={handleAddPhase} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
