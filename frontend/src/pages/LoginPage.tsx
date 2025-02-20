import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import './css/loginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login, user} = useLogin();
    const navigate = useNavigate();

    // kollar om man är inloggad (user finns)
    useEffect(() =>{
        if (user) {
            navigate("/admin");
        }
    }, [user])

    // anropar login från LoginContext
    const loginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            await login({username, password});
            navigate("/admin")
        } catch (error) {
            setUsername('');
            setPassword('');
            setError("Inloggning misslyckades. Kontrollera Användarnamn och Lösenord")
        }
    }

    return (
        <div>
            <h1>Logga in</h1>
            <form onSubmit={loginFormSubmit}>
                {
                    error && (
                        <div className="error-div">
                            <p>{error}</p>
                        </div>
                    )
                }

                <div>
                    <label htmlFor="username">Användarnamn</label>
                    <input type="text" id="username" required autoComplete="off" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div>
                    <label htmlFor="password">Lösenord</label>
                    <input type="password" id="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <input type="submit" value="Logga in" />

            </form>
        </div>
    )
}

export default LoginPage