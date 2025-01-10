import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Perfil = () => {
    const { actions } = useContext(Context);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await actions.getProfile();
            setProfile(data);
        };

        fetchProfile();
    }, [actions]);

    if (!profile) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className="p-4 border rounded shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
                <h2 className="text-center mb-4 lobster-regular">Perfil</h2>
                <div className="card">
                    <div className="card-body eb-garamond">
                        <h5 className="card-title text-center lobster-regular">Información del Usuario</h5>
                        <p><strong>Nombre:</strong> {profile.name}</p>
                        <p><strong>Apellido:</strong> {profile.last_name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Teléfono:</strong> {profile.phone_number}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};