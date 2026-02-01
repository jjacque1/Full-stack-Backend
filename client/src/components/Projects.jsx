import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../util/api";
import "./Projects.css";

export default function ProjectsPanel() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedProject, setSelectedProject] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // --------------------
  // Fetch Projects
  // --------------------
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await apiRequest("/api/projects");
      setProjects(data);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --------------------
  // Create Project
  // --------------------
  const handleCreateProject = async (event) => {
    event.preventDefault();

    const trimmedName = newProjectName.trim();
    if (!trimmedName) {
      setErrorMessage("Project name is required.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      await apiRequest("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      });

      setNewProjectName("");
      fetchProjects();
    } catch (error) {
      setErrorMessage(error.message || "Failed to create project.");
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------
  // Fetch Tasks (when project changes)
  // --------------------
  useEffect(() => {
    if (!selectedProject) {
      setTasks([]);
      return;
    }

    async function fetchTasks() {
      try {
        setTasks([]);
        setTasksLoading(true);
        setTasksError("");

        const data = await apiRequest(
          `/api/projects/${selectedProject._id}/tasks`,
        );

        setTasks(data);
      } catch (error) {
        setTasksError(error.message || "Failed to load tasks.");
        setTasks([]);
      } finally {
        setTasksLoading(false);
      }
    }

    fetchTasks();
  }, [selectedProject]);

  // --------------------
  // Create Task
  // --------------------
  const handleCreateTask = async (event) => {
    event.preventDefault();

    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle || !selectedProject) return;

    try {
      await apiRequest(`/api/projects/${selectedProject._id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle }),
      });

      setNewTaskTitle("");

      const data = await apiRequest(
        `/api/projects/${selectedProject._id}/tasks`,
      );
      setTasks(data);
    } catch (error) {
      setTasksError(error.message || "Failed to create task.");
    }
  };

  // --------------------
  // Render
  // --------------------
  return (
    <section>
      <h2>Projects</h2>
      {!isLoading && !errorMessage && projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="New project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Create
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && projects.length > 0 && (
        <>
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <div className="project-row">
                  <button
                    type="button"
                    className="project-select"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.name}
                  </button>

                  <button
                    type="button"
                    className="project-view"
                    onClick={() => navigate(`/projects/${project._id}`)}
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {selectedProject ? (
            <div>
              <p>Project Name: {selectedProject.name}</p>
              <p>
                Description:{" "}
                {selectedProject.description || "No description yet."}
              </p>
            </div>
          ) : (
            <p>Select a project to see details.</p>
          )}
        </>
      )}

      {selectedProject && (
        <>
          <h3>Tasks</h3>

          <form onSubmit={handleCreateTask}>
            <input
              type="text"
              placeholder="New task"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button type="submit">Add Task</button>
          </form>

          {tasksLoading && <p>Loading tasks...</p>}
          {tasksError && <p>{tasksError}</p>}

          {!tasksLoading && !tasksError && tasks.length === 0 && (
            <p>No tasks yet.</p>
          )}

          {!tasksLoading && tasks.length > 0 && (
            <ul>
              {tasks.map((task) => (
                <li key={task._id}>
                  {task.title} {task.status === "Done" ? "(done)" : ""}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
