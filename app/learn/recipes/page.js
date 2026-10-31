// app/learn/recipes/page.js
export const metadata = {
  title: 'Recipes · Verdora Organic',
  description: 'Simple, honest recipes built around what we grow.',
};

const recipes = [
  {
    emoji: '🍵',
    time: '5 min',
    title: 'Turmeric Golden Milk',
    tag: 'Immunity',
    desc: 'A warming cup with turmeric, black pepper & A2 ghee.',
  },
  {
    emoji: '🥣',
    time: '20 min',
    title: 'Bilona Ghee Dal',
    tag: 'Comfort',
    desc: 'Slow-cooked moong dal finished with bilona ghee tadka.',
  },
  {
    emoji: '🍚',
    time: '30 min',
    title: 'Brown Basmati Pulao',
    tag: 'Weeknight',
    desc: 'Fragrant rice with whole spices and seasonal vegetables.',
  },
  {
    emoji: '🥗',
    time: '10 min',
    title: 'Honey-Lemon Dressing',
    tag: 'Salad',
    desc: 'Raw forest honey, cold-pressed oil, and fresh lemon.',
  },
  {
    emoji: '🧈',
    time: '15 min',
    title: 'Ghee Roast Poha',
    tag: 'Breakfast',
    desc: 'Flattened rice, roasted in ghee with peanuts & curry leaves.',
  },
  {
    emoji: '🍯',
    time: '8 min',
    title: 'Honey Ginger Tea',
    tag: 'Winter',
    desc: 'Fresh ginger, honey, and a squeeze of lime.',
  },
];

export default function RecipesPage() {
  return (
    <section className="vd-page-section">
      <div className="container">
        <div className="vd-prose vd-prose-center">
          <p className="vd-prose-lede">
            Simple, honest recipes built around what we grow.
          </p>
        </div>

        <div className="vd-recipes-grid">
          {recipes.map((r, i) => (
            <article className="vd-recipe-card" key={i}>
              <div className="vd-recipe-media">
                <span>{r.emoji}</span>
                <span className="vd-recipe-time">⏱ {r.time}</span>
              </div>
              <div className="vd-recipe-body">
                <div className="vd-recipe-tags">
                  <span className="vd-recipe-tag">{r.tag}</span>
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <div className="vd-recipe-footer">
                  <span className="vd-recipe-difficulty">Read recipe →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}