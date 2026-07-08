export const API_BASE_URL = 
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "https://distinguished-intuition-production-ced3.up.railway.app";
