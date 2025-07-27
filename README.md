# 🍽️ RASOI CONNECT HUB

Rasoi Connect Hub is a full-featured platform built to bridge the gap between **food suppliers** and **customers** in a smart and seamless way. It provides a rich dashboard experience, group collaboration features, order management, and real-time analytics — all in one place.

---

## 🚀 Features Overview

### ✅ Customer Panel
- 🔍 **Browse & Order Items** from verified suppliers
- 🛒 **Cart and Checkout System** for easy order processing
- 📦 **Track Orders** (Pending / Accepted / Declined / Completed)
- 💬 **Join Group Chats** with suppliers and fellow users
- 📝 **Leave Reviews** and feedback for orders

### ✅ Supplier Dashboard
- ➕ **Add New Items** with name, price, stock, description
- 📦 **Update Stock** dynamically
- 📊 **View Analytics** with sales charts, active orders, and top items
- 👥 **Create / Join Groups** for community collaboration
- ✅ **Accept or Decline Orders** with real-time status update
- 📝 **View Reviews** left by customers

### ✅ Shared Features
- 📁 **View Documentation** section for self-help and onboarding
- 🐞 **Report an Issue** to raise bugs or suggest improvements
- 📞 **Contact Section** with email support, links, and social presence
- 📚 **About Section** outlining the mission and benefits of the platform

---

## 📸 UI Screenshots

> Coming soon — UI screenshots of the Supplier Dashboard, Order Views, Group Chat, and Analytics.

---

## 📦 Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | React + TypeScript (.tsx), Tailwind CSS |
| **State Management** | useState, useEffect (local state), context (optional) |
| **Routing** | React Router |
| **Backend (Future)** | Node.js, Express, MongoDB / Firebase |
| **Styling** | Tailwind CSS + custom components |
| **Optional Tools** | Chart.js / Recharts, EmailJS, Toastify for notifications |

---

## 📁 Folder Structure

rasoi-connect-hub/
├── public/
├── src/
│ ├── components/
│ │ ├── SupplierDashboard/
│ │ ├── CustomerPanel/
│ │ ├── GroupChat/
│ │ ├── Analytics/
│ │ ├── Orders/
│ │ ├── Reviews/
│ │ └── Common/
│ ├── pages/
│ ├── assets/
│ └── App.tsx
├── README.md
└── package.json

pgsql
Copy
Edit

---

## 📖 Key Sections Breakdown

### 🧾 View All Orders
- Displays all customer orders
- Accept or decline directly from UI
- Sort, filter, and view details
- Responsive for mobile/tablet

### 💬 Group Chat
- Join or create groups
- Real-time interaction interface (chat logic planned)
- Group collaboration across suppliers and users

### 📈 Analytics & Charts
- View key metrics: total sales, top items, revenue trends
- Dynamic chart components (bar, line, pie)
- Filter by day/week/month

### 🧪 Add Item / Update Stock
- Easy form-based input
- Responsive validations and status alerts
- Image preview, dropdowns, and custom fields

### 🧾 Reviews
- View feedback for each order
- Display customer ratings, comments
- Moderation system (optional)

### 📖 Documentation Viewer
- Browse help topics
- Step-by-step tutorials, FAQs, PDF downloads
- Embedded videos and markdown guide (optional)

### 🐛 Report an Issue
- Submit issue form with category and screenshot
- Sent to backend/email for tracking
- Toast confirmation on successful submit

### 📄 About & Contact
- About section with platform benefits
- Contact form for user support
- Social media or email links

---

## 🧑‍💻 How to Run Locally


# Terminal 1 - Backend
cd rasoi-connect-hub-main/backend                                                                                                                                            
pip install -r requirements.txt                                                                                                                                              
python app.py

# Terminal 2 - Frontend  
cd rasoi-connect-hub-main                                                                                                                                                    
npm install                                                                                                                                                                  
npm run dev


```bash
# 1. Clone the repo
git clone https://github.com/divyaYelmakanne/rasoi-connect-hub.git

# 2. Move to project folder
cd rasoi-connect-hub

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
Make sure you have Node.js v18+ installed.

🌐 Deployment (Optional)
This app can be deployed on:

Vercel

Netlify

Render

Firebase Hosting

Add .env files if connecting to a backend or external API.

🤝 Contributing
Contributions, suggestions, and improvements are welcome! Open an issue or fork the repo and create a pull request.

📬 Contact
If you face any issues, reach out via:

📧 Email: divyayelmakanne@gmail.com

💼 GitHub: @divyaYelmakanne

📃 License
This project is licensed under the MIT License.

Made with ❤️ by Divya Yelmakanne
