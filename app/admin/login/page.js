// app/admin/login/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../contexts/AppContext';

export default function AdminLogin() {
  const router = useRouter();
  const { setIsAdmin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple auth for demo — in production use real API
    if (email === 'admin@verdora.com' && password === 'admin123') {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdmin', 'true');
      }
      router.push('/admin');
    } else {
      setError('Invalid credentials. Try admin@verdora.com / admin123');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <Link href="/" className="admin-login-logo">
          <span>🌿</span>
          <span>Verdora</span>
        </Link>
        <h1>Admin Access</h1>
        <p>Sign in to manage products, orders, and inventory.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@verdora.com"
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Sign In
          </button>
        </form>

        <div className="admin-login-hint">
          <strong>Demo credentials:</strong>
          <div>admin@verdora.com / admin123</div>
        </div>

        <Link href="/" className="admin-login-back">
          ← Back to store
        </Link>
      </div>
    </div>
  );
}