const LoginOAuth = () => {

    const handleSignInbtnClick = async () => {
        console.log("handle signin btn click");
        window.location.href = "http://localhost:3005/auth/google"
    }
    return (
        <section>
            <h3>Login with Google</h3>
            <div className="btn" onClick={handleSignInbtnClick}>
                <img src="/google.png" alt="google icon"/>
                <p>Signin with Google</p>
            </div>
        </section>
    );
};

export default LoginOAuth;