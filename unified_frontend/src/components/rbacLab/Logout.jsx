import useAuth from "../../hook/useAuth"; 
import { useNavigate } from "react-router-dom";

function Logout() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    return (
        <p className="btn" onClick={() => {
            setAuth(null);
            navigate('/rbac/login')
        }}>Logout</p>
    );
}

export default Logout;