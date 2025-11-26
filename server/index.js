import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
};

// Routes
app.get('/', (req, res) => {
    res.send('Cafe Loyalty API is running');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all menu items
app.get('/api/menu', async (req, res) => {
    const { data, error } = await supabase
        .from('menu_items')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

// Get all rewards
app.get('/api/rewards', async (req, res) => {
    const { data, error } = await supabase
        .from('rewards')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

// Get user by ID (including points) - PROTECTED
app.get('/api/users/:id', authenticateUser, async (req, res) => {
    // Optional: Ensure user is requesting their own data
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error) {
        return res.status(404).json({ message: 'User not found', error: error.message });
    }
    res.json(data);
});

// Place an order - PROTECTED
app.post('/api/orders', authenticateUser, async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id; // Use authenticated user ID

    // 1. Get User
    const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (userError || !user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // 2. Calculate Total (Fetch prices from DB to be safe, but for now we'll trust the ID lookup)
    // Ideally we should fetch menu items to get prices.
    const { data: menuItems } = await supabase.from('menu_items').select('*');

    let totalAmount = 0;
    items.forEach(item => {
        const menuItem = menuItems?.find(m => m.id === item.menuId);
        if (menuItem) {
            totalAmount += menuItem.price * (item.quantity || 1);
        }
    });

    const pointsEarned = Math.floor(totalAmount * 10);
    const newPoints = (user.points || 0) + pointsEarned;

    // 3. Update User Points
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', userId);

    if (updateError) {
        return res.status(500).json({ error: 'Failed to update points' });
    }

    // 4. Record Transaction
    const { data: transaction, error: txError } = await supabase
        .from('transactions')
        .insert([
            {
                user_id: userId,
                total: totalAmount,
                points_earned: pointsEarned,
                items: items
            }
        ])
        .select()
        .single();

    if (txError) {
        console.error('Transaction error:', txError);
        // We still return success because points were updated, but log the error
    }

    res.json({
        message: 'Order placed successfully',
        pointsEarned,
        newBalance: newPoints,
        transaction
    });
});

// Redeem a reward - PROTECTED
app.post('/api/redeem', authenticateUser, async (req, res) => {
    const { rewardCost, rewardName } = req.body;
    const userId = req.user.id; // Use authenticated user ID

    // 1. Get User
    const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (userError || !user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if ((user.points || 0) < rewardCost) {
        return res.status(400).json({ message: 'Insufficient points' });
    }

    const newPoints = user.points - rewardCost;

    // 2. Update User Points
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', userId);

    if (updateError) {
        return res.status(500).json({ error: 'Failed to update points' });
    }

    // 3. Record Transaction
    const { data: transaction, error: txError } = await supabase
        .from('transactions')
        .insert([
            {
                user_id: userId,
                total: 0,
                points_earned: -rewardCost, // Negative for redemption
                items: [{ name: rewardName, type: 'redemption' }]
            }
        ])
        .select()
        .single();

    res.json({
        message: 'Reward redeemed successfully',
        pointsRedeemed: rewardCost,
        newBalance: newPoints,
        transaction
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
