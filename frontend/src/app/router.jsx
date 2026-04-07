import { Routes, Route } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute';

import AppLayout from '../layouts/AppLayout/AppLayout';

import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserProfile from '../pages/UserProfile/UserProfile';
import Search from '../features/search/pages/Search';
import Watchlist from '../features/watchlist/pages/Watchlist/Watchlist';
import Film from '../pages/Film/Film';

export default function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login /> } />
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/watchlist' element={<Watchlist />} />
                </Route>
                <Route element={<AppLayout fullHeight />}>
                    <Route path='/film/:tmdbID' element={<Film />} />
                </Route>
            </Route>
        </Routes>
    );
}
