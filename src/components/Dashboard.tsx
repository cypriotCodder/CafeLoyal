import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage";
import NavBar from "./NavBar";

import type { User } from "../types";

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

function Dashboard({ user, onLogout }: DashboardProps) {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage onLogin={() => { }} />} />
            </Routes>
            <NavBar></NavBar>
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-16 pb-20 md:pt-0 md:pb-0">
                <Routes>
                    <Route path="/" element={
                        <div className="flex items-center justify-center h-screen">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-blue-600 mb-4">Cafe Loyalty App</h1>
                                <p className="text-lg text-gray-600 mb-6">Welcome back, <span className="font-semibold text-gray-800">{user.name}</span>!</p>
                                <button
                                    onClick={onLogout}
                                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default Dashboard;