import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AbacRegisterUser() {
    

    const navigate = useNavigate();
    
    const RegistrationState = Object.freeze({
        INIT: 0,
        PROCESSING: 1,
        SUCCESS: 2,
        FAILED: 3,
    })

    const UserRoleValues = Object.freeze({
        MANAGER: 'manager',
        DEV: 'dev',
        TEST: 'test',
        INTERN: 'intern',
    })

    const UserDeptValues = Object.freeze({
        HR: 'hr',
        ADMIN: 'admin',
        FINANCE: 'finance',
    })
        
    const defaultUser = {
            username: "",
            password: "",
            name: "",
            role: UserRoleValues.INTERN,
            department: UserDeptValues.HR,
        }
    
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
            'flex-direction': 'column',
            'justify-content': 'center',
            'gap': '10px',
            'align-items': 'center',
        },
        roleTitle: {
            'fontSize': '1.3rem',
            'fontWeight': '600',
        },
        roleDiv: {
            'display': 'flex',
            'gap': '15px',
            'justify-content': 'flex-end',
        },
    }
    const [user, setUser] = useState(defaultUser);
    const [state, setState] = useState(RegistrationState.INIT);
    
    function handleInput(event) {
        const updatedUser = {...user}
        switch(event.target.id) {
            case 'name-input':
                updatedUser.name = event.target.value
                break;
            case 'username-input':
                updatedUser.username = event.target.value
                break;
            case 'password-input':
                updatedUser.password = event.target.value.trim()
                break;
            case 'role-manager':
            case 'role-dev':
            case 'role-test':
            case 'role-intern':
                updatedUser.role = event.target.value;
                break;
            case 'dept-hr':
            case 'dept-admin':
            case 'dept-finance':
                updatedUser.department = event.target.value;
        }
        setUser(updatedUser);
    }
    
    async function handleFormSubmit() {
        if(!user.name.trim() || !user.username.trim() || !user.password.trim()) {
            alert("Please fill all the details!!!")
            return;
        }
        // alert(`name: ${user.name}, email: ${user.email}, password: ${user.password}, role: ${user.role}`);
        const requestOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }
        try {
            // console.log(requestOpt)
            setState(RegistrationState.PROCESSING);
            const response = await fetch(
                "http://localhost:3004/api/auth/register",
                requestOpt
            )
            if(!response.ok) {
                throw new Error(
                    'HTTP error status: ' + response.status
                )
            }
            setState(RegistrationState.SUCCESS);
            const responseData = await response.json();

            console.log(responseData);
            // TODO: Show message on UI

        } catch(error){
            console.error("Error while creating user");
            console.error(error);
            setState(RegistrationState.FAILED);
        }
        // alert(`name: ${user.name}, email: ${user.email}, password: ${user.password}, role: ${user.role}`);
        resetForm();
    }
    
    function resetForm() {
        setUser(defaultUser);
    }
    
    const UI_LIST = [
        <section>
            <h3>Register New User</h3>
            <form style={style.formArea}>
                <div style={style.formitem} className="form-item">
                    <label htmlFor="name-input">Name:</label>
                    <input
                    type='text'
                    id="name-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={user.name}
                    onChange={handleInput}
                    />
                </div>
                <div style={style.formitem} className="form-item">
                    <label htmlFor="username-input">Username:</label>
                    <input
                    type='text'
                    id="username-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={user.username}
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
                    value={user.password}
                    onChange={handleInput}
                    />
                </div>
                <p style={style.roleTitle}>Role:</p>
                <div id="role-div" style={style.roleDiv}>
                    <div>
                        <input 
                        type="radio" 
                        id="role-manager" 
                        name="role_field"
                        value={UserRoleValues.MANAGER}
                        checked={user.role==UserRoleValues.MANAGER}
                        onChange={handleInput}
                        />
                        <label htmlFor="role-manager"> Manager</label>
                    </div>
                    <div>
                        <input 
                        type="radio" 
                        id="role-dev" 
                        name="role_field"
                        value={UserRoleValues.DEV}
                        checked={user.role==UserRoleValues.DEV}
                        onChange={handleInput}
                        />
                        <label htmlFor="role-manager"> Developer</label>
                    </div>
                    <div>
                        <input 
                        type="radio" 
                        id="role-test" 
                        name="role_field"
                        value={UserRoleValues.TEST}
                        checked={user.role==UserRoleValues.TEST}
                        onChange={handleInput}
                        />
                        <label htmlFor="role-manager"> QA</label>
                    </div>
                    <div>
                        <input 
                        type="radio" 
                        id="role-intern" 
                        name="role-test"
                        value={UserRoleValues.INTERN}
                        checked={user.role==UserRoleValues.INTERN}
                        onChange={handleInput}
                        />
                        <label htmlFor="role-manager"> Intern</label>
                    </div>
                </div>

                <p style={style.roleTitle}>Department:</p>
                <div id="role-div" style={style.roleDiv}>
                    <div>
                        <input 
                        type="radio" 
                        id="dept-hr" 
                        name="dept"
                        value={UserDeptValues.HR}
                        checked={user.department==UserDeptValues.HR}
                        onChange={handleInput}
                        />
                        <label htmlFor="role-manager"> HR</label>
                    </div>
                    <div>
                        <input 
                        type="radio" 
                        id="dept-admin" 
                        name="dept"
                        value={UserDeptValues.ADMIN}
                        checked={user.department==UserDeptValues.ADMIN}
                        onChange={handleInput}
                        />
                        <label htmlFor="role-manager"> Admin</label>
                    </div>
                    <div>
                        <input 
                        type="radio" 
                        id="dept-finance" 
                        name="dept"
                        value={UserDeptValues.FINANCE}
                        checked={user.department==UserDeptValues.FINANCE}
                        onChange={handleInput}
                        />
                        <label htmlFor="role-manager"> Finance</label>
                    </div>
                </div>
                <div className="formitem form-btn-area">
                    <p style={{'align-self': 'flex-end'}} className="btn btn-secondary" onClick={() => navigate("/abac/login")}>Login</p>
                    <p style={{'align-self': 'flex-end'}} className="btn" onClick={handleFormSubmit}>Submit</p>
                </div>
            </form>
            
        </section>,
        <section>
            <p>Loading...</p>
        </section>,
        <section>
            <p>User Registered Successfully !!!</p>
            <p style={{'alignSelf': 'flex-end'}} className="btn btn-secondary" onClick={() => navigate("/abac/login")}>Login</p>
        </section>,
        <section>
            <p>Error while registering !!! Please try again</p>
            <p style={{'alignSelf': 'flex-end'}} className="btn btn-secondary" onClick={() => {setState(RegistrationState.INIT)}}>Retry</p>
        </section>

    ]
    return (
        UI_LIST[state]
    );
}

export default AbacRegisterUser;