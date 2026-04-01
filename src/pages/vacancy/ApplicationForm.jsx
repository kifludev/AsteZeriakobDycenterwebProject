export function ApplicationForm({ form, onChange, onFileChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Enter Your Name"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#740305]"
        required
      />

      <input
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="Enter Your Email"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#740305]"
        required
      />

      <input
        name="phone"
        value={form.phone}
        onChange={onChange}
        placeholder="Enter Phone Number"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#740305]"
        required
      />

      <label className="font-bold flex flex-col">
        Write Cover Letter:
        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-[#740305]"
          rows={4}
          required
        />
      </label>

      <label className="font-bold flex flex-col">
        Upload Your CV:
        <input
          type="file"
          onChange={onFileChange}
          className="border border-gray-300 rounded-md p-2 mt-1 w-full"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-[#740305] text-white py-3 rounded-2xl mt-2 hover:opacity-90 transition"
      >
        Submit
      </button>
    </form>
  );
}
