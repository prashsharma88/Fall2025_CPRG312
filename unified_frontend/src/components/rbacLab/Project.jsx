import { useState } from "react";
import useAuth from "../../hook/useAuth";

function Project() {

    const { auth } = useAuth();
    const style = {
        'btn-area': {
            'display': 'flex',
            'gap': '20px',
            'justify-content': 'center',
            'align-items': 'center',
            'margin': '30px auto',
        }
    }

    const [serverResponse, setServerResponse] = useState(null);

    async function handleBtnClick(event) {
        let reqURL = "http://localhost:3003/project";
        let reqMethod = "GET";
        switch(event.target.id) {
            case 'view-project':
                console.log("view-project")
                reqURL = reqURL+'/demo-project'
                break;
            case 'create-project':
                console.log("create-project")
                reqMethod = 'POST';
                break;
            case 'new-issue':
                console.log("new-issue")
                reqURL = reqURL+'/issue'
                reqMethod = 'POST'
                break;
        }

        try {
            const response = await fetch(reqURL, {
                method: reqMethod,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.auth_token}`
                }
            })
            if(!response.ok) {
                console.error(response);
                throw new Error("Error response from server");
            }
            const responseData = await response.json();
            console.log(responseData);
            setServerResponse(responseData);
        } catch(err) {
            console.error("ERROR : PROJECT REQUEST")
            console.error(err);
        }
    }
    return (
        <main>
            <h3>Project Options</h3>
            <section id="btn-area" style={style["btn-area"]}>
                <p id="view-project" className="btn" onClick={handleBtnClick}>View Project</p>
                <p id="create-project" className="btn" onClick={handleBtnClick}>Create Project</p>
                <p id="new-issue" className="btn" onClick={handleBtnClick}>New Issue</p>
            </section>
            <section>
                
                <p>Status: {serverResponse?.status}</p>
                <p>Message: {serverResponse?.messages}</p>
                <p>Issue ID: {serverResponse?.issue.id}</p>
                <p>Issues Status: {serverResponse?.issue.status}</p>
                <p>Issues Title: {serverResponse?.issue.title}</p>
                
            </section>
        </main>
    );
}

export default Project;