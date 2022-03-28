import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

import HomePage from "./screens/home";
import NavbarComponent from "./components/navbar";

function App() {
	return (
		<>
			<NavbarComponent />
			<HomePage/>
			<ToastContainer />
		</>
	);
}

export default App;
