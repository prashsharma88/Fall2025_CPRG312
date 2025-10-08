import { Outlet } from "react-router-dom";



function Abac() {
    return (
        <main>
            <h1>Attribute Based Access Control Demo</h1>
            <Outlet />
        </main>
    );
}

export default Abac;