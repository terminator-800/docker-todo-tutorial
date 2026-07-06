# 🐳 Docker Tutorial

A hands-on Docker learning project that demonstrates how to containerize a full-stack Todo application using **Docker**, **Docker Compose**, **Node.js**, and **Nginx**.

This project covers the fundamentals of Docker by containerizing both the frontend and backend, building custom images, and orchestrating multiple services with Docker Compose.

---

## 🚀 Features

- Containerized Node.js backend
- Containerized frontend served with Nginx
- Multi-container application using Docker Compose
- REST API communication between frontend and backend
- Simple Todo application with CRUD functionality
- Beginner-friendly Docker project structure

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Nginx

### Backend
- Node.js
- JavaScript
- REST API

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure

```text
docker-tutorial/
│
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   └── todos.txt
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── .dockerignore
│   ├── .gitignore
│   └── README.md
│
├── frontend/
│   ├── static/
│   │   └── index.html
│   ├── Dockerfile
│   ├── env.js
│   ├── .dockerignore
│   ├── .gitignore
│   └── README.md
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, install:

- Docker Desktop

Docker Compose is included with modern versions of Docker Desktop.

---

## ▶️ Getting Started

Clone the repository:

```bash
git clone https://github.com/terminator-800/docker-todo-tutorial.git
```

Navigate to the project directory:

```bash
cd docker-tutorial
```

Build and start the application:

```bash
docker compose up --build
```

---

## 🌐 Access the Application

Frontend:

```text
http://localhost:8080
```

Backend:

```text
http://localhost:3000
```

---

## 🛑 Stop the Application

```bash
docker compose down
```

---

## 📚 Docker Concepts Demonstrated

This project demonstrates:

- Docker Images
- Docker Containers
- Dockerfiles
- Docker Compose
- Multi-container applications
- Container networking
- Port mapping
- Building custom Docker images
- Serving static files with Nginx

---

## 🎯 Learning Objectives

This project was built to gain practical experience with:

- Containerizing frontend and backend applications
- Writing Dockerfiles
- Managing multiple containers with Docker Compose
- Understanding Docker networking
- Running a complete full-stack application inside Docker

---

## 📄 License

This project is intended for educational and learning purposes.
