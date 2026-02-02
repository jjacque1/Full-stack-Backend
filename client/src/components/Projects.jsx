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

  // Edit fields for selected project
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");


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
      await fetchProjects();
    } catch (error) {
      setErrorMessage(error.message || "Failed to create project.");
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------
  // When selecting a project, preload edit fields
  // --------------------
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setEditProjectName(project.name || "");
    setEditProjectDescription(project.description || "");

  };


  // --------------------
  // Update Project (Owner only)
  // --------------------
 const handleUpdateProject = async (event) => {
  event.preventDefault();

  if (!selectedProject) return;

  const trimmedName = editProjectName.trim(); 
  if (!trimmedName) {
    setErrorMessage("Project name is required.");
    return;
  }

  try {
    setIsLoading(true);
    setErrorMessage("");

    const updated = await apiRequest(`/api/projects/${selectedProject._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        description: editProjectDescription,
      }),
    });

    setSelectedProject(updated);
    setEditProjectName(updated.name || "");
    setEditProjectDescription(updated.description || "");

    await fetchProjects();
  } catch (error) {
    setErrorMessage(error.message || "Failed to update project.");
  } finally {
    setIsLoading(false);
  }
};

  // --------------------
  // Delete Project (Owner only)
  // --------------------
  const handleDeleteProject = async () => {
    if (!selectedProject) return;

    const confirmDelete = window.confirm(
      `Delete project "${selectedProject.name}"? This cannot be undone.`,
    );
    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      await apiRequest(`/api/projects/${selectedProject._id}`, {
        method: "DELETE",
      });

      setSelectedProject(null);
      setEditProjectName("");
      setEditProjectDescription("");

      await fetchProjects();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete project.");
    } finally {
      setIsLoading(false);
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
                    onClick={() => handleSelectProject(project)}
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
            <div className="project-details">
              

              <form onSubmit={handleUpdateProject} className="project-edit-form">
                <input
                  type="text"
                  placeholder="Project name"
                  value={editProjectName}
                  onChange={(e) => setEditProjectName(e.target.value)}
                  disabled={isLoading}
                />

                <input
                  type="text"
                  placeholder="Project description"
                  value={editProjectDescription}
                  onChange={(e) => setEditProjectDescription(e.target.value)}
                  disabled={isLoading}
                />

                <div className="project-edit-actions">
                  <button type="submit" disabled={isLoading}>
                    Save
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={handleDeleteProject}
                    disabled={isLoading}
                  >
                    Delete Project
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p>Select a project to see details.</p>
          )}
        </>
      )}
    </section>
  );
}
