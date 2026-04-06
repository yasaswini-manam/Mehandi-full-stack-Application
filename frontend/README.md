Mehandi Artistry Platform: Setup Guide

This project is a full-stack application featuring a React-based frontend and a RESTful API backend. Follow these steps to get your development environment running.

🛠 Prerequisites
Before starting, ensure you have the following installed:

Node.js (v16.0 or higher)

npm or yarn

Java JDK 17+ (If using a Spring Boot backend) or Node.js (for Express)

MySQL or your preferred SQL database

📂 Project Structure
Plaintext
mehandi-project/
├── backend/           # Server-side logic & API (Spring Boot/Node)
└── frontend/          # React + Vite application
    ├── src/
    │   ├── assets/    # Portfolio & Product images (.jpg)
    │   ├── data/      # constants.js (Central data source)
    │   └── pages/     # Component views

    
🚀 Step 1: Backend Configuration
Navigate to the backend folder:

Bash
cd backend
Database Setup:

Create a database named mehandi_db.

Update src/main/resources/application.properties (for Spring Boot) with your database credentials:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/mehandi_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
Run the Server:

The backend must run on http://localhost:8080 for the frontend to connect.

Launch via your IDE or run: ./mvnw spring-boot:run

💻 Step 2: Frontend Configuration
Navigate to the frontend folder:

Bash
cd frontend
Install Dependencies:

Bash
npm install
Asset Verification:
Ensure all required images are present in src/assets/. The application expects the following files:

henna.jpg, makeup1.jpg, sd2.jpg, na.jpg, sp.jpg

12cones.jpg, book.jpg, hennapowder.jpg, brushset.jpg, etc.

Environment Check:
Ensure src/pages/BookingPage.jsx is pointing to the correct API endpoint:

JavaScript
const response = await axios.post("http://localhost:8080/api/orders", orderData);
🏃‍♂️ Step 3: Running the Application
Start the Frontend:

Bash
npm run dev
Access the Site:
Open your browser to the URL provided by Vite (usually http://localhost:5173).

Mehandi by Yasaswini: Art, Beauty, Tradition1.

Project Title :Mehandi by Yasaswini — A Premium Bridal Service & E-commerce Platform.
 
Project Description:A comprehensive full-stack web application designed for professional mehandi artists. The system streamlines the client journey from exploring intricate portfolios to booking time-sensitive appointments and purchasing professional-grade henna supplies. It bridges the gap between traditional artistry and modern digital convenience.

E-commerce Shop: A curated storefront for henna products with category filtering and a persistent shopping cart.Dynamic Shipping: Automated shipping cost calculation (Free shipping on orders above ₹499).

Tech StackFrontend: 
React.js (Vite),
Axios, 
CSS-in-JS
Backend: Java 17, Spring Boot 3.x, Spring Data JPA.
Database: MySQL 8.0.Tools: Maven.

Project Structure:

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

6. Installation / SetupBackend (Spring Boot)Configure application.properties with your MySQL credentials.Ensure a database named mehandi_booking exists.Run the following:Bashcd backend
mvn clean spring-boot:run
Frontend (React)Install dependencies:Bashcd frontend
npm install
Start the development server:Bashnpm run dev
7. API EndpointsMethodEndpointDescriptionGET/api/servicesFetches all available services and their booking status.POST/api/ordersProcesses a cart checkout and creates associated bookings.GET/api/bookingsRetrieves all scheduled appointments.GET/api/productsLoads the inventory for the shop module.