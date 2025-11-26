import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { supabase } from './lib/supabase';
import LoginPage from './components/loginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  // Restore user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Realtime Subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          console.log('Realtime update:', payload);
          const updatedUser = { ...user, ...payload.new } as User;
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]); // Re-subscribe if user ID changes

  function handleLogin(userData: User) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }


  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/signUpPage" element={<SignUpPage />} />
          <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;
