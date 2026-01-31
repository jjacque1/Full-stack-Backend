import { useEffect, useState } from "react";
import { apiRequest } from "../util/api";

export default function ProjectsPanel() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <section>
      <h2>Projects</h2>

      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="New project name"
          value={newProjectName}
          onChange={(event) => setNewProjectName(event.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Create
        </button>
      </form>

      {isLoading && <p>Loading...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && !errorMessage && projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      {!isLoading && projects.length > 0 && (
        <ul>
          {projects.map((project) => (
            <li key={project._id || project.id}>
              {project.name || project.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
