import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
