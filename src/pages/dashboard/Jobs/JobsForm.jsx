export function JobsForm({ form, handleChange, submitJob, editingId }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitJob();
      }}
      className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <textarea
        name="title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 rounded md:col-span-4"
        placeholder="Job Title"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded md:col-span-4"
        placeholder="Job Description"
      />

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Location"
      />

      <input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Salary"
      />

      {/* ⏳ POSTED DATE */}
      <label htmlFor="Posted_date" className="font-semibold">
        Posteddate:
        <input
          type="date"
          name="posted_date"
          value={form.posted_date}
          onChange={handleChange}
          className="border p-2 rounded ml-3"
        />
      </label>
      {/* 📅 DEADLINE (future date) */}
      <label htmlFor="deadline" className="font-semibold">
        Deadline:
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]} // prevents past dates
          className="border p-2 rounded ml-3"
        />
      </label>
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Contract</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>

      <button
        type="submit"
        className={`md:col-span-4 text-white p-2 rounded ${
          editingId ? "bg-yellow-500" : "bg-blue-600 cursor-pointer"
        }`}
      >
        {editingId ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}
