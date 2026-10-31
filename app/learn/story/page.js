// app/learn/story/page.js
export const metadata = {
  title: 'Our Story · Verdora Organic',
  description: 'How Verdora began — a family, a farm, and a promise.',
};

export default function StoryPage() {
  return (
    <section className="vd-page-section">
      <div className="container-content">
        <div className="vd-prose">
          <p className="vd-prose-lede">
            In 2015, we started with one question: <em>why is it so hard to
            find food you can actually trust?</em>
          </p>

          <p>
            Verdora began in a small kitchen in rural Maharashtra. What we
            made — bilona ghee, forest honey, stone-ground flour — was for
            our own family. Word travelled faster than we expected.
          </p>

          <p>
            Neighbours asked. Then neighbours of neighbours. Within a year, we
            were shipping to families in four cities. Within five, we had
            partnered with over 200 smallholder farmers across seven states.
          </p>

          <h2>Where we are today</h2>
          <p>
            We still work the same way. Small batches. Hand-checked. Every
            batch is tested on our own kitchen table before it ships.
            Nothing leaves the warehouse until it passes.
          </p>

          <p>
            Our farmer partners earn 22% above local mandi rates. Their
            children go to better schools. Their soil is healthier than it
            was a decade ago. That&apos;s the only metric that matters.
          </p>

          <h2>What we believe</h2>
          <p>
            Food is not a product. It&apos;s a relationship — between farmer
            and family, soil and season, tradition and tomorrow. We try to
            honour all of it.
          </p>

          <div className="vd-prose-stats">
            <div>
              <div className="num">240+</div>
              <div className="lbl">Partner Farmers</div>
            </div>
            <div>
              <div className="num">7</div>
              <div className="lbl">States</div>
            </div>
            <div>
              <div className="num">10</div>
              <div className="lbl">Years</div>
            </div>
            <div>
              <div className="num">50k+</div>
              <div className="lbl">Families</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}