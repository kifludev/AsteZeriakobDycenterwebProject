import { useEffect, useState } from "react";
import {
  getUsers,
  createUserAPI,
  deleteUserAPI,
  changeUserRoleAPI,
  resetPasswordAPI,
} from "./userService";
import { UserForm } from "./UserForm";
import { UsersTable } from "./UsersTable";
import { ResetPasswordModal } from "./ResetPasswordModal";
export function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [modal, setModal] = useState({ open: false });

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const loadUsers = async () => {
    const res = await getUsers(config);
    setUsers(res.data);
    console.log(res);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await createUserAPI({ username: name, email, password, role }, config);

      // clear form
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      // reload users
      loadUsers();

      alert("User created successfully");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUserAPI(id, config);

      loadUsers();

      alert("User deleted successfully 🗑️");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await resetPasswordAPI(modal.userId, modal, config);
      alert(res.data.message);
      setModal({ open: false });
      loadUsers();
      console.log(res);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const handleResetRole = async (id, role) => {
    try {
      await changeUserRoleAPI(id, role, config);

      loadUsers();

      alert("Role updated successfully 👤");
    } catch (error) {
      console.log(error);
      alert("Failed to update role");
    }
  };

  return (
    <div className="p-6 space-y-6 ">
      <UserForm
        name={name}
        email={email}
        password={password}
        role={role}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setRole={setRole}
        onCreate={handleCreateUser}
      />

      <UsersTable
        users={users}
        onDelete={handleDeleteUser}
        onRoleChange={handleResetRole}
        onReset={(user) => setModal({ open: true, userId: user.id })}
      />

      <ResetPasswordModal
        modal={modal}
        setModal={setModal}
        onSave={handleResetPassword}
      />
    </div>
  );
}
