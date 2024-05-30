import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import UserStats from "./UserStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSheetPlastic,
  faRightFromBracket,
  faChartPie,
  faLightbulb,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ProjectStats from "./Projects";
import LoginPage from "./LoginPage";
import AddProjectModal from "./AddProjectModal"; // Adjust the import path as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  const [projects, setProjects] = useState([]);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleAddProject = () => {
    setIsAddProjectModalOpen(true);
  };

  const handleCloseAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
  };

  const handleSaveProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="h-screen overflow-auto w-screen bg-gradient-to-b from-neutral-900 to-zinc-900 flex">
      <Sidebar />
      <div className="w-full">
        <Header onAddProject={handleAddProject} />
        <Routes>
          <Route path="/" element={<Navigate to="/app/userstats" />} />
          <Route path="userstats" element={<UserStats />} />
          <Route path="projects" element={<ProjectStats projects={projects} />} />
        </Routes>
        <AddProjectModal
          isOpen={isAddProjectModalOpen}
          onClose={handleCloseAddProjectModal}
          onSave={handleSaveProject}
        />
      </div>
    </div>
  );
}

export default App;

function Sidebar() {
  return (
    <div className="w-[5rem] h-full bg-[#171717] flex flex-col justify-even items-center p-2 border-gray-800 border-r">
      <img src="./../logo.png" className="w-[3rem] h-[3rem] mb-[5rem]" />
      <div className="flex flex-col text-white text-2xl space-y-9 justify-start items-center">
        <Link to="/app">
          <FontAwesomeIcon icon={faChartPie} className="text-green-500" />
        </Link>
        <Link to="/app/projects">
          <FontAwesomeIcon icon={faSheetPlastic} />
        </Link>
        <FontAwesomeIcon icon={faLightbulb} />
        <FontAwesomeIcon icon={faGear} />
      </div>
    </div>
  );
}

function Header({ onAddProject }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex text-white items-center justify-between bg-[#171717] px-4 py-6">
      <div className="flex items-center space-x-2">
        <img src="./../useravatar.png" className="w-[2rem] h-[2rem]" />
        <h2 className="headerText font-nunito text-[1.4rem]">
          Welcome Back, Awin
        </h2>
      </div>
      <div className="flex space-x-3">
        <input
          type="text"
          placeholder="Search"
          className="rounded-lg w-[25rem] p-2 bg-gray-700 text-white"
        />
        <select className="bg-gray-700 text-white p-2 rounded-lg">
          <option value="projects">Projects</option>
          <option value="ideas">Ideas</option>
        </select>
      </div>
      <div className="flex items-center">
        <button className="px-3 py-1 text-white font-nunito border rounded-lg mr-5 flex items-center justify-center" onClick={onAddProject}>
          Add Project <FontAwesomeIcon icon={faPlus} />
        </button>
        <FontAwesomeIcon icon={faRightFromBracket} className="text-[1.5rem]" onClick={handleLogout} />
      </div>
    </div>
  );
}
