export function UserForm({
  name,
  email,
  password,
  role,
  setName,
  setEmail,
  setPassword,
  setRole,
  onCreate,
}) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow space-y-3">
      <h3 className="font-medium">Create New User</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border px-3 py-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={onCreate}
          className="bg-green-500 text-white rounded px-3 py-2"
        >
          Create User
        </button>
      </div>
    </div>
  );
}
