'use client';

export default function GlobalError({ reset }) {
  return (
    <main className="app-error" role="alert">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1>We couldn&apos;t load this page.</h1>
        <p>Please try again. If the problem continues, return to the shop.</p>
        <div className="app-error-actions">
          <button className="btn btn-primary" onClick={reset}>Try again</button>
          <a className="btn btn-secondary" href="/shop">Browse the shop</a>
        </div>
      </div>
    </main>
  );
}
