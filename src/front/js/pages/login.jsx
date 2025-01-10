import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { actions } = useContext(Context);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");  // Estado para mensaje de error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await actions.login(data.email, data.password);
        if (success) {
            window.location.href = "/perfil"; // Redirige al perfil
        } else {
            setErrorMessage("Login failed. Check your email or password.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className="p-4 border rounded shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
                <h2 className="text-center mb-4 lobster-regular">Login</h2>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleLogin} className="eb-garamond">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Email</span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="e.g. maicol@gmail.com"
                            required
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Password</span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="e.g. 1739caH9"
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-secondary">Login</button>
                        <Link to="/" className="btn btn-outline-secondary">Go Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};