import { Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./AppLayout";

export default function App() {
	return (
        <Routes>
            <Route path="/login" element={<Login /> } />
            <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
        </Routes>
	)
}
