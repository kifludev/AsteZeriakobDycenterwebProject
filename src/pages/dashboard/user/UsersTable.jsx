export function UsersTable({ users, onDelete, onRoleChange, onReset }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="mb-3 font-bold text-2xl text-center">Existing Users</h3>

      <table className="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="text-center">{user.username}</td>
              <td className="text-center">{user.email}</td>

              <td>
                <select
                  className="px-4 text-center"
                  value={user.role}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td>
                <button
                  className="bg-yellow-600 text-white px-3 m-4 mr-2 rounded hover:bg-yellow-700 transition"
                  onClick={() => onReset(user)}
                >
                  Reset
                </button>
                <button
                  className="bg-red-500 text-white px-3 mb-2 rounded hover:bg-red-600 transition"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
