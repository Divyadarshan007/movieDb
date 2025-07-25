const Login = () => {
    return (
        <section className="h-screen">
            <div className="back-image"></div>
            <div className="flex justify-center items-center h-full">
                <form name="pms_login" id="pms_login" action="#" method="post">
                    <h4>Sign In</h4>
                    <p className="login-username flex flex-col">
                        <label htmlFor="user_login">Email Address</label>
                        <input type="text" name="log" id="user_login" className="input" size={20} />
                    </p>
                    <p className="login-password">
                        <label htmlFor="user_pass">Password</label>
                        <input type="password" name="pwd" id="user_pass" className="input" size={20} />
                    </p>

                    <p className="login-submit">
                        <input type="submit" name="wp-submit" id="wp-submit" className="button button-primary" defaultValue="Log In" />
                        <input type="hidden" name="redirect_to" />
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login