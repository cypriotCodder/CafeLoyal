import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Award } from 'lucide-react';
import Menu from "./Menu";
import Rewards from "./Rewards";
import About from "./About";
import AdminDashboard from "./AdminDashboard";
import WorkerDashboard from "./WorkerDashboard";
import BottomNav from "./BottomNav";
import Profile from "./Profile";

import type { User } from "../types";

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

function Dashboard({ user, onLogout }: DashboardProps) {
    if (user.role === 'admin') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-black text-white p-4 flex justify-between items-center">
                    <h1 className="font-bold">Cafe Loyal Admin</h1>
                    <button onClick={onLogout} className="bg-red-600 px-4 py-1 rounded text-sm">Logout</button>
                </div>
                <AdminDashboard />
            </div>
        );
    }

    if (user.role === 'worker') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-black text-white p-4 flex justify-between items-center">
                    <h1 className="font-bold">Cafe Loyal Worker</h1>
                    <button onClick={onLogout} className="bg-red-600 px-4 py-1 rounded text-sm">Logout</button>
                </div>
                <WorkerDashboard />
            </div>
        );
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
                <Routes>
                    <Route path="/" element={
                        <div className="p-4">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Hello, {user.name.split(' ')[0]}!</h1>
                                    <p className="text-gray-500 text-sm">Ready for your coffee?</p>
                                </div>
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            {/* Points Card */}
                            <div className="bg-black text-white rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Loyalty Balance</p>
                                            <h2 className="text-5xl font-bold">{user.points}</h2>
                                        </div>
                                        <Award size={32} className="text-yellow-400" />
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm font-medium">Gold Member</p>
                                            <p className="text-xs text-gray-400">ID: {user.id.slice(0, 8)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Next Reward</p>
                                            <p className="font-bold">500 pts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions or Recent Activity could go here */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold mb-1">Order Now</h3>
                                    <p className="text-xs text-gray-500">Skip the line</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold mb-1">History</h3>
                                    <p className="text-xs text-gray-500">View past orders</p>
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/rewards" element={<Rewards user={user} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile user={user} onLogout={onLogout} />} />
                    <Route path="/scan" element={
                        <div className="flex flex-col items-center justify-center h-[80vh] p-4 text-center">
                            <div className="bg-gray-100 p-8 rounded-full mb-4">
                                <Award size={48} className="text-gray-400" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Scan to Earn</h2>
                            <p className="text-gray-500">Show this code to the barista to earn points.</p>
                        </div>
                    } />
                </Routes>
                <BottomNav />
            </div>
        </Router>
    );
}

export default Dashboard;