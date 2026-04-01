export function ResetPasswordModal({ modal, setModal, onSave }) {
  if (!modal.open) return null;

  const handleCancel = () => {
    setModal({
      open: false,
      userId: null,
      oldPassword: "",
      newPassword: "",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded w-96 shadow-lg">
          <h4 className="mb-4 text-lg font-semibold">Reset Password</h4>

          <input
            type="password"
            placeholder="Old Password"
            value={modal.oldPassword}
            onChange={(e) =>
              setModal({ ...modal, oldPassword: e.target.value })
            }
            className="border w-full px-3 py-2 mb-3 rounded"
          />

          <input
            type="password"
            placeholder="New Password"
            value={modal.newPassword}
            onChange={(e) =>
              setModal({ ...modal, newPassword: e.target.value })
            }
            className="border w-full px-3 py-2 mb-4 rounded"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
