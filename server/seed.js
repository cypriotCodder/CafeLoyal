import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { MENU_ITEMS } from './data.js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Use SERVICE_ROLE_KEY if available for bypassing RLS, otherwise ANON key might fail for inserts if policies are strict

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const REWARDS = [
    { title: "Free Coffee", cost: 500, icon: "Coffee" },
    { title: "Pastry", cost: 300, icon: "Gift" },
    { title: "Discount", cost: 1000, icon: "Award" }
];

async function seed() {
    console.log('Seeding database...');

    // Seed Menu Items
    const { error: menuError } = await supabase
        .from('menu_items')
        .upsert(MENU_ITEMS.map(item => {
            const { id, ...rest } = item; // Let DB handle ID if needed, or keep it if we want consistent IDs
            return rest;
        }));

    if (menuError) console.error('Error seeding menu:', menuError);
    else console.log('Menu items seeded.');

    // Seed Rewards
    const { error: rewardError } = await supabase
        .from('rewards')
        .upsert(REWARDS);

    if (rewardError) console.error('Error seeding rewards:', rewardError);
    else console.log('Rewards seeded.');

    console.log('Seeding complete.');
}

seed();
