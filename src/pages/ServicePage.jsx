import { useState } from "react";
import { FooterPage } from "../components/FooterPage";

export function ServicePage() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <>
      <link rel="icon" href="/logo1.png" />
      <title>Services - Zereyakob DIY Center</title>
      {/* HEADER */}
      <section className="bg-[#740305] text-white py-12 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Zereyakob DIY Center Services
          </h1>
          <p className="text-lg">
            Providing essential facilities and services for youth development.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* STUDENT SERVICES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-10">
            Student Support Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-globe text-4xl text-[#740305] mb-3"></i>
              <h4 className="font-semibold text-lg mb-2">Internet Access</h4>
              <p className="mb-3">
                Reliable internet for learning and digital skills.
              </p>

              <button
                onClick={() => toggle(1)}
                className="border border-[#740305] text-[#740305] px-4 py-2 rounded"
              >
                Learn More
              </button>

              {open === 1 && (
                <p className="mt-3 text-sm text-gray-600">
                  High-speed internet access for research and education.
                </p>
              )}
            </div>

            {/* CARD 2 */}
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-volleyball-ball text-4xl text-[#740305] mb-3"></i>
              <h4 className="font-semibold text-lg mb-2">Volleyball</h4>
              <p className="mb-3">
                Facilities that promote teamwork and fitness.
              </p>

              <button
                onClick={() => toggle(2)}
                className="border border-[#740305] text-[#740305] px-4 py-2 rounded"
              >
                Learn More
              </button>

              {open === 2 && (
                <p className="mt-3 text-sm text-gray-600">
                  Organized training and competitions available.
                </p>
              )}
            </div>

            {/* CARD 3 */}
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-basketball-ball text-4xl text-yellow-500 mb-3"></i>
              <h4 className="font-semibold text-lg mb-2">Basketball</h4>
              <p className="mb-3">Safe courts for training and competitions.</p>

              <button
                onClick={() => toggle(3)}
                className="border border-[#740305] text-[#740305] px-4 py-2 rounded"
              >
                Learn More
              </button>

              {open === 3 && (
                <p className="mt-3 text-sm text-gray-600">
                  Friendly matches and skill development programs.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* FACILITIES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-10">
            Youth Facilities
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-2">🚿 Shower Service</h4>
              <ul className="list-disc ml-5 text-gray-600">
                <li>24/7 access</li>
                <li>Private areas</li>
                <li>Clean and safe</li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-2">💻 IT Support</h4>
              <ul className="list-disc ml-5 text-gray-600">
                <li>24/7 support</li>
                <li>Campus WiFi</li>
                <li>Computer labs</li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-2">🍽 Cafeteria</h4>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Healthy meals</li>
                <li>Snack bars</li>
                <li>Diet options</li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-2">
                🏋 Recreation Center
              </h4>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Gym</li>
                <li>Swimming pool</li>
                <li>Sports courts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* HEALTH */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-10">
            Youth Health Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ul className="grid grid-cols-2 gap-2 text-gray-700">
                <li>✔ Medical care</li>
                <li>✔ Immunizations</li>
                <li>✔ Counseling</li>
                <li>✔ Pharmacy</li>
              </ul>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 text-center">
              <i className="fas fa-stethoscope text-3xl text-[#740305] mb-2"></i>
              <p>Health Insurance Available</p>
              <button className="mt-2 bg-[#740305] text-white px-4 py-2 rounded">
                Info
              </button>
            </div>
          </div>
        </section>

        {/* DISABILITY */}
        <section className="mb-12">
          <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-xl font-bold mb-3">Disability Support</h2>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Academic support</li>
                <li>Assistive tech</li>
                <li>Accessibility help</li>
              </ul>
            </div>

            <div className="text-center text-5xl text-[#740305]">♿</div>
          </div>
        </section>
      </div>

      <FooterPage />
    </>
  );
}
