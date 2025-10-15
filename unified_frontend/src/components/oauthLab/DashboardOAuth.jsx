import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const DashboardOAuth = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const usr = params.get('user');
        const email = params.get('email');
        console.log(`${usr}: ${email}`);
        if(token) {
            setAuth({
                username: usr, 
                auth_token: token,
                email: email
            });
            setUser({name: usr, email: email});
        }
        navigate("/oauth_lab/dashboard", {replace: true});
    }, []);
    return (
        <section>
            <h3>Dashboard</h3>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
        </section>
    );
};

export default DashboardOAuth;