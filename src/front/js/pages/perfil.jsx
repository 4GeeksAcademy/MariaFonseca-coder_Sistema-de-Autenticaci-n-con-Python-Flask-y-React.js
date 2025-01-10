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
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                <div className="text-center">
                    <div className="spinner-border text-warning" role="status" style={{ width: "3rem", height: "3rem" }}>
                    </div>
                    <p className="mt-3">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className="p-4 border rounded shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
                <h2 className="text-center mb-4 lobster-regular">Profile</h2>
                <div className="card">
                    <div className="card-body eb-garamond">
                        <h5 className="card-title text-center lobster-regular">User Information</h5>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Last Name:</strong> {profile.last_name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone Number:</strong> {profile.phone_number}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};