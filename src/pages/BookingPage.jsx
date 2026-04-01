import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FooterPage } from "../components/FooterPage";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  facility: "",
  date: "",
  time: "",
  duration: "",
  message: "",
};

export function BookingPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const intervalRef = useRef(null);

  // ---------------- INPUT STYLE ----------------
  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 " +
    "focus:outline-none focus:ring-2 focus:ring-[#740305] focus:border-transparent " +
    "focus:scale-[1.01] transition duration-200 bg-white shadow-sm";

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- CHECK AVAILABILITY ----------------
  const checkAvailability = async () => {
    const { facility, date, time } = form;

    if (!facility || !date || !time) return false;

    try {
      setChecking(true);

      const res = await axios.get(
        "http://localhost:5000/api/bookings/check-slot",
        {
          params: { facility, date, time },
        },
      );

      return res.data.available;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setChecking(false);
    }
  };

  // ---------------- SUBMIT BOOKING ----------------
  const submitBooking = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const available = await checkAvailability();

      if (!available) {
        alert("❌ This slot is already booked. Please choose another time.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        form,
      );

      setStatus("pending");
      setShowStatus(true);
      console.log("This is the posting area");
      startStatusCheck(form.email);

      setForm(initialForm);
      console.log(response.data);
      alert("✅ Booking submitted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- STATUS CHECK ----------------
  const startStatusCheck = (email) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/check/${email}`,
        );

        const current = res.data.status || "pending";
        setStatus(current);
        setShowStatus(true);

        if (current === "approved" || current === "rejected") {
          clearInterval(intervalRef.current);
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000);
  };

  // ---------------- CLEANUP ----------------
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ---------------- UI ----------------
  return (
    <>
      <link rel="icon" href="/logo1.png" />
      <title>Booking - Zereyakob DIY Center</title>
      {/* HEADER */}
      <section className="bg-[#740305] text-white py-14 text-center">
        <h1 className="text-4xl font-bold">Youth Center Booking</h1>
        <p className="mt-2 text-lg opacity-90">
          Book hall, basketball court, or volleyball court easily
        </p>
      </section>

      {/* FORM WRAPPER */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Reserve Your Facility
        </h2>

        {/* CARD */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 border border-gray-100">
          <form onSubmit={submitBooking} className="space-y-6">
            {/* NAME */}
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
              required
            />

            {/* EMAIL */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
              required
            />

            {/* PHONE */}
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={inputClass}
              required
            />

            {/* FACILITY */}
            <select
              name="facility"
              value={form.facility}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Facility</option>
              <option>Hall Rental</option>
              <option>Basketball Court</option>
              <option>Volleyball Court</option>
            </select>

            {/* DATE + TIME */}
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
                required
              />

              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* DURATION */}
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Duration (hours)"
              className={inputClass}
              required
            />

            {/* MESSAGE */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Additional message (optional)"
              rows="3"
              className={inputClass}
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || checking}
              className="w-full bg-[#740305] text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : checking
                  ? "Checking availability..."
                  : "Submit Booking"}
            </button>
          </form>

          {/* STATUS */}
          {showStatus && (
            <div
              className={`mt-8 p-4 rounded-xl text-center font-medium ${
                status === "approved"
                  ? "bg-green-100 text-green-700"
                  : status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status === "pending" && (
                <div className="flex justify-center items-center gap-2">
                  ⏳ Waiting for approval...
                  <span className="animate-spin">🔄</span>
                </div>
              )}

              {status === "approved" && "✅ Your booking has been approved!"}
              {status === "rejected" && "❌ Your booking was rejected"}
            </div>
          )}
        </div>
      </div>

      <FooterPage />
    </>
  );
}
