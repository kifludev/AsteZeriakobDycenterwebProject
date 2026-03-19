import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FooterPage } from "../components/FooterPage";

export function BookingPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const statusIntervalRef = useRef(null);

  // -------- SUBMIT BOOKING --------
  const submitBooking = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        fullName,
        email,
        phone,
        facility,
        date,
        time,
        duration,
        message,
      });

      setStatus("pending");
      setShowStatus(true);
      checkStatus(email);

      alert("Booking submitted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error occurred");
      console.error(error);
    }

    e.target.reset();
  };

  // -------- CHECK STATUS --------
  const checkStatus = (userEmail) => {
    if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);

    statusIntervalRef.current = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/check/${userEmail}`,
        );

        const currentStatus = res.data.status || "pending";
        setStatus(currentStatus);
        setShowStatus(true);

        if (currentStatus === "approved" || currentStatus === "rejected") {
          clearInterval(statusIntervalRef.current);
          statusIntervalRef.current = null;
        }
      } catch (error) {
        console.error("Status check failed", error);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
    };
  }, []);

  return (
    <>
      <link rel="icon" href="/logo1.png" />

      {/* HEADER */}
      <section className="bg-[#740305] text-white py-12 mt-12 text-center">
        <h1 className="text-4xl font-bold">Youth Center Booking</h1>
        <p className="mt-2 text-lg">
          Book our Hall, Basketball Court, or Volleyball Court easily.
        </p>
      </section>

      {/* FORM */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-6">Book Now</h2>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <form onSubmit={submitBooking} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#740305]"
            />

            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#740305]"
            />

            <input
              type="tel"
              placeholder="Phone"
              required
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#740305]"
            />

            <select
              required
              onChange={(e) => setFacility(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#740305]"
            >
              <option value="">Select Facility</option>
              <option value="Hall Rental">Hall Rental</option>
              <option value="Basketball Court">Basketball Court</option>
              <option value="Volleyball Court">Volleyball Court</option>
            </select>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#740305]"
              />

              <input
                type="time"
                required
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#740305]"
              />
            </div>

            <input
              type="number"
              placeholder="Duration (hours)"
              required
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#740305]"
            />

            <textarea
              rows="3"
              placeholder="Additional Message"
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#740305]"
            />

            <button
              type="submit"
              className="w-full bg-[#740305] text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Submit Booking
            </button>
          </form>

          {/* STATUS */}
          {showStatus && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
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
                  <div className="w-4 h-4 border-2 border-t-transparent border-yellow-600 rounded-full animate-spin"></div>
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
