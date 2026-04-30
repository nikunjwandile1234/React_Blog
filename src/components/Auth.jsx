import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector(
    (state) => state.authreducer.status
  );

 useEffect(() => {
  if (authStatus === null) return;

  if (authentication && !authStatus) {
    navigate("/login");
  } else if (!authentication && authStatus) {
    navigate("/");
  } else {
    setLoading(false);
  }
}, [authStatus, authentication, navigate]);

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return <>{children}</>;
}

export default AuthLayout;