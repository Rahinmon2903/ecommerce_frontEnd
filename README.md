# 🛍️ E-Commerce Frontend (React)

This is the **frontend** of a full-stack e-commerce application built with **React**, **Tailwind CSS**, and **Axios**.  
It supports **buyers and sellers**, product browsing, cart, wishlist, checkout, and order management.

---

## 🚀 Tech Stack

- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- React Toastify
- Razorpay (Payments)

---

## ✨ Features

### Buyer
- Register / Login
- Browse products
- Product details & reviews
- Add to cart (live navbar update)
- Wishlist
- Checkout with Razorpay
- Order history

### Seller
- Seller dashboard
- Add products (image upload via Cloudinary)
- View seller orders
- Analytics & stats

### General
- Role-based protected routes
- Toast notifications
- Global page loader
- Responsive UI

---

## 📁 Project Structure

src/
│
├── Components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── PageLoader.jsx
│ └── ProtectedRoute.jsx
│
├── Pages/
│ ├── ProductList.jsx
│ ├── ProductDetails.jsx
│ ├── Cart.jsx
│ ├── Wishlist.jsx
│ ├── CheckOut.jsx
│ ├── MyOrders.jsx
│ ├── SellerDashboard.jsx
│ ├── SellerOrders.jsx
│ └── SellerStats.jsx
│
├── Services/
│ └── api.js
│
├── App.jsx
├── main.jsx
└── index.css


---

## ⚙️ Environment Variables

Create a `.env` file in the **frontend root**:

```env
VITE_API_URL=https://your-backend-url/api

▶️ Run Locally
# install dependencies
npm install

# start development server
npm run dev

🧪 Build for Production
npm run build

🌍 Deployment

Recommended platforms:

Vercel

Netlify

Make sure VITE_API_URL points to the deployed backend.

📌 Notes

Cart & wishlist counts update instantly using browser events

Toast notifications are handled via react-toastify

Payments use Razorpay test/live keys

👨‍💻 Author

Built with ❤️ by Rahin Mon S