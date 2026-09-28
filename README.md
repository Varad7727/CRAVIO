# 🍔 CRAVIO

**CRAVIO** is a MERN-based food discovery platform where users can explore restaurant food reels, discover dishes, and view food menus through a modern social-media-style experience.

The project is built using **React.js, Node.js, Express.js, and MongoDB**, with plans to integrate **Generative AI** for personalized food discovery and recommendations.

---

## 🚀 Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Secure cookie-based authentication
* Explore food content
* View food details
* Browse restaurant/food-partner menus
* Discover dishes through food reels

### 🏪 Food Partner Features

* Food partner registration and login
* Create food items
* Upload food-related videos
* Add food name and description
* Manage restaurant/food-partner content
* Display food items on the platform

### 🔐 Authentication

CRAVIO uses:

* Node.js + Express.js
* JWT authentication
* HTTP cookies
* MongoDB
* Protected API routes

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* UUID

### Architecture

```text
Frontend
   │
   │ Axios / REST API
   ▼
Backend (Express.js)
   │
   ├── Authentication
   ├── User APIs
   ├── Food APIs
   └── Food Partner APIs
   │
   ▼
MongoDB
```

---

# 📁 Project Structure

```text
CRAVIO/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── service/
│   ├── db/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

> The exact internal folders may evolve as new features are added.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Varad7727/CRAVIO.git
```

Move into the project:

```bash
cd CRAVIO
```

---

# 🔧 Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory if your backend configuration requires environment variables.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Do not upload your actual `.env` file to GitHub.**

Start the backend:

```bash
npm start
```

If your backend uses a development script:

```bash
npm run dev
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will display the local URL provided by the development server.

---

# ▶️ Running the Complete Project

You need **two terminals**.

### Terminal 1 — Backend

```bash
cd CRAVIO/backend
npm install
npm start
```

### Terminal 2 — Frontend

```bash
cd CRAVIO/frontend
npm install
npm run dev
```

Then open the frontend URL shown in the terminal.

---

# 🔑 Environment Variables

Environment variables contain sensitive configuration such as database credentials and authentication secrets.

Never commit:

```text
.env
```

The repository includes a `.gitignore` to prevent environment files and `node_modules` from being uploaded.

For a new developer setup:

```text
backend/
└── .env
```

Add the required variables according to the backend configuration.

---

# 🔄 Development Workflow

After making changes:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe your changes"
```

Push:

```bash
git push
```

To get the latest changes:

```bash
git pull
```

---

# 🧪 API Development

The backend follows a REST API architecture.

Typical flow:

```text
React Frontend
      │
      │ Axios
      ▼
Express Route
      │
      ▼
Controller
      │
      ▼
Mongoose Model
      │
      ▼
MongoDB
```

Authentication-protected requests use the user's authentication credentials/cookies.

---

# 🤖 Future GenAI Features

CRAVIO is planned to evolve beyond a basic food discovery platform by adding Generative AI capabilities.

Potential features include:

* 🍕 Personalized food recommendations
* 🧠 AI-based preference learning
* 🔎 Natural-language food search
* 💬 AI food discovery assistant
* 📍 Context-aware restaurant recommendations
* 🍽️ "What should I eat?" recommendations
* 📝 AI-generated food descriptions
* 🎯 Personalized food feed
* 📊 User taste-profile generation

The goal is to combine a strong **MERN application architecture** with practical **GenAI functionality**.

---

# 🔮 Planned Features

* ❤️ Like / Unlike food items
* 💬 Comments
* 🔖 Save food items
* 👤 User profiles
* ⭐ Ratings and reviews
* 🔍 Advanced food search
* 🏪 Restaurant/food-partner profiles
* 📍 Location-based discovery
* 🤖 AI-powered recommendations
* 🧠 Personalized feed
* 🔔 Notifications

---

# 🔒 Security

The project uses:

* JWT authentication
* HTTP cookies
* Protected routes
* Environment variables for secrets
* MongoDB authentication

Never expose:

* MongoDB credentials
* JWT secrets
* API keys
* Private tokens

---

# 👨‍💻 Author

**Varad Milind Sonavadekar**

GitHub:
https://github.com/Varad7727

---

# 📌 Project Status

🚧 **Currently under development**

CRAVIO is actively being developed as a full-stack MERN project with planned GenAI integration.

---

## ⭐ Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

## 📄 License

This project is currently intended for educational and development purposes.
