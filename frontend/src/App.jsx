import { Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./AppLayout";
import UserProfile from "./pages/UserProfile/UserProfile";

export default function App() {
	return (
        <Routes>
            <Route path="/login" element={<Login /> } />
            <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><AppLayout><UserProfile /></AppLayout></ProtectedRoute>} />
        </Routes>
	)
}
