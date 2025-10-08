import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth"; 

function AbacLogin() {

    const style = {
        formitem: {
            'display': 'flex',
            'justifyContent': 'flex-end',
            'gap': '50px',
            'width': '80%',
        },
        formArea: {
            'width': '500px',
            'display': 'flex',
            'flexDirection': 'column',
            'justifyContent': 'center',
            'gap': '10px',
            'alignItems': 'center',
        }
    }

    const navigate = useNavigate();

    const defaultCredentials = {
        username: "",
        password: "",
    }

    const { setAuth } = useAuth();

    const [credentials, setCredentials] = useState(defaultCredentials);
    const [loginError, setLoginError] = useState(false);
    const [loggedinUser, setLoggedInUser] = useState({
        status: false,
        name: "",
        username: "",
        role: "",
        department: "",
    });

    function handleInput(event) {
        const updatedCredentials = {...credentials}
        switch(event.target.id) {
            case 'username-input':
                updatedCredentials.username = event.target.value
                break;
            case 'password-input':
                updatedCredentials.password = event.target.value.trim()
                break;
        }
        setCredentials(updatedCredentials);
    }

    async function handleFormSubmit() {
        if(!credentials.username.trim() || !credentials.password.trim()) {
            alert("Please fill all the details!!!")
            return;
        }
        const requestOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        }
        try {
            console.log(requestOpt)
            const response = await fetch(
                "http://localhost:3004/api/auth/login",
                requestOpt
            )
            if(!response.ok) {
                throw new Error('HTTP error status: ' + response.status);
            }
            const data = await response.json();
    
            
            const {name, username,role, department} = data;
            const loginUser = {
                status: true,
                name: name,
                username: username,
                role: role,
                department: department,
            };
            setLoggedInUser(loginUser);
            setAuth({...loginUser, auth_token: data.auth_token})
            navigate('/abac/tasks');
        } catch(error){
            console.error("Error while creating user");
            console.error(error);
            setLoginError(true);
        }
        resetForm();
    }

    function resetForm() {
        setCredentials(defaultCredentials);
    }

    return (
        <section>
            <h3>Login</h3>
            <form style={style.formArea}>
                <div style={style.formitem} className="form-item">
                    <label htmlFor="username-input">Username:</label>
                    <input
                    type='text'
                    id="username-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={credentials.username}
                    onChange={handleInput}
                    />
                </div>
                <div style={style.formitem} className="form-item">
                    <label htmlFor="password-input">Password:</label>
                    <input
                    type='password'
                    id="password-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={credentials.password}
                    onChange={handleInput}
                    />
                </div>
                <div className="formitem form-btn-area">
                    <p style={{'alignSelf': 'flex-end'}} className="btn btn-secondary" onClick={() => navigate("/abac/register")}>Register</p>
                    <p style={{'alignSelf': 'flex-end'}} className="btn" onClick={handleFormSubmit}>Sign In</p>
                </div>
            </form>

            <div>
                {loginError && <p style={{'color':'red'}}>Invalid Username or Password</p>}
            </div>
            
            <div>
                {loggedinUser.status && <p>Login Successful: {loggedinUser.username}:{loggedinUser.role}: {loggedinUser.name}: {loggedinUser.department}</p>}
            </div>
        </section>
    )
}

export default AbacLogin;