import React, { useState } from "react";
import axios from "axios";
import { OrnaDivider } from "../components/Shared";
import { API_BASE_URL } from "../config";

const AuthPage = ({ setCurrentUser, showToast, setPage, redirectPath }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const updateForm = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      showToast("❌ Please enter a valid email address.");
      return;
    }

    if (!isLogin && !validatePhone(form.phone)) {
      showToast("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    if (form.password.length < 4) {
      showToast("❌ Password must be at least 4 characters long.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
          email: form.email,
          password: form.password,
        });

        if (response.status === 200) {
          const user = response.data;

          // Send login alert email using EmailJS REST API
          let emailErrorMsg = "";
          try {
            // Retrieve location details via free IP API
            let locationStr = "Web Session";
            try {
              const locRes = await axios.get("https://ipapi.co/json/", { timeout: 2000 });
              if (locRes.data && locRes.data.city) {
                locationStr = `${locRes.data.city}, ${locRes.data.region}, ${locRes.data.country_name}`;
              }
            } catch (locErr) {
              console.warn("Could not retrieve IP location", locErr);
            }

            const deviceStr = (() => {
              const ua = navigator.userAgent;
              if (ua.includes("Windows")) return "Windows PC";
              if (ua.includes("Macintosh")) return "Mac OS Device";
              if (ua.includes("iPhone")) return "iPhone";
              if (ua.includes("Android")) return "Android Smartphone";
              if (ua.includes("Linux")) return "Linux PC";
              return "Web Browser";
            })();

            const timestampStr = new Date().toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            });

            const loginEmailPayload = {
              service_id: "service_1jqpgbk",
              template_id: "template_hyyhpl9",
              user_id: "PK56niPqzEWc1B-3Q",
              template_params: {
                to_name: user.name,
                user_name: user.name,
                name: user.name,
                to_email: user.email,
                user_email: user.email,
                email: user.email,
                recipient_email: user.email,
                phone: user.phone || "",
                message: "You have logged in successfully to your account on Mehandi By Yasaswini!",
                
                // Location variables mapping
                location: locationStr,
                ip_location: locationStr,
                city: locationStr,

                // Device variables mapping
                device: deviceStr,
                device_info: deviceStr,
                browser: deviceStr,

                // Timestamp variables mapping
                login_time: timestampStr,
                loginTime: timestampStr,
                time: timestampStr,
                date: timestampStr,
              },
            };

            await axios.post(
              "https://api.emailjs.com/api/v1.0/email/send",
              loginEmailPayload
            );
            console.log("EmailJS: Login alert email sent successfully.");
          } catch (emailErr) {
            console.error("EmailJS Error: Failed to send login alert email.", emailErr);
            const errData = emailErr.response?.data ? (typeof emailErr.response.data === 'string' ? emailErr.response.data : JSON.stringify(emailErr.response.data)) : "";
            emailErrorMsg = errData || emailErr.message || "Unknown error";
          }

          setCurrentUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          if (emailErrorMsg) {
            showToast(`⚠️ Email alert failed: ${emailErrorMsg}`);
          } else {
            showToast(`✨ Welcome back, ${user.name}!`);
          }
          setPage(redirectPath || "home");
        }
      } else {
        // --- REGISTER FLOW ---
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });

        if (response.status === 200 || response.status === 201) {
          const registeredUser = response.data;
          
          // Send registration success email using EmailJS REST API
          let emailErrorMsg = "";
          try {
            const emailPayload = {
              service_id: "service_1jqpgbk",
              template_id: "template_30ae8t7",
              user_id: "PK56niPqzEWc1B-3Q",
              template_params: {
                to_name: registeredUser.name,
                user_name: registeredUser.name,
                name: registeredUser.name,
                to_email: registeredUser.email,
                user_email: registeredUser.email,
                email: registeredUser.email,
                recipient_email: registeredUser.email,
                phone: registeredUser.phone,
                message: "You have registered successfully on Mehandi By Yasaswini!",
              },
            };

            await axios.post(
              "https://api.emailjs.com/api/v1.0/email/send",
              emailPayload
            );
            console.log("EmailJS: Registration confirmation email sent successfully.");
          } catch (emailErr) {
            console.error("EmailJS Error: Failed to send welcome email.", emailErr);
            const errData = emailErr.response?.data ? (typeof emailErr.response.data === 'string' ? emailErr.response.data : JSON.stringify(emailErr.response.data)) : "";
            emailErrorMsg = errData || emailErr.message || "Unknown error";
          }

          // Auto login after registration
          setCurrentUser(registeredUser);
          localStorage.setItem("currentUser", JSON.stringify(registeredUser));
          if (emailErrorMsg) {
            showToast(`⚠️ Email alert failed: ${emailErrorMsg}`);
          } else {
            showToast("🎉 Registered successfully! Welcome email sent.");
          }
          setPage(redirectPath || "home");
        }
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "❌ Something went wrong. Please check backend.";
      showToast(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        paddingTop: 120,
        minHeight: "100vh",
        background: "var(--ivory)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 60,
      }}
    >
      <div
        className="card-hover henna-bg"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "white",
          border: "1px solid var(--border)",
          padding: "40px 32px",
          textAlign: "center",
          animation: "fadeUp 0.6s ease",
          position: "relative",
          margin: "0 20px",
        }}
      >
        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            color: "var(--copper)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </div>
        <h2
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "2.4rem",
            color: "var(--brown)",
            marginBottom: 12,
          }}
        >
          {isLogin ? "Login" : "Register"}
        </h2>
        <OrnaDivider />

        <form onSubmit={handleSubmit} style={{ marginTop: 32, textAlign: "left" }}>
          {!isLogin && (
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--brown)",
                  marginBottom: 8,
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Priya Sharma"
                className="form-input"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brown)",
                marginBottom: 8,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="priya@example.com"
              className="form-input"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--brown)",
                  marginBottom: 8,
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="9876543210"
                className="form-input"
                value={form.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  updateForm("phone", val);
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brown)",
                marginBottom: 8,
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="form-input"
              value={form.password}
              onChange={(e) => updateForm("password", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "0.85rem",
              background: "var(--brown)",
              color: "white",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 10,
            }}
          >
            {loading ? "Processing..." : isLogin ? "Login ✦" : "Register ✦"}
          </button>
        </form>

        <div style={{ marginTop: 24, fontSize: "0.8rem", color: "var(--warm-gray)" }}>
          {isLogin ? "New to our studio?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ name: "", email: "", phone: "", password: "" });
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--copper)",
              cursor: "pointer",
              fontWeight: 500,
              textDecoration: "underline",
              padding: "0 4px",
            }}
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
