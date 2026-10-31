// app/components/Testimonials.js
'use client';

const testimonials = [
  { 
    name: 'Nithin Kamath', 
    role: 'Founder, Rainmatter', 
    text: 'Clean food, deep purpose, and a clear mission to support farmer livelihoods. We\'re investors but also proud customers.', 
    initial: 'N' 
  },
  { 
    name: 'Mira Kapoor', 
    role: 'India', 
    text: 'One of the few brands that makes ghee the traditional way — from dahi, not malai. Delicious, wholesome, always a repeat buy.', 
    initial: 'M' 
  },
  { 
    name: 'Akshay Kumar', 
    role: 'Bollywood Superstar', 
    text: 'Thrilled to support their journey towards a healthier, cleaner India. What they stand for is exactly what our future needs.', 
    initial: 'A' 
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-heading">
          <div className="eyebrow">Testimonials</div>
          <h2>Loved by Thousands</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card zoom-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="stars">★★★★★</div>
              <div className="text">“{t.text}”</div>
              <div className="author">
                <div className="avatar">{t.initial}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}