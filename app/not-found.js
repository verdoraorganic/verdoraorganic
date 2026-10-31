import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="app-error">
      <div>
        <p className="eyebrow">404</p>
        <h1>This page has wandered off.</h1>
        <p>Try one of our collections instead.</p>
        <Link className="btn btn-primary" href="/shop">Browse the shop</Link>
      </div>
    </main>
  );
}
