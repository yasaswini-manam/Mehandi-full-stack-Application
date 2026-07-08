import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Helper to load Leaflet dynamically from CDN
const loadLeaflet = () => {
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.body.appendChild(script);
  });
};

const LocationModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualForm, setManualForm] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Load Leaflet and initialize map
    loadLeaflet()
      .then((L) => {
        setMapLoaded(true);
        
        // Default coordinates: Guntur/Andhra Pradesh (approx center)
        const defaultLat = 16.3067;
        const defaultLng = 80.4365;

        // Initialize Map
        if (mapContainerRef.current && !mapInstanceRef.current) {
          const map = L.map(mapContainerRef.current).setView([defaultLat, defaultLng], 12);
          mapInstanceRef.current = map;

          // Add OSM tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          }).addTo(map);

          // Add default draggable marker
          const marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map);
          markerRef.current = marker;

          // Handle marker drag end
          marker.on("dragend", async () => {
            const position = marker.getLatLng();
            await reverseGeocode(position.lat, position.lng);
          });

          // Handle map click
          map.on("click", async (e) => {
            marker.setLatLng(e.latlng);
            await reverseGeocode(e.latlng.lat, e.latlng.lng);
          });

          // Perform initial geocode for default coords
          reverseGeocode(defaultLat, defaultLng);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      // Clean up map instance on close
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen]);

  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      if (response.data) {
        const addr = response.data.address || {};
        const road = addr.road || addr.suburb || addr.neighbourhood || "";
        const city = addr.city || addr.town || addr.village || addr.county || "";
        const state = addr.state || "";
        const pincode = addr.postcode || "";

        setManualForm({
          addressLine: response.data.display_name || "",
          city: city,
          state: state,
          pincode: pincode,
        });

        // Pan map to selection
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([lat, lng]);
        }
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    } finally {
      setLoading(false);
    }
  };

  const detectLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (window.L && mapInstanceRef.current && markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
          mapInstanceRef.current.setView([latitude, longitude], 15);
        }
        await reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error(error);
        alert("Failed to get your live location. Please select it on the map or fill it manually.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.pincode) {
      alert("Pincode is required!");
      return;
    }
    
    // Construct final formatted address
    const finalAddress = {
      raw: manualForm.addressLine || `${manualForm.city}, ${manualForm.state} - ${manualForm.pincode}`,
      city: manualForm.city,
      state: manualForm.state,
      pincode: manualForm.pincode,
    };

    onSelectLocation(finalAddress);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(61,31,14,0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        animation: "fadeIn 0.2s ease-in-out",
      }}
    >
      <div
        style={{
          background: "white",
          width: "90%",
          maxWidth: 680,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 8,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "1.5rem",
              color: "var(--brown)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Select Delivery Location
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.4rem",
              cursor: "pointer",
              color: "var(--warm-gray)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px 24px" }}>
          
          {/* Detect Location Button */}
          <button
            type="button"
            onClick={detectLiveLocation}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 20px",
              background: "var(--copper)",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "Josefin Sans",
              fontSize: "0.82rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 16,
              boxShadow: "0 4px 12px rgba(181,98,42,0.2)",
            }}
          >
            📍 {loading ? "Locating..." : "Detect Live Location / Check Map"}
          </button>

          {/* Map Area */}
          <div
            ref={mapContainerRef}
            style={{
              height: 250,
              width: "100%",
              background: "var(--cream)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              marginBottom: 20,
              position: "relative",
              zIndex: 1,
            }}
          >
            {!mapLoaded && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--warm-gray)",
                  fontSize: "0.85rem",
                }}
              >
                Loading interactive map...
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--brown)",
                  marginBottom: 6,
                  fontWeight: 500,
                }}
              >
                Pincode / Postcode
              </label>
              <input
                type="text"
                required
                placeholder="522007"
                value={manualForm.pincode}
                onChange={(e) => setManualForm({ ...manualForm, pincode: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  fontSize: "0.85rem",
                  fontFamily: "Josefin Sans",
                  color: "var(--deep)",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--brown)",
                    marginBottom: 6,
                    fontWeight: 500,
                  }}
                >
                  City / Town
                </label>
                <input
                  type="text"
                  required
                  placeholder="Guntur"
                  value={manualForm.city}
                  onChange={(e) => setManualForm({ ...manualForm, city: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    fontSize: "0.85rem",
                    fontFamily: "Josefin Sans",
                    color: "var(--deep)",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--brown)",
                    marginBottom: 6,
                    fontWeight: 500,
                  }}
                >
                  State
                </label>
                <input
                  type="text"
                  required
                  placeholder="Andhra Pradesh"
                  value={manualForm.state}
                  onChange={(e) => setManualForm({ ...manualForm, state: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    fontSize: "0.85rem",
                    fontFamily: "Josefin Sans",
                    color: "var(--deep)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--brown)",
                  marginBottom: 6,
                  fontWeight: 500,
                }}
              >
                Detailed Address / Building / Road / Area
              </label>
              <textarea
                required
                rows={2}
                placeholder="Building Name, Vikas Nagar, Guntur..."
                value={manualForm.addressLine}
                onChange={(e) => setManualForm({ ...manualForm, addressLine: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  fontSize: "0.85rem",
                  fontFamily: "Josefin Sans",
                  color: "var(--deep)",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>

            {/* Submit Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 8,
                borderTop: "1px solid var(--border)",
                paddingTop: 16,
              }}
            >
              <button
                type="button"
                className="btn-outline"
                onClick={onClose}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: "10px 24px", background: "var(--brown)" }}
              >
                Confirm Address ✦
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
