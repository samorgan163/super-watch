// ProtectedRoute.js
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;

    if (!user) return navigate('/login');

    return children;
}
