// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import PageLoading from './UI/PageLoading/PageLoading';

export default function ProtectedRoute() {
    const { data: user, isLoading, isError } = useMe();

    if (isLoading) return <PageLoading />

    if (isError || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
