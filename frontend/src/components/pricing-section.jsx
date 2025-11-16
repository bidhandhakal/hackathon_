import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    subtitle: "For starting out",
    fee: "5%",
    popular: false,
    features: [
      "AI-powered features",
      "Collaboration & project tracking tools",
      "Pay as work is completed",
    ],
  },
  {
    name: "Business Plus",
    subtitle: "For growing",
    fee: "10%",
    popular: true,
    features: [
      "Everything in Basic, plus:",
      "Access to top 1% vetted talent",
      "AI Recruiter",
      "Team controls",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Clients only pay after hiring
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border p-8 transition-all hover:shadow-lg ${
                plan.popular
                  ? "bg-primary/10 border-primary md:scale-105"
                  : "bg-card border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mb-6">{plan.subtitle}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {plan.fee}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  service fee after hiring
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                Get started for free
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
