import { Layout } from '@/components/Layout';
import { Scale, ShieldCheck, Clock, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 animate-fade-up">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            About PriceCompare SA
          </h1>
          <p className="text-lg text-muted-foreground">
            Helping South Africans find the best prices across major retailers.
          </p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Mission */}
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
            <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In today's economy, every rand counts. PriceCompare SA was created to help South African 
              shoppers make informed decisions by comparing prices across Pick n Pay, Checkers, Shoprite, 
              and Woolworths — all in one convenient place.
            </p>
          </section>

          {/* How it Works */}
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
            <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              How It Works
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We aggregate publicly available product information from South Africa's top retailers. 
              Our platform allows you to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Search for products across all retailers simultaneously
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Compare prices side-by-side to find the best deals
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Click through directly to the retailer's website to make your purchase
              </li>
            </ul>
          </section>

          {/* Data & Ethics */}
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
            <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Data Collection & Ethics
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All product data displayed on PriceCompare SA is sourced from publicly accessible 
              online product listings. We are committed to ethical data practices:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                We only access publicly available information
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                We respect robots.txt directives and rate limits
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                We do not store personal user data
              </li>
            </ul>
          </section>

          {/* Data Timestamp */}
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
            <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Data Freshness
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Product prices and availability are updated periodically. While we strive to keep 
              our data as current as possible, prices may change on retailer websites. We always 
              recommend verifying the price on the retailer's website before making a purchase.
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80">
              <strong>Last data update:</strong> December 2024
            </p>
          </section>

          {/* Retailers */}
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up opacity-0 stagger-5" style={{ animationFillMode: 'forwards' }}>
            <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Supported Retailers
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { name: 'Pick n Pay', color: 'bg-pnp-light text-pnp' },
                { name: 'Checkers', color: 'bg-checkers-light text-checkers' },
                { name: 'Shoprite', color: 'bg-shoprite-light text-shoprite' },
                { name: 'Woolworths', color: 'bg-woolworths-light text-woolworths' },
              ].map((retailer) => (
                <div
                  key={retailer.name}
                  className={`rounded-xl p-4 text-center font-semibold ${retailer.color}`}
                >
                  {retailer.name}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
