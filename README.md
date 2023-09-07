# Real Time System Notification Emailing Project README

This README will guide you through the process of setting up and running a Real Time System Notification Emailing project from this repository. Follow these steps to get your project up and running.

## Table of Contents

- [1. Clone the Repository](#1-clone-the-repository)
- [2. Set Up the Client (Vite React)](#2-set-up-the-client-vite-react)
  - [2.1. Install Client Dependencies](#21-install-client-dependencies)
  - [2.2. Configure Client Environment](#22-configure-client-environment)
  - [2.3. Run Development Server (Client)](#23-run-development-server-client)
- [3. Set Up the Server (Django)](#3-set-up-the-server-django)
  - [3.1. Navigate to Server Directory](#31-navigate-to-server-directory)
  - [3.2. Install Server Dependencies](#32-install-server-dependencies)
  - [3.3. Configure Server Environment](#33-configure-server-environment)
  - [3.4. Run Migrations](#34-run-migrations)
  - [3.5. Run Django Server](#35-run-django-server)

## 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/twilight04/real-time-system-notif-task.git
```

## 2. Set Up the Client (Vite React)

### 2.1. Install Client Dependencies

Navigate to the root directory within your project:

```bash
cd real-time-system-notif-task/
```

Install the client dependencies using `npm`:

```bash
npm install
```

### 2.2. Configure Client Environment

Create a `.env` file in the client directory based on the provided `.env.example` file:

```bash
cp .env.example .env
```

Edit the `.env` file in the client directory to set your environment-specific variables such as PUSHER APP KEY and SERVER URL

### 2.3. Run Development Server (Client)

Start the development server for your client:

```bash
npm run dev
```

Your Real Time System Notification Emailing client should now be running. Open a web browser and navigate to the appropriate URL (`http://localhost:5173`) to access your client application.

## 3. Set Up the Server (Django)

### 3.1. Navigate to Server Directory

Navigate to the server directory within your project:

```bash
cd server
```

### 3.2. Install Server Dependencies

Install the server dependencies using `pip` within the server directory:

```bash
pip install -r requirements.txt
```

### 3.3. Configure Server Environment

Create a `.env` file in the server directory based on the provided `.env.example` file:

```bash
cp .env.example .env
```

Edit the `.env` file in the server directory to set your environment-specific variables, especially SMTP credentials and PUSHER SECRETS.

### 3.4. Run Migrations

Apply the database migrations to create the database schema:

```bash
python manage.py migrate
```

### 3.5. Run Django Server

Start the Django development server:

```bash
python manage.py runserver
```

Your Django server should now be up and running. Open a web browser and navigate to the appropriate URL (usually `http://localhost:8000`) to access your server application. Thank you
