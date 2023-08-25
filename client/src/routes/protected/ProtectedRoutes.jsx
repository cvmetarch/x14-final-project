import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ isAuthenticated, redirectPath, children }) {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} />
    }

    return children ? children : <Outlet />;
}