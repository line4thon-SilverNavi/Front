import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    return <Navigate to="/intro" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
