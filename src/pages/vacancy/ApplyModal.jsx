import { ApplicationForm } from "./ApplicationForm";

export function ApplyModal({
  show,
  onClose,
  job,
  form,
  onChange,
  onFileChange,
  onSubmit,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
        <button
          className="bg-red-600 text-3xl px-2 font-bold cursor-pointer text-white mb-2"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold">Apply for: {job?.title}</h3>

        <ApplicationForm
          form={form}
          onChange={onChange}
          onFileChange={onFileChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
