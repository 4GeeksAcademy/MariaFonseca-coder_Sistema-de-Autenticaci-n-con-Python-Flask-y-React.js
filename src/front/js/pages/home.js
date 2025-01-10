import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="position-fixed top-50 start-50 translate-middle text-center">
			<h1 className="eb-garamond">Welcome to the Authentication System</h1>
		</div>
	);
};