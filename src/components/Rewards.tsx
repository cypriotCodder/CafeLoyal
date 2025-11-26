import { useEffect, useState } from 'react';
import { Gift, Award, Coffee } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface Reward {
    id: number;
    title: string;
    cost: number;
    icon: string;
}

interface RewardsProps {
    user: User;
}

const ICON_MAP: Record<string, any> = {
    'Coffee': Coffee,
    'Gift': Gift,
    'Award': Award
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Rewards({ user }: RewardsProps) {
    const [points, setPoints] = useState(user.points || 0);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const nextReward = 500;
    const progress = Math.min((points / nextReward) * 100, 100);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) return;

            // Fetch User Points (refresh to get latest)
            fetch(`${API_URL}/api/users/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.points !== undefined) {
                        setPoints(data.points);
                    }
                })
                .catch(err => console.error("Failed to fetch user rewards:", err));

            // Fetch Rewards List (Public endpoint, but good practice to be consistent if needed)
            fetch(`${API_URL}/api/rewards`)
                .then(res => res.json())
                .then(data => setRewards(data))
                .catch(err => console.error("Failed to fetch rewards:", err));
        };

        fetchData();
    }, [user.id]);

    const handleRedeem = async (reward: Reward) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                alert('You must be logged in to redeem rewards');
                return;
            }

            const response = await fetch(`${API_URL}/api/redeem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    // userId is now extracted from token on backend
                    rewardCost: reward.cost,
                    rewardName: reward.title
                })
            });

            if (response.ok) {
                const data = await response.json();
                setPoints(data.newBalance);
                alert(`Successfully redeemed ${reward.title}!`);
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to redeem');
            }
        } catch (err) {
            console.error("Redemption error:", err);
            alert('Failed to redeem reward');
        }
    };

    return (
        <div className="container mx-auto p-4 pb-24 md:pb-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Rewards</h1>

            {/* Points Card */}
            <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Current Balance</p>
                            <h2 className="text-5xl font-bold mt-1">{points} <span className="text-2xl font-normal text-gray-400">pts</span></h2>
                        </div>
                        <div className="bg-white/10 p-3 rounded-full">
                            <Award size={32} className="text-yellow-400" />
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Progress to Free Coffee</span>
                            <span className="font-bold">{points} / {nextReward}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-yellow-400 h-3 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Earn 10 points for every $1 spent.</p>
                </div>
            </div>

            {/* Redeem Section */}
            <h2 className="text-xl font-bold mb-4 text-gray-900">Redeem Points</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => {
                    const IconComponent = ICON_MAP[reward.icon] || Gift;
                    return (
                        <div key={reward.id} className={`p-4 rounded-xl border ${points >= reward.cost ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-70'} flex justify-between items-center`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${points >= reward.cost ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <IconComponent size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{reward.title}</h3>
                                    <p className="text-sm text-gray-500">{reward.cost} points</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRedeem(reward)}
                                disabled={points < reward.cost}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${points >= reward.cost
                                    ? 'bg-black text-white hover:bg-gray-800'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Redeem
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Rewards;
