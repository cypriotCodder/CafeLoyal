import { QrCode, ClipboardList } from 'lucide-react';

function WorkerDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Worker Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-orange-100 p-4 rounded-full text-orange-600 mb-4">
                            <QrCode size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Scan Loyalty Card</h3>
                        <p className="text-gray-500">Scan customer QR code to add points or redeem rewards.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
                            <ClipboardList size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Active Orders</h3>
                        <p className="text-gray-500">View and manage current orders in the queue.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkerDashboard;
