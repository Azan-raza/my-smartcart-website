import { useState } from "react";
import toast from "react-hot-toast";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const contactInfo = [
  { label: "Support Email", value: "support@smartcart.com" },
  { label: "Phone", value: "+92 300 0000000" },
  { label: "Hours", value: "Mon - Sat, 9:00 AM to 8:00 PM" }
];

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);

  const submit = (e) => {
    e.preventDefault();
    toast.success("Message sent. Our team will contact you soon.");
    setForm(initialForm);
  };

  return (
    <section className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.1fr,0.9fr]">
      <article className="card">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Have a question about orders, returns, or product sizing? Send us a message.
        </p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
          <textarea
            rows={5}
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </article>

      <article className="card space-y-3">
        <h2 className="text-xl font-semibold">Support Details</h2>
        {contactInfo.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-1 font-semibold">{item.value}</p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default ContactPage;
