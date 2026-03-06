import { ShieldCheck, Truck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Premium Quality",
    description: "Curated products with reliable material and fit.",
    icon: Sparkles
  },
  {
    title: "Fast Delivery",
    description: "Quick dispatch and real-time order updates.",
    icon: Truck
  },
  {
    title: "Secure Checkout",
    description: "Stripe and COD support with trusted payment flow.",
    icon: ShieldCheck
  }
];

const TrustBar = () => {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {features.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="card group hover:-translate-y-1">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-teal-500/15 p-2 text-teal-600 dark:bg-teal-500/25 dark:text-teal-300">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default TrustBar;
