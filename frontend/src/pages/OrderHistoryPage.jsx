import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrnaDivider } from "../components/Shared";
import { SERVICES } from "../data/constants";
import { API_BASE_URL } from "../config";

// Import Product Images
import conesImg from '../assets/12cones.jpg';
import bookImg from '../assets/book.jpg';
import powderImg from '../assets/hennapowder.jpg';
import brushImg from '../assets/brushset.jpg';
import pinsImg from '../assets/safetypins.jpg';
import sprayImg from '../assets/spray.jpg';
import nailKitImg from '../assets/nailartkit.jpg';
import oilImg from '../assets/hennaoil.jpg';

// Import Service Images
import hennaImg from '../assets/henna.jpg';
import makeupImg from '../assets/makeup1.jpg';
import sareImg from '../assets/sd2.jpg';
import nailImg from '../assets/na.jpg';
import spImg from '../assets/sp.jpg';

const OrderHistoryPage = ({ currentUser, setPage, showToast }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // "all" | "products" | "bookings"

  // Interactive UI State
  const [expandedDetails, setExpandedDetails] = useState({}); // orderId -> bool
  const [ratings, setRatings] = useState({}); // uniqueKey -> number (1-5)
  const [hoveredRatings, setHoveredRatings] = useState({}); // uniqueKey -> number
  const [showFeedbackInput, setShowFeedbackInput] = useState({}); // uniqueKey -> bool
  const [feedbackText, setFeedbackText] = useState({}); // uniqueKey -> string
  const [submittedFeedback, setSubmittedFeedback] = useState({}); // uniqueKey -> bool

  useEffect(() => {
    if (!currentUser) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/orders/user/${currentUser.email}`
        );
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to load order history", err);
        showToast("❌ Could not load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, showToast]);

  const toggleDetails = (orderId) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getProductImage = (item) => {
    const name = item.name ? item.name.toLowerCase() : "";
    if (name.includes("cone")) return conesImg;
    if (name.includes("book")) return bookImg;
    if (name.includes("powder")) return powderImg;
    if (name.includes("brush")) return brushImg;
    if (name.includes("pin")) return pinsImg;
    if (name.includes("spray") || name.includes("fixer")) return sprayImg;
    if (name.includes("nail")) return nailKitImg;
    if (name.includes("oil")) return oilImg;
    return conesImg; // fallback
  };

  const getServiceImage = (serviceId) => {
    switch (parseInt(serviceId)) {
      case 1: return hennaImg;
      case 2: return makeupImg;
      case 3: return sareImg;
      case 4: return nailImg;
      case 5: return spImg;
      default: return hennaImg;
    }
  };

  const getServiceName = (serviceId) => {
    const svc = SERVICES.find((s) => s.id === serviceId);
    return svc ? svc.name : `Service #${serviceId}`;
  };

  const submitFeedback = (uniqueKey) => {
    if (!feedbackText[uniqueKey]?.trim()) return;
    setSubmittedFeedback(prev => ({ ...prev, [uniqueKey]: true }));
    setShowFeedbackInput(prev => ({ ...prev, [uniqueKey]: false }));
    showToast("💖 Thank you for sharing your feedback!");
  };

  // Process and flatten orders into list items
  const getFilteredItems = () => {
    const items = [];

    orders.forEach((order) => {
      const isBooking = order.bookings && order.bookings.length > 0;
      
      if (isBooking) {
        // Handle Booking Items
        order.bookings.forEach((booking, idx) => {
          items.push({
            id: `booking-${order.id}-${idx}`,
            orderId: order.id,
            type: "booking",
            title: getServiceName(booking.service_id),
            status: "Booking Confirmed",
            dateText: `Appointment on ${booking.booking_date}`,
            specs: `Time Slot: ${booking.time_slot} · Customer: ${booking.customer_name}`,
            image: getServiceImage(booking.service_id),
            price: order.totalAmount || order.total_amount || 0,
            originalOrder: order,
            bookingDetails: booking
          });
        });
      } else {
        // Handle Product Items
        let parsedItems = [];
        if (order.items) {
          try {
            parsedItems = JSON.parse(order.items);
          } catch (e) {
            console.error(e);
          }
        }

        if (parsedItems.length > 0) {
          parsedItems.forEach((product, idx) => {
            items.push({
              id: `product-${order.id}-${idx}`,
              orderId: order.id,
              type: "product",
              title: product.name,
              status: "Delivered Early",
              dateText: `Order Placed successfully`,
              specs: `Qty: ${product.qty} · Size: Standard`,
              image: getProductImage(product),
              price: product.price * product.qty,
              originalOrder: order,
              productDetails: product
            });
          });
        } else {
          // Fallback legacy orders
          items.push({
            id: `legacy-${order.id}`,
            orderId: order.id,
            type: "product",
            title: "Studio Product Package",
            status: "Delivered",
            dateText: `Order placed successfully`,
            specs: `Qty: 1 · Details: Standard Bundle`,
            image: conesImg,
            price: order.totalAmount || order.total_amount || 0,
            originalOrder: order,
          });
        }
      }
    });

    // Filter by type
    let result = items;
    if (filterType === "products") {
      result = items.filter(i => i.type === "product");
    } else if (filterType === "bookings") {
      result = items.filter(i => i.type === "booking");
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        i => i.title.toLowerCase().includes(q) || 
             i.status.toLowerCase().includes(q) || 
             i.orderId.toString().includes(q)
      );
    }

    return result;
  };

  const filteredItems = getFilteredItems();

  return (
    <div
      style={{
        paddingTop: 100,
        minHeight: "100vh",
        background: "#F4F0EB", // Soft greyish-cream background typical of modern portals
        paddingBottom: 80,
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          textAlign: "center",
          padding: "50px 40px 30px",
          background: "white",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "var(--copper)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Customer Dashboard
        </div>
        <h1
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "2.5rem",
            color: "var(--brown)",
            marginBottom: 8,
          }}
        >
          My Orders
        </h1>
        <OrnaDivider />
      </div>

      <div style={{ maxWidth: 700, margin: "24px auto", padding: "0 16px" }}>
        
        {/* Search & Filters block */}
        <div
          style={{
            display: "flex",
            gap: 12,
            background: "white",
            padding: 16,
            border: "1px solid var(--border)",
            marginBottom: 16,
            borderRadius: 4,
          }}
        >
          {/* Search box */}
          <div style={{ position: "relative", flex: 1 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "52%",
                transform: "translateY(-50%)",
                color: "var(--warm-gray)",
                fontSize: "0.9rem",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search orders by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                background: "#F9F4EE",
                border: "1px solid var(--border)",
                borderRadius: 24,
                fontSize: "0.85rem",
                fontFamily: "Josefin Sans",
                color: "var(--deep)",
                outline: "none",
              }}
            />
          </div>

          {/* Filter dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "0 16px",
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 24,
              fontSize: "0.82rem",
              fontFamily: "Josefin Sans",
              color: "var(--brown)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="all">Filters: All</option>
            <option value="products">Products Only</option>
            <option value="bookings">Appointments Only</option>
          </select>
        </div>

        {/* Orders list */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <div className="loader" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              background: "white",
              border: "1px solid var(--border)",
              padding: "60px 40px",
              borderRadius: 4,
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 20 }}>📜</div>
            <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "1.8rem", color: "var(--brown)", marginBottom: 12 }}>
              No orders matches found
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--warm-gray)", marginBottom: 24 }}>
              Try searching with a different term, or explore our products/services.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn-primary" onClick={() => setPage("booking")}>Book Service</button>
              <button className="btn-outline" onClick={() => setPage("shop")}>Shop Cones</button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredItems.map((item) => {
              const uniqueKey = item.id;
              const isExpanded = !!expandedDetails[item.orderId];
              const userRating = ratings[uniqueKey] || 0;
              const hoverRating = hoveredRatings[uniqueKey] || 0;
              const feedbackTextVal = feedbackText[uniqueKey] || "";
              const showsInput = !!showFeedbackInput[uniqueKey];
              const isDoneFeedback = !!submittedFeedback[uniqueKey];

              return (
                <div
                  key={uniqueKey}
                  style={{
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    transition: "transform 0.2s",
                  }}
                >
                  {/* Card Main Block */}
                  <div
                    style={{
                      display: "flex",
                      padding: 20,
                      gap: 20,
                      position: "relative",
                    }}
                  >
                    {/* Left: Product/Service Image */}
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        flexShrink: 0,
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Middle: Details & Status */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      
                      {/* Status row */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            color: "var(--brown)",
                          }}
                        >
                          {item.status}
                        </span>
                        
                        {item.type === "booking" && (
                          <span
                            style={{
                              fontSize: "0.6rem",
                              background: "rgba(181,98,42,0.1)",
                              color: "var(--copper)",
                              padding: "2px 6px",
                              textTransform: "uppercase",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                            }}
                          >
                            Appointment
                          </span>
                        )}
                      </div>

                      {/* Date & Title */}
                      <div style={{ fontSize: "0.8rem", color: "var(--warm-gray)", marginBottom: 8 }}>
                        {item.dateText}
                      </div>

                      <h4
                        style={{
                          fontFamily: "Cormorant Garamond",
                          fontSize: "1.15rem",
                          color: "var(--brown)",
                          fontWeight: 500,
                          marginBottom: 4,
                        }}
                      >
                        {item.title}
                      </h4>

                      {/* Specifications */}
                      <div style={{ fontSize: "0.78rem", color: "var(--warm-gray)" }}>
                        {item.specs}
                      </div>
                    </div>

                    {/* Right: Price & Expand Chevron */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        paddingLeft: 12,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Cormorant Garamond",
                          fontSize: "1.3rem",
                          color: "var(--brown)",
                          fontWeight: 500,
                        }}
                      >
                        ₹{item.price.toLocaleString()}
                      </div>

                      {/* Chevron to toggle full receipt details */}
                      <div
                        onClick={() => toggleDetails(item.orderId)}
                        style={{
                          cursor: "pointer",
                          padding: 8,
                          marginRight: -8,
                          marginBottom: -8,
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="var(--brown)"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : "rotate(270deg)",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Bottom Panel (Exactly like Meesho screenshot) */}
                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      padding: "12px 20px",
                      background: "#FDFBF7",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Rating message or stars display */}
                      {userRating > 0 ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: "0.8rem", color: "var(--sage)", fontWeight: 500 }}>
                            {userRating === 5 ? "😍 We are happy you liked it!" : "✨ Thank you for your feedback!"}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.78rem", color: "var(--warm-gray)" }}>
                          Rate this {item.type === "booking" ? "service" : "item"}:
                        </span>
                      )}

                      {/* Star Rating Interactive Group */}
                      <div style={{ display: "flex", gap: 4 }}>
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = hoverRating ? star <= hoverRating : star <= userRating;
                          return (
                            <span
                              key={star}
                              onMouseEnter={() => !userRating && setHoveredRatings(p => ({ ...p, [uniqueKey]: star }))}
                              onMouseLeave={() => !userRating && setHoveredRatings(p => ({ ...p, [uniqueKey]: 0 }))}
                              onClick={() => {
                                if (!userRating) {
                                  setRatings(p => ({ ...p, [uniqueKey]: star }));
                                  setShowFeedbackInput(p => ({ ...p, [uniqueKey]: true }));
                                }
                              }}
                              style={{
                                cursor: userRating ? "default" : "pointer",
                                fontSize: "1.2rem",
                                color: active ? "#C8922A" : "#E2D9D2",
                                transition: "color 0.2s",
                              }}
                            >
                              ★
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feedback Form Activator */}
                    {!isDoneFeedback ? (
                      <button
                        onClick={() => setShowFeedbackInput(p => ({ ...p, [uniqueKey]: !showsInput }))}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--copper)",
                          fontFamily: "Josefin Sans",
                          fontSize: "0.78rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontWeight: 500,
                          cursor: "pointer",
                          padding: "4px 8px",
                        }}
                      >
                        {showsInput ? "Cancel" : "Add Feedback"}
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.78rem", color: "var(--warm-gray)", fontStyle: "italic" }}>
                        Feedback submitted
                      </span>
                    )}
                  </div>

                  {/* Feedback text area */}
                  {showsInput && (
                    <div
                      style={{
                        padding: "16px 20px",
                        background: "#F9F6F2",
                        borderTop: "1px solid var(--border)",
                        animation: "fadeIn 0.2s",
                      }}
                    >
                      <textarea
                        rows={2}
                        placeholder="Tell us what you liked or how we can improve..."
                        value={feedbackTextVal}
                        onChange={(e) => setFeedbackText(p => ({ ...p, [uniqueKey]: e.target.value }))}
                        style={{
                          width: "100%",
                          padding: 10,
                          border: "1px solid var(--border)",
                          outline: "none",
                          fontSize: "0.82rem",
                          fontFamily: "Josefin Sans",
                          color: "var(--deep)",
                          resize: "none",
                          marginBottom: 8,
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                          onClick={() => submitFeedback(uniqueKey)}
                          disabled={!feedbackTextVal.trim()}
                          className="btn-primary"
                          style={{
                            padding: "8px 16px",
                            fontSize: "0.7rem",
                            background: "var(--brown)",
                            opacity: feedbackTextVal.trim() ? 1 : 0.5,
                          }}
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Order Details Accordion Receipt (Chevron Expansion) */}
                  {isExpanded && (
                    <div
                      style={{
                        background: "#FAF7F2",
                        padding: 20,
                        borderTop: "1px solid var(--border)",
                        fontSize: "0.82rem",
                        color: "var(--warm-gray)",
                        lineHeight: 1.7,
                        animation: "fadeIn 0.3s",
                      }}
                    >
                      <h5
                        style={{
                          fontFamily: "Cormorant Garamond",
                          fontSize: "1.1rem",
                          color: "var(--brown)",
                          fontWeight: 600,
                          marginBottom: 8,
                          borderBottom: "1px solid var(--border)",
                          paddingBottom: 4,
                        }}
                      >
                        Order Receipt Details
                      </h5>
                      <div>
                        <strong style={{ color: "var(--brown)" }}>Order ID:</strong> #{item.orderId}
                      </div>
                      <div>
                        <strong style={{ color: "var(--brown)" }}>Associated User:</strong> {currentUser.email}
                      </div>
                      <div>
                        <strong style={{ color: "var(--brown)" }}>Payment Method:</strong> Cash on Delivery / Handover
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <strong style={{ color: "var(--brown)" }}>Delivery / Shipping Address:</strong>
                        <div
                          style={{
                            marginTop: 4,
                            background: "white",
                            padding: "8px 12px",
                            border: "1px solid var(--border)",
                            borderLeft: "2px solid var(--copper)",
                            color: "var(--deep)",
                          }}
                        >
                          {item.originalOrder.shippingAddress || item.originalOrder.shipping_address || "No address specified."}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
