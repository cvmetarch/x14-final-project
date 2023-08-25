import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { protectedRoutes } from "./routes/protected/protected";
import ProtectedRoutes from "./routes/protected/ProtectedRoutes";
import Admin from "./page/admin";
import Home from "./page/home";
import useGlobalContext from "./context/useGlobalContext";

export default function App() {
    const { isAuthenticated } = useGlobalContext();

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />}>
                    {protectedRoutes.map(route => {
                        const Element = route.element;
                        return <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <ProtectedRoutes
                                    isAuthenticated={isAuthenticated}
                                    redirectPath="/admin"
                                >
                                    <Element />
                                </ProtectedRoutes>
                            }
                        />
                    })}
                </Route>
            </Routes>
            <ToastContainer autoClose={3000} />
        </div>
    );
}