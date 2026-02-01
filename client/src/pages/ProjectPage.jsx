import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../util/api";

export default function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectError, setProjectError] = useState("");

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");

  // --------------------
  // Fetch Project Details
  // --------------------
  useEffect(() => {
    async function fetchProject() {
      try {
        setProjectLoading(true);
        setProjectError("");

        const data = await apiRequest(`/api/projects/${projectId}`);
        setProject(data);
      } catch (error) {
        setProjectError(error.message || "Failed to load project.");
        setProject(null);
      } finally {
        setProjectLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  // --------------------
  // Fetch Tasks 
  // --------------------

  
  useEffect(() => {
    async function fetchTasks() {
      try {
        setTasksLoading(true);
        setTasksError("");

        const data = await apiRequest(`/api/projects/${projectId}/tasks`);
        setTasks(data);
      } catch (error) {
        setTasksError(error.message || "Failed to load tasks.");
        setTasks([]);
      } finally {
        setTasksLoading(false);
      }
    }

    fetchTasks();
  }, [projectId]);

  // --------------------
  // Create Task
  // --------------------
  const handleCreateTask = async (event) => {
    event.preventDefault();

    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) {
      setTasksError("Task title is required.");
      return;
    }

    try {
      setTasksError("");

      await apiRequest(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trimmedTitle,
          description: newTaskDescription,
          status: newTaskStatus,
        }),
      });

      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskStatus("To Do");

      // re-fetch tasks after create
      const data = await apiRequest(`/api/projects/${projectId}/tasks`);
      setTasks(data);
    } catch (error) {
      setTasksError(error.message || "Failed to create task.");
    }
  };

  return (
    <div className="wrapper">
      <button type="button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <h2>Project Details</h2>

      {projectLoading && <p>Loading project...</p>}
      {projectError && <p>{projectError}</p>}

      {!projectLoading && project && (
        <>
          <h3>{project.name}</h3>
          <p>{project.description || "No description yet."}</p>
        </>
      )}

      <hr />

      <h3>Tasks</h3>

      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task description (optional)"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />

        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

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
              <strong>{task.title}</strong> — {task.status}
              {task.description && <div>{task.description}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
