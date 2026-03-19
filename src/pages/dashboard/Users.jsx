import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const [resetModal, setResetModal] = useState({
    open: false,
    userId: null,
    oldPassword: "",
    newPassword: "",
  });

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  async function loadUsers() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users",
        getAuthConfig(),
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async () => {
    if (!name || !email || !password) return alert("All fields are required");

    try {
      await axios.post(
        "http://localhost:5000/api/users",
        { username: name, email, password, role },
        getAuthConfig(),
      );
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create user");
    }
  };

  const resetPassword = async () => {
    const { userId, oldPassword, newPassword } = resetModal;
    if (!oldPassword || !newPassword) return alert("All fields are required");

    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}/reset-password`,
        { oldPassword, newPassword },
        getAuthConfig(),
      );
      alert("Password reset successfully");
      setResetModal({
        open: false,
        userId: null,
        oldPassword: "",
        newPassword: "",
      });
      loadUsers();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Failed to reset password");
    }
  };

  const changeRole = async (id, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}/role`,
        { role: newRole },
        getAuthConfig(),
      );
      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to change role");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        getAuthConfig(),
      );
      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-blue-600">
        🧑‍💼 Users Management
      </h2>

      {/* Create User Form */}
      <div className="bg-gray-100 p-4 rounded shadow space-y-3">
        <h3 className="font-medium">Create New User</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border rounded px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            className="bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 font-medium"
            onClick={createUser}
          >
            Create User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="font-medium mb-3">Existing Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <select
                      className="border rounded px-2 py-1"
                      value={user.role}
                      onChange={(e) => changeRole(user.id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() =>
                        setResetModal({
                          open: true,
                          userId: user.id,
                          oldPassword: "",
                          newPassword: "",
                        })
                      }
                    >
                      Reset Password
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Password Modal */}
      {resetModal.open && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg w-full max-w-md p-5">
              <h4 className="text-lg font-medium mb-4">Reset Password</h4>
              <input
                type="password"
                className="border rounded px-3 py-2 mb-3 w-full"
                placeholder="Old Password"
                value={resetModal.oldPassword}
                onChange={(e) =>
                  setResetModal({ ...resetModal, oldPassword: e.target.value })
                }
              />
              <input
                type="password"
                className="border rounded px-3 py-2 mb-3 w-full"
                placeholder="New Password"
                value={resetModal.newPassword}
                onChange={(e) =>
                  setResetModal({ ...resetModal, newPassword: e.target.value })
                }
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                  onClick={resetPassword}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded"
                  onClick={() =>
                    setResetModal({
                      open: false,
                      userId: null,
                      oldPassword: "",
                      newPassword: "",
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      )}
    </div>
  );
}
