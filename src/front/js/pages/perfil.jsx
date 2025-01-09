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
        <div className="container">
            <h1>Perfil</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Información del Usuario</h5>
                    <p><strong>Nombre:</strong> {profile.name}</p>
                    <p><strong>Apellido:</strong> {profile.last_name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Teléfono:</strong> {profile.phone_number}</p>
                </div>
            </div>
        </div>
    );
};
