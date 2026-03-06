import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <section className="card mx-auto max-w-2xl text-center">
    <p className="text-sm uppercase tracking-widest text-slate-500">404</p>
    <h1 className="mt-2 text-4xl font-bold">Page Not Found</h1>
    <p className="mt-2 text-slate-500">The page you requested does not exist.</p>
    <Link to="/" className="btn-primary mt-5 inline-block">Go Home</Link>
  </section>
);

export default NotFoundPage;
