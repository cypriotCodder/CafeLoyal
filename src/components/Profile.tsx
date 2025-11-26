import type { User } from '../types';

interface ProfileProps {
    user: User;
    onLogout: () => void;
}

function Profile({ user, onLogout }: ProfileProps) {
    return (
        <div className="container mx-auto p-4 pb-24">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full capitalize">
                            {user.role}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-medium">Nov 2025</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Total Points Earned</span>
                        <span className="font-medium">{user.points}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onLogout}
                className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-bold hover:bg-red-100 transition-colors border border-red-100"
            >
                Log Out
            </button>
        </div>
    );
}

export default Profile;
