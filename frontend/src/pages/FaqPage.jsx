const faq = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3 to 7 business days depending on your location and stock availability."
  },
  {
    q: "Can I return an item?",
    a: "Yes. We offer a 14-day return policy for unused items in original condition with tags."
  },
  {
    q: "Is Stripe checkout secure?",
    a: "Yes. Payments are processed through Stripe over encrypted connections. Card details are not stored on Smartcart."
  },
  {
    q: "How can I track my order?",
    a: "Login and open the Orders section to check order status and payment progress."
  },
  {
    q: "How do I access the admin dashboard?",
    a: "Login with an admin account, then open /admin to manage products, users, and orders."
  }
];

const FaqPage = () => (
  <section className="card mx-auto max-w-4xl">
    <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
    <div className="mt-5 space-y-3">
      {faq.map((item) => (
        <article key={item.q} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <h3 className="font-semibold">{item.q}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
        </article>
      ))}
    </div>
  </section>
);

export default FaqPage;
