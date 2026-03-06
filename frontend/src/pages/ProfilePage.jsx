import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <section className="card mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </section>
  );
};

export default ProfilePage;
