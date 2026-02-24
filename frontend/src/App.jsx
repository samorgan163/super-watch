import { Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard/Dashboard';
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout/AppLayout";
import UserProfile from "./pages/UserProfile/UserProfile";
import Search from "./pages/Search/Search";
import Watchlist from "./pages/Watchlist/Watchlist";
import Film from "./pages/Film/Film";

export default function App() {
	return (
        <Routes>
            <Route path="/login" element={<Login /> } />
            <Route path="/" element={<ProtectedRoute><AppLayout title='Dashboard'><Dashboard /></AppLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><AppLayout><UserProfile /></AppLayout></ProtectedRoute>} />
            <Route path="/film/:tmdbID" element={<ProtectedRoute><AppLayout fullHeight><Film /></AppLayout></ProtectedRoute>} />
            <Route path='/search' element={<ProtectedRoute><AppLayout><Search /></AppLayout></ProtectedRoute>} />
            <Route path='/watchlist' element={<ProtectedRoute><AppLayout title='Watchlist'><Watchlist /></AppLayout></ProtectedRoute>} />
            <Route path='/test' element={<Film />} />
        </Routes>
	)
}
