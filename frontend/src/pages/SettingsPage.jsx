import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <article className="card">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Manage your account preferences.
        </p>
      </article>

      <article className="card">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
          Choose your preferred theme.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`rounded-xl border px-4 py-3 text-left ${
              theme === "light"
                ? "border-slate-900 bg-slate-900 text-white dark:border-sky-500 dark:bg-sky-500"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            }`}
          >
            Light Mode
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`rounded-xl border px-4 py-3 text-left ${
              theme === "dark"
                ? "border-slate-900 bg-slate-900 text-white dark:border-sky-500 dark:bg-sky-500"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            }`}
          >
            Dark Mode
          </button>
        </div>
      </article>

      <article className="card">
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </article>
    </section>
  );
};

export default SettingsPage;
