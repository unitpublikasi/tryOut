# API Specification - AeroTryOut Pro REST Engine

This document provides the standard REST API specifications required to integrate a full-stack backend (e.g. Node.js Express, Laravel, Go, or Spring Boot) with the AeroTryOut Pro user interface.

## Base URL
All API requests must be directed to:
```
https://api.sekolah.sch.id/api/v1
```

## Global Headers
Every request (except public routes) must carry an authorization token:
```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
Accept: application/json
```

---

## 1. Authentication Services

### 1.1 User Login
- **Endpoint:** `POST /auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "username": "siswa",
    "password": "siswa123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "status": "success",
    "message": "Authentication successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "user": {
        "id": "u-3",
        "username": "siswa",
        "fullName": "Budi Santoso",
        "role": "siswa",
        "email": "budi.santoso@siswa.sch.id",
        "schoolClass": "XII-MIPA-1",
        "schoolName": "SMA Negeri 1 Jakarta",
        "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
      }
    }
  }
  ```

### 1.2 Student Registration
- **Endpoint:** `POST /auth/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "username": "andi99",
    "fullName": "Andi Wijaya",
    "email": "andi@siswa.sch.id",
    "schoolClass": "XII-MIPA-1",
    "password": "password123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "status": "success",
    "message": "Student account registered successfully",
    "data": {
      "id": "u-99"
    }
  }
  ```

---

## 2. Question Bank Services (Bank Soal)

### 2.1 Get All Questions
- **Endpoint:** `GET /questions`
- **Access:** Private (Admin / Teacher)
- **Query Parameters (Filters):**
  - `category` (string, optional)
  - `difficulty` (string: `easy`|`medium`|`hard`, optional)
  - `search` (string, optional)
- **Response (200 OK):**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "q-1",
        "text": "Jika f(x) = 3x^2 - 5x + 2, maka turunan pertama f'(2) adalah...",
        "options": ["7", "8", "9", "12"],
        "correctAnswer": 0,
        "category": "Matematika",
        "difficulty": "easy",
        "explanation": "f'(x) = 6x - 5. Maka f'(2) = 6(2) - 5 = 12 - 5 = 7.",
        "teacherId": "u-2"
      }
    ]
  }
  ```

### 2.2 Create New Question
- **Endpoint:** `POST /questions`
- **Access:** Private (Admin / Teacher)
- **Request Body:**
  ```json
  {
    "text": "Sebuah balok bermassa 5 kg ditarik dengan gaya 20 N. Berapa percepatannya?",
    "options": ["2 m/s^2", "4 m/s^2", "6 m/s^2", "8 m/s^2"],
    "correctAnswer": 1,
    "category": "Fisika",
    "difficulty": "easy",
    "explanation": "a = F / m = 20 N / 5 kg = 4 m/s^2."
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "status": "success",
    "message": "Question item created successfully"
  }
  ```

---

## 3. Try Out Management Services

### 3.1 Get All Tryouts
- **Endpoint:** `GET /tryouts`
- **Access:** Private (All roles)
- **Response (200 OK):**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "to-1",
        "title": "Try Out UTBK Matematika Saintek 2026",
        "description": "Ujian simulasi persiapan UTBK.",
        "durationMinutes": 45,
        "passingGrade": 75,
        "category": "Matematika",
        "isPublished": true,
        "questionsCount": 3
      }
    ]
  }
  ```

### 3.2 Schedule Tryout
- **Endpoint:** `POST /tryouts`
- **Access:** Private (Admin / Teacher)
- **Request Body:**
  ```json
  {
    "title": "Try Out Fisika Gelombang",
    "description": "Ujian materi gelombang elektromagnetik.",
    "durationMinutes": 45,
    "passingGrade": 70,
    "category": "Sains",
    "questionIds": ["q-4", "q-5"]
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "status": "success",
    "message": "Tryout scheduled and published successfully"
  }
  ```

---

## 4. Exam Submission Services (Ujian & Hasil)

### 4.1 Submit Tryout Answers
- **Endpoint:** `POST /submissions`
- **Access:** Private (Student)
- **Request Body:**
  ```json
  {
    "tryoutId": "to-1",
    "answers": {
      "q-1": 0,
      "q-2": 1,
      "q-3": 2
    },
    "flagged": ["q-3"]
  }
  ```
- **Response (201 Created - Graded Instantly):**
  ```json
  {
    "status": "success",
    "message": "Exam submission graded successfully",
    "data": {
      "submissionId": "sub-987654",
      "score": 67,
      "correctCount": 2,
      "wrongCount": 1,
      "unansweredCount": 0,
      "isPassed": false
    }
  }
  ```
