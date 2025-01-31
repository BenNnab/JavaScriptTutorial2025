import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TaskList from "./pages/TaskList";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
