import { useState } from "react";
import useAuth from "../../hook/useAuth";
import Logout from "../Logout";

function Options() {

    const { auth } = useAuth();
    const style = {
        'btn-area': {
            'display': 'flex',
            'gap': '20px',
            'justify-content': 'center',
            'align-items': 'center',
            'margin': '30px auto',
        },
        'user-div': {
            'width': '50%',
            'border': '1px solid black',
            'border-radius': '10px',
            'padding': '30px',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'flex-start',

        },
        'details-section':{
            'display': 'flex',
            'justify-content': 'space-evenly',
            'gap': '10px'
        },
        'response-div' : {
            'width': '50%',
            'border': '1px solid black',
            'border-radius': '10px',
            'padding': '30px',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'flex-start',

        },
    }

    const [serverResponse, setServerResponse] = useState(null);

    async function handleBtnClick(event) {
        let reqURL = "http://localhost:3004/authorize";
        let reqMethod = "GET";
        switch(event.target.id) {
            case 'payrolls':
                console.log("payrolls")
                reqURL = reqURL+'/payrolls'
                break;
            case 'security':
                console.log("security")
                reqURL = reqURL+'/security'
                break;
            case 'onboarding':
                console.log("onboarding")
                reqURL = reqURL+'/onboard'
                break;
            case 'general':
                console.log("general")
                reqURL = reqURL+'/general'
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
                if(response.status == 401) {
                    setServerResponse("Current user is not authorized to perform this task");
                }
                throw new Error("Error response from server");
            }
            const responseData = await response.json();
            console.log(responseData);
            // setServerResponse(JSON.stringify(responseData));
            setServerResponse(responseData.message);
        } catch(err) {
            console.error("ERROR : Task Request")
            console.error(err);
        }
    }
    return (
        <main>
            <h3>Project Options</h3>
            <section id="btn-area" style={style["btn-area"]}>
                <p id="payrolls" className="btn" onClick={handleBtnClick}>Payrolls (Finance)</p>
                <p id="security" className="btn" onClick={handleBtnClick}>Security (Admin)</p>
                <p id="onboarding" className="btn" onClick={handleBtnClick}>Onboarding (HR)</p>
                <p id="general" className="btn" onClick={handleBtnClick}>General</p>
                <Logout />
            </section>

            <section style={style["details-section"]}>
                <div style={style["user-div"]}>
                    <h3>Current User: </h3>
                    <p>Name: {auth.name}</p>
                    <p>Role: {auth.role}</p> 
                    <p>Department: {auth.department}</p>   
                </div>
                <div id="response-div" style={style["response-div"]}>
                    <h3>Server Response</h3>
                    <p>{serverResponse}</p>
                </div>
                
            </section>
        </main>
    );
}

export default Options;