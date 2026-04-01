import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FooterPage } from "../../components/FooterPage";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/login/",
        { username, password },
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.user.role);
        alert("Login successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      console.log(error);
    }

    e.target.reset();
  };

  return (
    <>
      <title>Admin Login - Kiyamid College</title>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
        <div className="w-full max-w-md">
          {/* CARD */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            {/* HEADER */}
            <div className="text-center mb-6">
              <i className="fas fa-lock text-4xl text-[#740305] mb-3"></i>
              <h2 className="text-2xl font-bold">Administrator Login</h2>
              <p className="text-gray-500 text-sm">
                Enter your credentials to access the admin panel
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* USERNAME */}
              <div>
                <label className="block mb-1 font-medium">Username</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <span className="px-3 text-gray-500">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <span className="px-3 text-gray-500">
                    <i className="fas fa-key"></i>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* REMEMBER */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#740305] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* BACK LINK */}
          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-[#740305] flex items-center justify-center gap-2 hover:underline"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>

      <FooterPage />
    </>
  );
}
