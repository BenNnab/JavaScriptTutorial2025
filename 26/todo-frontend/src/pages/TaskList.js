import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Logout from "../pages/Logout"; // Corrected path for Logout

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const token = localStorage.getItem("token");

    // Wrap fetchTasks with useCallback
    const fetchTasks = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/tasks", {
                headers: { Authorization: token },
            });
            setTasks(res.data);
        } catch (err) {
            alert("Error fetching tasks");
        }
    }, [token]); // Ensures fetchTasks doesn't change on every render

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]); // Only call fetchTasks when it changes

    const createTask = async () => {
        if (!newTask.trim()) return alert("Task cannot be empty!");
        
        try {
            await axios.post("http://localhost:5000/api/tasks", 
                { title: newTask, status: "Pending" }, // Default status
                { headers: { Authorization: token } }
            );
            setNewTask("");
            fetchTasks();
        } catch (err) {
            alert("Error creating task");
        }
    };

    const updateTask = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, 
                { status }, 
                { headers: { Authorization: token } }
            );
            fetchTasks();
        } catch (err) {
            alert("Error updating task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: token },
            });
            fetchTasks();
        } catch (err) {
            alert("Error deleting task");
        }
    };

    return (
        <div>
            <h2>My Tasks</h2>
            <Logout /> {/* Logout Button */}
            
            {/* Task Input */}
            <input 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                placeholder="New Task" 
            />
            <button onClick={createTask}>Add Task</button>

            {/* Task List */}
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - <strong>{task.status}</strong>
                        <button onClick={() => updateTask(task._id, "Pending")}>Pending</button>
                        <button onClick={() => updateTask(task._id, "Ongoing")}>Ongoing</button>
                        <button onClick={() => updateTask(task._id, "Done")}>Done</button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
