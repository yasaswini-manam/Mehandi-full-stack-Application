# Mehandi by Yasaswini: Art, Beauty, Tradition

1. ** Project Title **:Mehandi by Yasaswini — A Premium Bridal Service & E-commerce Platform.
This project is a full-stack application featuring a React-based frontend and a RESTful API backend. Follow these steps to get your development environment running.
 
2. **Project Description**:A comprehensive full-stack web application designed for professional mehandi artists. The system streamlines the client journey from exploring intricate portfolios to booking time-sensitive appointments and purchasing professional-grade henna supplies. It bridges the gap between traditional artistry and modern digital convenience.
E-commerce Shop: A curated storefront for henna products with category filtering and a persistent shopping cart.Dynamic Shipping: Automated shipping cost calculation (Free shipping on orders above ₹499).

3. **Tech Stack:**
Frontend: React.js (Vite),Axios, CSS-in-JS
Backend: Java 17, Spring Boot 3.x, Spring Data JPA.
Database: MySQL 8.0.Tools: Maven.

4. **Project Structure:**

mehandi-yasaswini/
├── frontend/ (React + Vite)
│    ├── src/
│    │    ├── assets/       # Portfolio & Product Images
│    │    ├── components/   # Shared UI (Navbar, Toast, Divider)
│    │    ├── pages/        # View Modules (Home, Shop, Booking)
│    │    └── data/         # constants.js (Central Data Source)
│
|└── backend/ (Spring Boot)
|     ├── controller/        # REST API Endpoints
|     ├── service/           # Business & Capacity Logic
|     ├── repository/        # Database Query Interfaces
|     └── entity/            # Database Models (Order, Booking, Service)
|
|____Database
        |__mehandi_booking.sql

5. **.Installation **
    ### Backend
    1. Ensure MySQL is running with a database named `mehandi_booking`.
    2. Update `src/main/resources/application.properties` with your credentials.
    3. Run: `mvn spring-boot:run`

    The backend must run on http://localhost:8080 for the frontend to connect.

    ### Frontend
    1. Navigate to the folder: `cd frontend`
    2. Install dependencies: `npm install`
    3. Start the app: `npm run dev`

  Open your browser to the URL provided by Vite (usually http://localhost:5173)

6. **API Endpoints:**
MethodEndpointDescription :
GET :/api/orders Fetches all orders.
POST :/api/orders  Processes a cart checkout and creates associated bookings.
GET :/api/bookings Retrieves all scheduled appointments.
POST :/api/bookings Loads the inventory for the shop module.

7. **Future Improvements**
Payment Gateway: Integration of Razorpay or Stripe for secure online transactions.
WhatsApp Integration: Automated booking confirmations sent directly to the client's phone.
Admin Dashboard: A private portal for the artist to manage inventory and view daily schedules.
Artist Portfolio: A dedicated gallery for uploading high-resolution client work.

8. **Output screenshots**



