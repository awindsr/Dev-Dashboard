import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import ProjectModal from "./ProjectModal";

// const projects = [
//   {
//     title: "Website Redesign",
//     description:
//       "Redesigning the company website to improve user experience and modernize the design.",
//     projectComplete: false,
//     phases: [
//       { text: "Planning", isCompleted: true },
//       { text: "Design", isCompleted: true },
//       { text: "Development", isCompleted: false },
//       { text: "Testing", isCompleted: false },
//       { text: "Deployment", isCompleted: false },
//     ],
//   },
//   {
//     title: "Mobile App Development",
//     description:
//       "Creating a new mobile application for both iOS and Android platforms.",
//     projectComplete: false,
//     phases: [
//       { text: "Conceptualization", isCompleted: true },
//       { text: "UI/UX Design", isCompleted: true },
//       { text: "Frontend Development", isCompleted: false },
//       { text: "Backend Development", isCompleted: false },
//       { text: "Testing", isCompleted: false },
//       { text: "Deployment", isCompleted: false },
//     ],
//   },
//   {
//     title: "Product Launch",
//     description: "Preparing for the launch of a new product in the market.",
//     projectComplete: false,
//     phases: [
//       { text: "Market Research", isCompleted: true },
//       { text: "Product Development", isCompleted: true },
//       { text: "Marketing Strategy", isCompleted: false },
//       { text: "Pre-launch Testing", isCompleted: false },
//       { text: "Launch", isCompleted: false },
//     ],
//   },
//   {
//     title: "Software Upgrade",
//     description:
//       "Upgrading the existing software to the latest version with added features and security patches.",
//     projectComplete: false,
//     phases: [
//       { text: "Assessment", isCompleted: true },
//       { text: "Planning", isCompleted: true },
//       { text: "Development", isCompleted: true },
//       { text: "Testing", isCompleted: false },
//       { text: "Deployment", isCompleted: false },
//     ],
//   },
//   {
//     title: "Research Project",
//     description:
//       "Conducting research on a specific topic to gather insights and data.",
//     projectComplete: false,
//     phases: [
//       { text: "Literature Review", isCompleted: true },
//       { text: "Data Collection", isCompleted: true },
//       { text: "Analysis", isCompleted: true },
//       { text: "Report Writing", isCompleted: false },
//       { text: "Presentation", isCompleted: false },
//     ],
//   },
// ];



export default function Projects({projects}) {
  return (
    <div className="overflow-hidden h-auto">
      <div className="flex items-center justify-around space-x-3 p-4">
        <ProjectStatCardOne />
        <ProjectStatCardTwo />
        <ProjectStatCardThree />
      </div>
      <div className="p-4">
        <UserProjects projects={projects} />
      </div>
    </div>
  );
}

function ProjectStatCardOne() {
  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 w-full h-[12rem] rounded-lg p-4 flex justify-center flex-col items-center">
      <div className="flex space-x-2 items-center">
        <p className="text-white font-nunito text-[4rem] font-bold">35</p>
      </div>
      <p className="text-gray-200 font-nunito text-[1.5rem]">
        Total Projects Added
      </p>
    </div>
  );
}

function ProjectStatCardTwo() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-900 w-full  h-[12rem] rounded-lg p-4 flex justify-center flex-col items-center">
      <div className="flex space-x-2 items-center">
        <p className="text-white font-nunito text-[4rem] font-bold">15</p>
      </div>
      <p className="text-gray-200 font-nunito text-[1.5rem]">
        Completed Projects
      </p>
    </div>
  );
}

function ProjectStatCardThree() {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 w-full  h-[12rem] rounded-lg p-4 flex justify-center flex-col items-center">
      <div className="flex space-x-2 items-center">
        <p className="text-white font-nunito text-[4rem] font-bold">10</p>
      </div>
      <p className="text-gray-200 font-nunito text-[1.5rem]">
        Ongoing Projects
      </p>
    </div>
  );
}

const UserProjects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsList, setProjectsList] = useState(projects);

  useEffect(() => {
    setProjectsList(projects);
  }, [projects]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleMarkAsComplete = (index) => {
    const updatedProjects = [...projectsList];
    updatedProjects[index].projectComplete = true;
    setProjectsList(updatedProjects);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projectsList];
    updatedProjects.splice(index, 1);
    setProjectsList(updatedProjects);
  };

  useEffect(() => {
    console.log(projectsList);
  }, [projectsList]);

  return (
    <>
      {projectsList.length === 0 ? (
        <p className="text-white text-center">No projects available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projectsList.map((project, index) =>
            !project.projectComplete ? (
              <div
                key={index}
                className="bg-gradient-to-tr from-neutral-900 to-gray-700 rounded-lg p-4 shadow-md h-[15rem] flex flex-col justify-between"
              >
                <h3
                  className="text-[#f9e733] font-nunito text-[1.7rem] font-bold mb-2 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.title}
                </h3>
                <p className="text-gray-200">
                  {project.description.length > 110
                    ? `${project.description.slice(0, 110)}...`
                    : project.description}
                </p>
                {project.description.length > 110 && (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleProjectClick(project)}
                  >
                    Read more
                  </button>
                )}
                <div className="flex w-full justify-between">
                  <MarkAsComplete
                    onMarkAsComplete={() => handleMarkAsComplete(index)}
                  />
                  <DeleteProject
                    onDeleteProject={() => handleDeleteProject(index)}
                  />
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-lg p-4 shadow-md flex flex-col justify-between border border-white"
              >
                <h3
                  className="text-white font-nunito text-[1.9rem] font-bold mb-2 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.title}
                </h3>
                <p className="text-gray-200">
                  {project.description.length > 110
                    ? `${project.description.slice(0, 110)}...`
                    : project.description}
                </p>
                {project.description.length > 110 && (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleProjectClick(project)}
                  >
                    Read more
                  </button>
                )}
                <div className="flex justify-around items-center">
                  <DeleteProject
                    onDeleteProject={() => handleDeleteProject(index)}
                  />
                </div>
              </div>
            )
          )}
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={handleCloseModal} />
          )}
        </div>
      )}
    </>
  );
};

function MarkAsComplete({ onMarkAsComplete }) {
  return (
    <button
      className="border border-green-500 text-white p-2 rounded-lg hover:bg-green-500 hover:text-black mr-2 transition duration-300 ease-in-out"
      onClick={onMarkAsComplete}
    >
      Mark as Complete
    </button>
  );
}

function DeleteProject({ onDeleteProject }) {
  return (
    <button
      className="border border-red-500 text-white p-2 rounded-lg hover:bg-red-500 hover:text-black transition duration-300 ease-in-out"
      onClick={onDeleteProject}
    >
      Delete Project
    </button>
  );
}
