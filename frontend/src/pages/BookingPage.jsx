import React, { useState } from "react";
import axios from "axios";
import { SERVICES } from "../data/constants";
import { OrnaDivider } from "../components/Shared";
import henna from "../assets/henna.jpg";
import makeupImg from "../assets/makeup1.jpg";
import sareImg from "../assets/sd2.jpg";
import nailImg from "../assets/na.jpg";
import spImg from "../assets/sp.jpg";

const BookingPage = ({ selectedService, setSelectedService, showToast }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    service: selectedService || null,
    date: "",
    timeSlot: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    address: "",
  });
  const [booked, setBooked] = useState(false);

  const getServiceImage = (svc) => {
    if (!svc) return henna;

    if (svc.name === "Saree Draping" || svc.slug === "saree-draping")
      return sareImg;
    if (svc.name === "Saree Pre-Plating" || svc.slug === "pre-plating")
      return spImg;
    if (svc.name === "Makeup Application") return makeupImg;
    if (svc.name === "Nail Art") return nailImg;

    // 2. Fallback to category if name doesn't match
    switch (svc.category) {
      case "henna":
        return henna;
      case "makeup":
        return makeupImg;
      case "nails":
        return nailImg;
      case "beauty":
        return makeupImg; // Or a general beauty image
      default:
        return henna;
    }
  };

  const updateForm = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    const orderData = {
      shipping_address: form.address || "No Address Provided",
      totalAmount: form.service?.price || 0,
      bookings: [
        {
          service_id: form.service?.id || 1,
          booking_date: form.date,
          time_slot: form.timeSlot,
          customer_name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders",
        orderData,
      );
      if (response.status === 200 || response.status === 201) {
        setBooked(true);
        showToast("🎉 Booking confirmed! See you soon.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "❌ Failed to save. Check backend console.";
      showToast(errorMessage);
      setBooked(false);
    } finally {
      setLoading(false);
    }
  };

  if (booked)
    return (
      <div
        style={{
          paddingTop: 100,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ivory)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: 60,
            animation: "fadeUp 0.6s ease",
          }}
        >
          <img
            src={getServiceImage(form.service)}
            alt="Success"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 24,
              border: "3px solid var(--gold)",
            }}
          />
          <h2
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "2.5rem",
              color: "var(--brown)",
              marginBottom: 16,
            }}
          >
            Booking Confirmed!
          </h2>
          <OrnaDivider />
          <div
            style={{
              marginTop: 32,
              background: "white",
              border: "1px solid var(--border)",
              padding: "32px 48px",
              maxWidth: 460,
              margin: "32px auto 0",
            }}
          >
            {[
              ["Service", form.service?.name],
              ["Date", form.date],
              ["Time", form.timeSlot],
              ["Name", form.name],
              ["Contact", form.phone],
            ].map(
              ([k, v]) =>
                v && (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: "0.82rem",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--warm-gray)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {k}
                    </span>
                    <span style={{ color: "var(--brown)", fontWeight: 400 }}>
                      {v}
                    </span>
                  </div>
                ),
            )}
          </div>
          <button
            className="btn-outline"
            style={{ marginTop: 32 }}
            onClick={() => {
              setBooked(false);
              setStep(1);
              setForm({
                service: null,
                date: "",
                timeSlot: "",
                name: "",
                email: "",
                phone: "",
                notes: "",
              });
              setSelectedService(null);
            }}
          >
            Book Another
          </button>
        </div>
      </div>
    );

  return (
    <div
      style={{
        paddingTop: 100,
        minHeight: "100vh",
        background: "var(--ivory)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "60px 40px 40px",
          background:
            "linear-gradient(180deg, var(--cream) 0%, var(--ivory) 100%)",
        }}
      >
        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            color: "var(--copper)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Reserve Your Slot
        </div>
        <h1
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400,
            color: "var(--brown)",
          }}
        >
          Book an{" "}
          <em style={{ fontStyle: "italic", color: "var(--copper)" }}>
            Appointment
          </em>
        </h1>
        <OrnaDivider />
      </div>

      {/* STEP INDICATOR */}
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          gap: 0,
        }}
      >
        {["Choose Service", "Date & Time", "Your Details"].map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {i < 2 && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: "50%",
                  right: "-50%",
                  height: 1,
                  background: step > i + 1 ? "var(--copper)" : "var(--border)",
                  zIndex: 0,
                }}
              />
            )}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  step > i + 1
                    ? "var(--copper)"
                    : step === i + 1
                      ? "var(--brown)"
                      : "white",
                border: `1px solid ${step >= i + 1 ? "var(--copper)" : "var(--border)"}`,
                color: step >= i + 1 ? "white" : "var(--warm-gray)",
                fontSize: "0.75rem",
                zIndex: 1,
                position: "relative",
                transition: "all 0.3s",
              }}
            >
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <div
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: step === i + 1 ? "var(--copper)" : "var(--warm-gray)",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {s}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ maxWidth: 800, margin: "40px auto", padding: "0 40px 80px" }}
      >
        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <h3
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "1.6rem",
                color: "var(--brown)",
                marginBottom: 24,
              }}
            >
              Select a Service
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {SERVICES.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => updateForm("service", svc)}
                  style={{
                    background:
                      form.service?.id === svc.id ? "var(--brown)" : "white",
                    border: `1px solid ${form.service?.id === svc.id ? "var(--brown)" : "var(--border)"}`,
                    padding: "24px 20px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  <img
                    src={getServiceImage(svc)}
                    alt={svc.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: 12,
                      border:
                        form.service?.id === svc.id
                          ? "2px solid white"
                          : "1px solid var(--border)",
                    }}
                  />
                  <h4
                    style={{
                      fontFamily: "Cormorant Garamond",
                      fontSize: "1.15rem",
                      color:
                        form.service?.id === svc.id ? "white" : "var(--brown)",
                      marginBottom: 4,
                    }}
                  >
                    {svc.name}
                  </h4>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color:
                        form.service?.id === svc.id
                          ? "rgba(249,244,238,0.7)"
                          : "var(--warm-gray)",
                      marginBottom: 12,
                    }}
                  >
                    {svc.duration} min
                  </div>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond",
                      fontSize: "1.1rem",
                      color:
                        form.service?.id === svc.id
                          ? "var(--gold)"
                          : "var(--copper)",
                    }}
                  >
                    ₹{svc.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 32,
              }}
            >
              <button
                className="btn-primary"
                disabled={!form.service}
                onClick={() => setStep(2)}
                style={{ opacity: form.service ? 1 : 0.5 }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME */}
        {step === 2 && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <h3
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "1.6rem",
                color: "var(--brown)",
                marginBottom: 24,
              }}
            >
              Choose Date & Time
            </h3>

            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--brown)",
                  marginBottom: 10,
                }}
              >
                Select Date
              </label>

              <input
                type="date"
                className="form-input"
                min={new Date().toLocaleDateString("en-CA")}
                value={form.date}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const todayStr = new Date().toLocaleDateString("en-CA");

                  if (!selectedDate || selectedDate >= todayStr) {
                    updateForm("date", selectedDate);
                  } else {
                    alert("Please select a future date.");
                    updateForm("date", "");
                  }
                }}
                style={{ maxWidth: 280 }}
              />
            </div>

            {form.date && (
              <div style={{ animation: "fadeUp 0.3s ease" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--brown)",
                    marginBottom: 12,
                  }}
                >
                  Available Slots
                </label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {(form.service?.timeSlots || []).map((slot) => (
                    <div
                      key={slot}
                      onClick={() => updateForm("timeSlot", slot)}
                      style={{
                        padding: "10px 18px",
                        cursor: "pointer",
                        background:
                          form.timeSlot === slot ? "var(--brown)" : "white",
                        border: `1px solid ${form.timeSlot === slot ? "var(--brown)" : "var(--border)"}`,
                        color:
                          form.timeSlot === slot ? "white" : "var(--brown)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "flex-end",
                marginTop: 40,
              }}
            >
              <button className="btn-outline" onClick={() => setStep(1)}>
                ← Back
              </button>

              <button
                className="btn-primary"
                disabled={!form.date || !form.timeSlot}
                onClick={() => setStep(3)}
                style={{ opacity: form.date && form.timeSlot ? 1 : 0.5 }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: USER DETAILS */}
        {step === 3 && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <h3
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "1.6rem",
                color: "var(--brown)",
                marginBottom: 24,
              }}
            >
              Your Details
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginBottom: 20,
              }}
            >
              {[
                {
                  key: "name",
                  label: "Full Name",
                  placeholder: "Priya Sharma",
                  type: "text",
                },
                {
                  key: "phone",
                  label: "Phone Number",
                  placeholder: "+91 98765 43210",
                  type: "tel",
                },
                {
                  key: "email",
                  label: "Email Address",
                  placeholder: "priya@example.com",
                  type: "email",
                  full: true,
                },
              ].map((field) => {
                const value = form[field.key];
                const isEmailInvalid =
                  field.key === "email" &&
                  value &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

                const isPhoneInvalid =
                  field.key === "phone" && value && !/^[6-9]\d{9}$/.test(value);

                return (
                  <div
                    key={field.key}
                    style={{ gridColumn: field.full ? "1/-1" : "auto" }}
                  >
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
                      {field.label}
                    </label>

                    <input
                      type={field.type}
                      className="form-input"
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(e) => {
                        let inputValue = e.target.value;
                        if (field.key === "phone") {
                          inputValue = inputValue
                            .replace(/\D/g, "")
                            .slice(0, 10);
                        }

                        updateForm(field.key, inputValue);
                      }}
                      style={{
                        border:
                          isEmailInvalid || isPhoneInvalid
                            ? "1px solid red"
                            : undefined,
                      }}
                    />
                    {isEmailInvalid && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "0.7rem",
                          marginTop: 4,
                        }}
                      >
                        Enter a valid email
                      </div>
                    )}

                    {isPhoneInvalid && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "0.7rem",
                          marginTop: 4,
                        }}
                      >
                        Enter valid 10-digit phone number
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "flex-end",
                marginTop: 8,
              }}
            >
              <button className="btn-outline" onClick={() => setStep(2)}>
                ← Back
              </button>

              <button
                className="btn-primary"
                disabled={
                  !form.name ||
                  !form.email ||
                  !form.phone ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
                  !/^[6-9]\d{9}$/.test(form.phone) ||
                  loading
                }
                onClick={handleSubmit}
                style={{
                  opacity:
                    form.name &&
                    form.email &&
                    form.phone &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
                    /^[6-9]\d{9}$/.test(form.phone) &&
                    !loading
                      ? 1
                      : 0.5,
                }}
              >
                {loading ? "Processing..." : "Confirm Booking ✦"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
