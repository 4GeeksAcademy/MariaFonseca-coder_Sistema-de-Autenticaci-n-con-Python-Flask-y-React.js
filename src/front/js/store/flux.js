const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// },
			login: async (email, password) => {
				console.log(email, password); //Muestra credenciales en consola, por si necesitamos revisar si llegan.

				try {
					// Realiza la solicitud al backend.
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,         // Envía el correo
							password: password
						})
					});

					// Si la respuesta no es exitosa lanza error.
					if (!response.ok) {
						throw new Error("Failed to login");
					}

					// Convierte respuesta en JSON (para obtener el token).
					const data = await response.json();

					// Guarda el token en localStorage.
					localStorage.setItem("accessToken", data.access_token);
					console.log("User logged in successfully:", data);

					// Devuelve true porque todo salió bien.
					return true;

				} catch (error) {
					// Si ocurre algún error, muestra el error en la consola.
					console.error("Error logging in:", error);

					// Devuelve false porque el inicio de sesión falló.
					return false;
				}
			},

			getProfile: async () => {
				const token = localStorage.getItem("accessToken"); // Obtener el token de acceso guardado en localStorage
				if (!token) {
					console.error("No hay token almacenado");
					return null;
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/perfil", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`, // Pasar el token en el header
						},
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log("Perfil obtenido exitosamente", data);
						return data;// Indicar que todo salió bien
					} else {
						console.error("Error al obtener el perfil:", resp.statusText);
						return null; // Retornar null si hay un error con la respuesta
					}
				} catch (error) {
					console.error("Error en la solicitud del perfil:", error);
					return null; // Retornar null en caso de error
				}
			},

			signUp: async (name, last_name, email, phone_number, password) => {
				console.log(name, last_name, email, phone_number, password);

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							name: name,
							last_name: last_name,
							email: email,
							phone_number: phone_number,
							password: password
						})
					});

					if (!response.ok) {
						const errorData = await response.json();
						if (errorData.msg === "Este correo ya está registrado. Por favor, usa otro email.") {
							return "Este correo ya está registrado. Por favor, usa otro email.";
						}
						alert(errorData.msg); // Otro tipo de error
						throw new Error(errorData.msg);
					}

					const data = await response.json();
					console.log("User registered successfully:", data);

					return "Usuario registrado correctamente";  // El mensaje de éxito
				} catch (error) {
					console.error("Error registering:", error);
					return error.message || "Error al registrar el usuario.";
				}
			}


		}
	};
};

export default getState;
