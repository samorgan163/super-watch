import { Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard/Dashboard';
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./AppLayout";
import UserProfile from "./pages/UserProfile/UserProfile";
import Film from "./pages/Film/Film";
import Search from "./pages/Search/Search";
import Watchlist from "./pages/Watchlist/Watchlist";
import PageLoading from "./components/PageLoading/PageLoading";
import Navbar from "./components/Navbar/Navbar";
import Film2 from "./pages/Film2/Film2";

export default function App() {
	return (
        <Routes>
            <Route path="/login" element={<Login /> } />
            <Route path="/" element={<ProtectedRoute><AppLayout title='Dashboard'><Dashboard /></AppLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><AppLayout><UserProfile /></AppLayout></ProtectedRoute>} />
            <Route path="/film/:tmdbId" element={<ProtectedRoute><AppLayout><Film2 /></AppLayout></ProtectedRoute>} />
            <Route path='/search' element={<ProtectedRoute><AppLayout><Search /></AppLayout></ProtectedRoute>} />
            <Route path='/watchlist' element={<ProtectedRoute><AppLayout title='Watchlist'><Watchlist /></AppLayout></ProtectedRoute>} />
            <Route path='/test' element={<Film2 />} />
        </Routes>
	)
}
