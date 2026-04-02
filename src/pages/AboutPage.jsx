import { FooterPage } from "../components/FooterPage";

import { MobileMenu } from "../components/header/MobileMenu";

export function AboutPage() {
  return (
    <>
      <link rel="icon" href="/diy.png" />
      <title>About Us - Zereyakob DIY Center</title>

      {/* HEADER */}
      <section className="bg-[#740305] text-white py-12 mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            About Zereyakob DIY Center
          </h1>
          <p className="text-lg">
            Zereyakob DIY Center is a youth-focused community innovation hub
            dedicated to empowering young people through practical, hands-on
            learning.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HISTORY */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our History</h2>
              <p className="mb-4">
                Founded in 1985, Kea Med College has been at the forefront of
                medical education and healthcare innovation for over 35 years.
              </p>
              <p>
                Over the decades, we have grown into a comprehensive institution
                with global impact and alumni across 50+ countries.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-history text-5xl text-[#740305] mb-4"></i>
              <h3 className="text-xl font-semibold">35+ Years of Excellence</h3>
              <p>Since our establishment in 1985</p>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="mb-12 py-6 bg-gray-100 rounded-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-eye text-4xl text-[#740305] mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p>
                To become a leading DIY and innovation center that inspires
                young people to create solutions.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <i className="fas fa-bullseye text-4xl text-[#740305] mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p>
                To empower youth with practical DIY skills, creativity, and
                problem-solving abilities.
              </p>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="mb-12">
          <h2 className="text-center text-2xl font-bold mb-10">Leadership</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <img
                src="https://placekitten.com/150/150"
                className="rounded-full mx-auto mb-4"
                alt="Dean"
              />
              <h4 className="text-lg font-semibold">Dr. Sarah Johnson</h4>
              <p className="text-[#740305] mb-2">Dean of Kea Med College</p>
              <p>
                Dr. Johnson has over 25 years of experience in medical
                education.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <img
                src="https://placekitten.com/150/150"
                className="rounded-full mx-auto mb-4"
                alt="President"
              />
              <h4 className="text-lg font-semibold">Prof. Michael Roberts</h4>
              <p className="text-[#740305] mb-2">
                President, Board of Trustees
              </p>
              <p>Provides strategic leadership and direction since 2018.</p>
            </div>
          </div>
        </section>

        {/* ACCREDITATIONS */}
        <section className="mb-12">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-center text-2xl font-bold mb-8">
              Accreditations & Affiliations
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <i className="fas fa-award text-3xl text-[#740305] mb-2"></i>
                <p>National Medical Commission</p>
              </div>

              <div>
                <i className="fas fa-globe text-3xl text-[#740305] mb-2"></i>
                <p>World Health Organization</p>
              </div>

              <div>
                <i className="fas fa-handshake text-3xl text-[#740305] mb-2"></i>
                <p>International Medical Association</p>
              </div>

              <div>
                <i className="fas fa-university text-3xl text-[#740305] mb-2"></i>
                <p>Association of Medical Colleges</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterPage />
    </>
  );
}
