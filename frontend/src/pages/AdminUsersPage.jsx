import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const { data } = await api.get("/admin/users");
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const promote = async (id) => {
    try {
      await api.patch(`/admin/users/${id}/promote`);
      toast.success("User promoted");
      await loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to promote");
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      {users.map((user) => (
        <article key={user._id} className="card flex items-center justify-between">
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{user.role}</span>
            {user.role !== "admin" && (
              <button type="button" className="btn-primary" onClick={() => promote(user._id)}>
                Make Admin
              </button>
            )}
          </div>
        </article>
      ))}
    </section>
  );
};

export default AdminUsersPage;
