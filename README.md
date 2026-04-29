<!-- Animated Header -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,100:203a43&height=220&section=header&text=Mercado%20Negro%20de%20Emociones&fontSize=35&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=22&pause=1200&color=FF005C&center=true&vCenter=true&width=800&lines=Emotional+volatility+detected.;Balance+under+stress.;Market+instability+increasing.;Proceed+with+caution."/>
</p>

<p align="center">
<span><b>REST Architecture · MongoDB Persistence · Authentication & Authorization · Automated Testing · OpenAPI Documentation</b></span>
</p>

---

## ⚡ Concept

>What if emotions behaved like financial assets?

>What if happiness had a price?

>What if your mental stability could collapse like a market crash?

**Mercado Negro de Emociones** is a fictional emotional trading system built with a full REST architecture, persistent storage and relational modeling.

Every transaction changes balance.  
Every purchase carries risk.  
Collapse is possible.

---

## 🧠 System Architecture

Structured following MVC principles:

```

models/
routes/
controllers/
middleware/
public/
tests/
seed.js
server.js
openapi.yaml

````

### Core Entities

- 👤 **User**
- 💜 **Emotion**
- 💳 **Transaction**

### 🔐 Security Layer

- JWT Authentication (`register`, `login`, `refresh`)
- Role-Based Authorization (`user`, `admin`)
- Protected Routes with middleware
- Access Control enforced at route level

Relationships:

- One User → Many Transactions  
- One Emotion → Many Transactions  

Implemented using:

- `ObjectId`
- `populate()`

---

## ⚙️ Engine Overview

◉ CRUD Infrastructure  
◉ Validation & Constraint Layer  
◉ Middleware Safeguards  
◉ Balance Enforcement Logic  
◉ Dynamic Pricing Engine  
◉ Market Analytics Endpoints  
◉ Automated Seed Initialization  
◉ 🔐 Authentication & Authorization System  

---

## 🔐 Authentication & Authorization

The system includes a complete security layer:

### Authentication (JWT)

- User registration  
- Secure login with encrypted passwords (bcrypt)  
- Token-based authentication  
- Token refresh endpoint  

### Authorization (Roles)

- Default role: `user`  
- Admin role: `admin`  
- Role-based access control on critical routes  

### Protected Endpoints

- User data requires authentication  
- Sensitive operations (update/delete) require admin privileges  

---

## 🧪 Automated Testing

The system includes automated tests using **Mocha & Chai** to validate the data models.

Tests cover both valid and invalid scenarios to ensure schema integrity.

**Coverage includes:**

◉ User model validation  
◉ Emotion model validation  
◉ Default values  
◉ Enum constraints  
◉ Min / Max validation errors  

Run the tests with:

```bash
npm test
````

This executes **10 automated tests**, including negative cases that trigger validation errors.

---

## 📚 API Documentation

The API is documented using the **OpenAPI Specification**.

The CRUD operations for the `User` model include:

* Success responses (`200`, `201`)
* Client errors (`400`, `404`)
* Server errors (`500`)

Documentation file:

```
openapi.yaml
```

Interactive documentation via Swagger:

```
http://localhost:3000/api-docs
```

---

## 🌐 Frontend Integration

A lightweight frontend interface is included:

* User creation form
* Direct interaction with API endpoints
* Real-time data persistence in MongoDB

Accessible at:

```
http://localhost:3000
```

---

## 🚀 Run Locally

```bash
npm install
npm run seed
npm run dev
```

Open:

```
http://localhost:3000
```

The emotional market is now live.

---

## 🩺 System Integrity

◉ Models Deployed<br>
◉ Constraints Enforced<br>
◉ Relations Linked<br>
◉ Endpoints Responsive<br>
◉ Middleware Guarding<br>
◉ Balance Logic Active<br>
◉ 🔐 Security Layer Active

────────────
STATUS: STABLE

---

## 🌓 Philosophy

> Systems reflect human behavior.
> Markets reflect instability.
> Emotions reflect both.

This project explores backend architecture through narrative-driven system design.

A technical structure.
With psychological consequences.

---

# 👩‍💻 Quién Está Detrás del Código

<p align="center">
  <img src="https://github.com/user-attachments/assets/d549c019-35bb-4af8-8e61-8d6885c6cd9b" width="200">
</p>

**Oumniya — Developer & Designer**
GitHub: [https://github.com/Oumniya17](https://github.com/Oumniya17)

---

<p align="center">
  <i>Balance defines survival.</i>
</p>

<p align="center"> 
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:203a43,100:0f2027&height=120&section=footer"/> 
</p>

