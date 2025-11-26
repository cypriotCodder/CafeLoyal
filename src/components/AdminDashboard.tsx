import { Users, Coffee, TrendingUp } from 'lucide-react';

function AdminDashboard() {
    return (
        <div className="container mx-auto p-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold">1,234</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <Coffee size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Orders Today</p>
                            <h3 className="text-2xl font-bold">85</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue Today</p>
                            <h3 className="text-2xl font-bold">$425.50</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <p className="text-gray-500">No recent activity to show.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
