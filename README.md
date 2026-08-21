# Dockerized Node.js Auth API with Automated CI/CD Pipeline

A production-ready Authentication REST API built with Node.js, Express, and MongoDB, featuring full containerization with Docker and automated testing/deployment via GitHub Actions to Render.

## 🚀 Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Authentication:** JWT, Bcrypt.js
* **Containerization:** Docker
* **CI/CD:** GitHub Actions, Docker Hub
* **Deployment:** Render Cloud

## 🛠 CI/CD Architecture Flow
1. Developer pushes code to `main` branch.
2. GitHub Actions triggers unit tests (`npm test`).
3. On test pass, GitHub Actions builds the Docker image and pushes it to Docker Hub.
4. Render automatically pulls the latest Docker image and deploys the app live.

## 📌 API Endpoints
* `GET /` - Root status check
* `GET /health` - CI/CD Engine status check
* `POST /api/auth/register` - User Registration
* `POST /api/auth/login` - User Login (JWT generation)