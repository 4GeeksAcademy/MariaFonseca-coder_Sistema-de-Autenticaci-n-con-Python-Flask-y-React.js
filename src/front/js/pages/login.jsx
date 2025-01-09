import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        "email": "",
        "password": ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData, [name]: value
        }))
    }

    // const handleLogin = (e) => {
    //     e.preventDefault()
    //     actions.login(data.email, data.password)
    // }

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await actions.login(data.email, data.password);
        if (success) {
            window.location.href = "/perfil"; //Redirige al perfil
        } else {
            alert("Login failed. Check your email or password.");
        }
    };


    return (
        <div className="container">
            <form onSubmit={handleLogin}>

                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3" name="email" value={data.email} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3" name="password" value={data.password} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};