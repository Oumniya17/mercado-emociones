<!-- Animated Header -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,100:203a43&height=220&section=header&text=Mercado%20Negro%20de%20Emociones&fontSize=35&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=22&pause=1200&color=FF005C&center=true&vCenter=true&width=800&lines=Emotional+volatility+detected.;Balance+under+stress.;Market+instability+increasing.;Proceed+with+caution."/>
</p>

<p align="center">

![CI](https://github.com/Oumniya17/mercado-emociones/actions/workflows/main.yml/badge.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Render](https://img.shields.io/badge/render-online-success)
![MongoDB](https://img.shields.io/badge/mongodb-connected-green)
![License](https://img.shields.io/badge/license-educational-blue)

</p>

<p align="center">
<b>
REST Architecture · MongoDB Persistence · Authentication & Authorization · Automated Testing · OpenAPI Documentation · CI/CD Deployment
</b>
</p>

---

# ⚡ Concept

> What if emotions behaved like financial assets?

> What if happiness had a price?

> What if your mental stability could collapse like a market crash?

**Mercado Negro de Emociones** is a fictional emotional trading system built with a complete fullstack architecture using REST APIs, MongoDB persistence, JWT security, CI/CD automation and cloud deployment.

Every transaction changes balance.<br>
Every purchase carries risk.<br>
Collapse is possible.

---

# 🌍 Live Deployment

## Render Cloud

🔗 https://mercado-emociones.onrender.com

---

# 🧠 System Architecture

Structured following MVC principles:

```txt
backend/

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/

public/

├── css/
├── js/
├── pages/

tests/

├── emotion.test.js
├── user.test.js

.github/

└── workflows/
    └── main.yml

openapi.yaml
README.md
````

---

# 🧩 Core Entities

* 👤 User
* 💜 Emotion
* 💳 Transaction

Relationships implemented using:

* `ObjectId`
* `populate()`
* relational references

---

# 🔐 Authentication & Authorization

The platform includes a complete security layer.

## JWT Authentication

* User registration
* Secure login
* Password hashing with bcrypt
* Token-based authentication
* Refresh token system

## Role-Based Authorization (RBAC)

Roles:

* `user`
* `admin`

Protected routes:

* authentication middleware
* admin-only middleware
* restricted CRUD operations

## Admin Features

Only admins can:

* access admin panel
* create users
* edit users
* delete users

Frontend and backend protections are both enforced.

---

# ⚙️ Engine Overview

◉ CRUD Infrastructure<br>
◉ Validation & Constraint Layer<br>
◉ Middleware Safeguards<br>
◉ Balance Enforcement Logic<br>
◉ Dynamic Pricing Engine<br>
◉ Emotional Trading Simulation<br>
◉ Analytics Dashboard<br>
◉ Market Statistics<br>
◉ Automated Seed Initialization<br>
◉ JWT Authentication System<br>
◉ RBAC Authorization System<br>
◉ CI/CD Automation

---

# 📊 Frontend Features

The project includes a complete frontend interface:

* Login system
* Registration system
* Dashboard analytics
* Emotional marketplace
* Transactions panel
* Admin panel
* Role-based navigation
* Responsive cyberpunk UI

---

# 🧪 Automated Testing

The system includes automated tests using:

* Mocha
* Chai
* NYC Coverage

Tests validate both positive and negative scenarios.

## Covered Areas

◉ User model validation<br>
◉ Emotion model validation<br>
◉ Required fields<br>
◉ Default values<br>
◉ Enum restrictions<br>
◉ Validation failures<br>
◉ Negative test cases

Run tests:

```bash
npm test
```

Coverage is automatically calculated during CI/CD execution.

---

# ⚙️ CI/CD Pipeline

GitHub Actions automatically:

* installs dependencies
* executes automated tests
* validates the project
* calculates coverage
* integrates with deployment workflow

Workflow file:

```txt
.github/workflows/main.yml
```

---

# 🚀 Cloud Deployment

The application is deployed using:

* Render
* MongoDB Atlas
* GitHub Actions

Deployment includes:

✅ automatic builds<br>
✅ health checks<br>
✅ logging system<br>
✅ cloud hosting<br>
✅ continuous deployment

---

# 🩺 Health Check

Health endpoint:

```txt
GET /api
```

Verifies:

* API availability
* MongoDB connection
* Render deployment status

## Health Check Preview

<img width="2222" height="334" alt="image" src="https://github.com/user-attachments/assets/bd543ec6-b4f1-4024-8f48-c4bbfcd3c0dc" />


---

# 📝 Logs System

Application logs are configured using:

* `morgan`
* Render runtime logs

Logs include:

* API requests
* deployment events
* MongoDB connection
* server activity

## Render Logs Preview

<img width="2806" height="1552" alt="image" src="https://github.com/user-attachments/assets/0d1c4350-ec3f-4ef9-b46c-458106efecb5" />


---

# 📚 API Documentation

The API is documented using the OpenAPI Specification.

Documentation file:

```txt
openapi.yaml
```

Swagger interface:

```txt
http://localhost:3000/api-docs
```

Includes:

* CRUD routes
* request validation
* response examples
* authentication endpoints
* error responses

---

# 📸 Interface Preview

## 🔐 Login System

Cyberpunk authentication interface with JWT login.

<img width="2860" height="1644" alt="login" src="https://github.com/user-attachments/assets/559ef2a5-0152-4e97-8f34-5d504696ed34" />

---

## 📊 Dashboard

Real-time emotional market statistics and analytics.

<img width="2842" height="1634" alt="dashboard" src="https://github.com/user-attachments/assets/0b8cf52e-1e0c-46b9-9ac8-c7528ff98cac" />

---

## 💜 Emotional Market

Interactive emotion trading cards.

<img width="2832" height="1640" alt="market" src="https://github.com/user-attachments/assets/fbef4b00-84bc-4393-8912-b4522f29bce2" />

---

## 👑 Admin Panel

Infrastructure monitoring and system management.

<img width="2824" height="1628" alt="admin" src="https://github.com/user-attachments/assets/edbad3c3-3215-4540-b0c3-e316b8756218" />

---

# ⚡ Run Locally

## Install dependencies

```bash
npm install
```

## Seed database

```bash
npm run seed
```

## Start development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# 🩺 System Integrity

◉ Models Deployed<br>
◉ Constraints Enforced<br>
◉ Relations Linked<br>
◉ Endpoints Responsive<br>
◉ Middleware Guarding<br>
◉ Authentication Active<br>
◉ Authorization Active<br>
◉ CI/CD Operational<br>
◉ Cloud Deployment Stable

────────────

STATUS: STABLE

---

# 🌓 Philosophy

> Systems reflect human behavior.<br>
> Markets reflect instability.<br>
> Emotions reflect both.

This project explores backend architecture through narrative-driven system design.

A technical structure.<br>
With psychological consequences.

---

# 👩‍💻 **Quién Está Detrás del Código**

<p align="center">
  <img src="https://github.com/user-attachments/assets/d549c019-35bb-4af8-8e61-8d6885c6cd9b" width="200">
</p>

**Oumniya — Developer & Designer**<br>
GitHub: [https://github.com/Oumniya17](https://github.com/Oumniya17)

<p align="center">
  <i>Balance defines survival.</i>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:203a43,100:0f2027&height=120&section=footer"/>
</p>






