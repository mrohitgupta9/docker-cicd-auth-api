# 🛡️ CyberSafe - Threat Intelligence & CI/CD Security Suite

A production-grade, containerized security web application that detects phishing URLs, identifies scammer phone numbers/UPI IDs, and enables crowd-sourced threat reporting in real-time. Built with an automated DevOps CI/CD pipeline and multi-layer threat detection logic.

![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?style=for-the-badge&logo=githubactions)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-UI-38B2AC?style=for-the-badge&logo=tailwindcss)

---

## 🌟 Key Features

* **🔗 Phishing Link Scanner:** Real-time URL heuristic analysis to detect phishing keywords, malicious query patterns, and threat signatures.
* **🚨 Scammer Search Database:** Search crowd-sourced reports for fraudulent phone numbers, UPI IDs, or domain names to prevent monetary scams.
* **📝 Community Threat Reporting:** Allows authenticated users to submit detailed scam incidents to an active MongoDB Atlas database.
* **🔓 Email Data Breach Checker:** Simulated data leak checker to inspect if user emails are exposed in known public breaches.
* **🔐 Robust Authentication & Middleware:** JWT-based route protection with Bcrypt password hashing to prevent abuse and brute-force attacks.
* **⚙️ Automated CI/CD Pipeline:** Fully automated workflow using GitHub Actions to run Jest test suites, build Docker containers, push to Docker Hub, and continuously deploy to the cloud.

---

## 🛠️ Tech Stack & Tools

* **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
* **Testing Suite:** Jest, Supertest
* **DevOps & Infrastructure:** Docker, Docker Hub, GitHub Actions, Render Cloud

---

## 🏗️ System Architecture & Workflow

[ Developer Commit ]
│
▼
[ GitHub Repository (main) ]
│
▼
[ GitHub Actions CI/CD Pipeline ]
│
├─► Step 1: Environment Setup & Dependencies (npm ci)
├─► Step 2: Automated Unit & Integration Tests (npm test)
├─► Step 3: Docker Build & Push (docker-build-push)
└─► Step 4: Auto-Deploy to Render Cloud


---

## 🚀 API Endpoints Reference

### **Authentication**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new security user | No |
| `POST` | `/api/auth/login` | Login user & return JWT token | No |

### **Cyber Security Tools**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | API & Server Health Status Check | No |
| `POST` | `/api/cyber/check-url` | Scan URL for phishing signatures | Yes |
| `GET` | `/api/cyber/check-spam` | Query scam database by Phone/UPI/URL | Yes |
| `POST` | `/api/cyber/report-threat` | Submit new scam report to database | Yes |
| `POST` | `/api/cyber/check-email-breach` | Check if email is compromised | Yes |

---

## 💻 Local Installation & Setup Guide

### **Prerequisites**
* Node.js (`v18.x` or higher)
* Git installed
* MongoDB Atlas Cluster Connection String

### **1. Clone the Repository**
```bash
git clone https://github.com/rohit/docker-cicd-auth-api.git
cd docker-cicd-auth-api

cd docker-cicd-auth-api