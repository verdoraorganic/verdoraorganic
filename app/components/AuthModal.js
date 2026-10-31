// app/components/AuthModal.js
'use client';
import { useState } from 'react';
import { useApp } from '../contexts/AppContext';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { setIsAdmin } = useApp();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@verdora.com' && password === 'admin123') {
      setIsAdmin(true);
      alert('✅ Admin Login Successful!');
      onClose();
    } else {
      alert('✅ Login Successful!');
      onClose();
    }
  };

  return (
    <div className="auth-modal" onClick={onClose}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>✕</button>
        <h2>{isLogin ? '👋 Welcome Back!' : '🌱 Create Account'}</h2>
        <p>{isLogin ? 'Sign in to your account' : 'Join the organic community'}</p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-submit">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <div className="switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}