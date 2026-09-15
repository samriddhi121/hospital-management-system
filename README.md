# Hospital Management System

Ek full-stack web application jisse hospital apne patients, doctors, appointments, aur medical records manage kar sakta hai.

## Tech Stack

**Frontend:** HTML, CSS, JavaScript, Bootstrap 5
**Backend:** Node.js, Express.js
**Database:** MySQL
**Authentication:** JWT (JSON Web Tokens)
**Password Security:** bcryptjs (password hashing)

## Features

- **Authentication** — Register/Login with role-based access (Admin, Patient)
- **Patient Management** — Add, view patient records
- **Doctor Management** — Add, view doctors (Admin-only actions)
- **Appointment Booking** — Book appointments with double-booking prevention
- **Medical Records** — Role-based visibility (patients see only their own records, admin sees all)
- **Admin Dashboard** — Overview counts (total patients, doctors, today's appointments)

## Setup Instructions

### 1. Database Setup

Login to MySQL aur database banao:

```sql
CREATE DATABASE hospital_management;
```

Fir tables banao:

```sql
USE hospital_management;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'patient', 'doctor', 'receptionist') NOT NULL DEFAULT 'patient',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  age INT,
  gender ENUM('male', 'female', 'other'),
  contact VARCHAR(20),
  address VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  specialization VARCHAR(100),
  availability VARCHAR(255),
  contact VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  slot_time DATETIME NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  UNIQUE (doctor_id, slot_time)
);

CREATE TABLE medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT NOT NULL,
  diagnosis TEXT,
  prescription TEXT,
  visit_date DATE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);
```

### 2. Backend Setup

```bash
cd backend
npm install
```

`backend` folder mein `.env` file banao: