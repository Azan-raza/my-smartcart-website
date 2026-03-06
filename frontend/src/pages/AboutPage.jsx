const values = [
  {
    title: "Quality First",
    text: "Every drop is selected with durable materials, stable sizing, and consistent stitching standards."
  },
  {
    title: "Fast Fulfillment",
    text: "Orders are packed quickly with real-time status updates from checkout to doorstep."
  },
  {
    title: "Customer Focus",
    text: "Clear return policies, responsive support, and transparent pricing are built into every order."
  }
];

const AboutPage = () => (
  <section className="mx-auto max-w-5xl space-y-6">
    <article className="card">
      <h1 className="text-3xl font-bold">About Smartcart</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Smartcart is a modern clothing platform for everyday essentials and trend-focused pieces.
        We combine curated product quality, reliable shipping, and easy online shopping.
      </p>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        From product discovery to secure checkout and order tracking, every section is built
        to keep the buying experience simple, clear, and fast.
      </p>
    </article>

    <article className="grid gap-4 md:grid-cols-3">
      {values.map((item) => (
        <div key={item.title} className="card">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
        </div>
      ))}
    </article>
  </section>
);

export default AboutPage;
