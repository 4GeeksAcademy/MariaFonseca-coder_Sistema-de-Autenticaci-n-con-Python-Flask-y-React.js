import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de importar el contexto

export const SignUp = () => {
    const { actions } = useContext(Context); // Obtener acciones del contexto
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [toastMessage, setToastMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llamada a la acción de registro del Flux Store
        const message = await actions.signUp(name, lastName, email, phoneNumber, password);

        if (message === "Usuario registrado correctamente") {
            setToastMessage({ text: "Usuario registrado correctamente.", type: "success" });
        } else if (message === "Este correo ya está registrado. Por favor, usa otro email.") {
            setToastMessage({ text: message, type: "danger" });
        } else {
            setToastMessage({ text: message, type: "danger" });
        }

        // Oculta el toast después de 3 segundos
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>

            {toastMessage && (
                <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div
                        className={`toast show align-items-center text-bg-${toastMessage.type} border-0`}
                        role="alert"
                    >
                        <div className="d-flex">
                            <div className="toast-body">
                                {toastMessage.text}
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setToastMessage(null)}
                            ></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};