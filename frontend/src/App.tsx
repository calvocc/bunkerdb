import React from "react";
import "./App.css";

import HomePage from "./screens/home";
import NavbarComponent from "./components/navbar";

function App() {
	return (
		<>
			<NavbarComponent />
			<HomePage/>
		</>
	);
}

export default App;
