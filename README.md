# REVERSE – Full Stack Developer Assignment

## Overview

Thank you for your interest in joining REVERSE.

At REVERSE, we are building technology infrastructure for packaging reuse, reverse logistics, collection operations, inventory management, and traceability.

This assignment is designed to evaluate how you approach building real-world operational software. You are encouraged to use AI-assisted development tools (ChatGPT, Claude, Cursor, GitHub Copilot, etc.) during this assignment.

We are **not** evaluating whether you use AI. We are evaluating:

* How you structure your solution
* How you model data
* How you design APIs
* How maintainable your code is
* How well you understand and explain your implementation

---

# Assignment: Collection Booking & Operations Dashboard

## Background

REVERSE receives collection requests from households, apartments, offices, restaurants, and retail stores that want to return reusable packaging.

When a collection request is submitted:

1. A booking is created.
2. The operations team reviews the booking.
3. The booking may be assigned to a collection agent.
4. The collection is completed.
5. The booking history is retained for operational visibility and reporting.

Your task is to build a simple application that supports this workflow.

---

# Expected Time

**3–4 hours**

Please focus on:

* Clean architecture
* Maintainable code
* Sensible database design
* Thoughtful trade-offs

rather than implementing every possible feature.

---

# Functional Requirements

## 1. Collection Booking Form

Create a form to capture collection requests.

### Required Fields

| Field                     | Type      |
| ------------------------- | --------- |
| Customer Name             | Text      |
| Phone Number              | Text      |
| Email                     | Text      |
| Address                   | Text      |
| Collection Type           | Dropdown  |
| Estimated Package Count   | Number    |
| Preferred Collection Date | Date      |
| Notes                     | Text Area |

### Collection Types

* Household
* Apartment
* Office
* Retail Store
* Restaurant / Cafe

---

## 2. Booking Management

Implement APIs to:

### Create Booking

```http
POST /bookings
```

### Get All Bookings

```http
GET /bookings
```

### Get Booking Details

```http
GET /bookings/:id
```

### Update Booking Status

```http
PATCH /bookings/:id/status
```

### Supported Statuses

* Pending
* Assigned
* Collected
* Cancelled

---

## 3. Operations Dashboard

Create an internal dashboard showing:

### Summary Metrics

* Total Bookings
* Pending Collections
* Assigned Collections
* Completed Collections

### Booking Table

Display:

* Booking ID
* Customer Name
* Collection Type
* Estimated Package Count
* Collection Date
* Status

### Table Features

At minimum:

* Search bookings
* Filter by status

---

## 4. Assignment Workflow

Allow operations users to assign a booking.

### API

```http
POST /bookings/:id/assign
```

### Example Request

```json
{
  "agentName": "Ravi Kumar",
  "vehicleId": "V001"
}
```

You may decide how this information is stored and displayed.

---

## 5. Booking Activity Timeline

Track important booking events.

Examples:

* Booking Created
* Assigned to Collection Agent
* Status Updated
* Collection Completed

We recommend storing activity history separately from the booking record.

The exact implementation is left to you.

---

## 6. Reporting API

Implement:

```http
GET /dashboard
```

Example response:

```json
{
  "totalBookings": 150,
  "pending": 45,
  "assigned": 30,
  "collected": 65,
  "averagePackagesPerBooking": 18
}
```

---

# Bonus (Optional)

Implement a Priority Queue.

A booking should automatically be marked as **High Priority** when:

```text
Estimated Package Count > 100
```

Display high-priority bookings separately in the dashboard.

---

# Technical Requirements

You may use any technology stack.

Examples:

### Frontend

* React
* Next.js
* Vue
* Angular

### Backend

* Node.js
* Express.js
* NestJS
* FastAPI
* Django

### Database

* PostgreSQL
* MySQL
* MongoDB
* Firebase
* SQLite

---

# What We Are Evaluating

We are intentionally allowing AI-assisted development.

Therefore, we are more interested in engineering decisions than the amount of code written.

### Evaluation Criteria

| Area                             | Weight |
| -------------------------------- | ------ |
| Code Structure & Maintainability | 25%    |
| Database Design                  | 20%    |
| API Design                       | 15%    |
| Frontend Implementation          | 10%    |
| Business Logic                   | 10%    |
| Documentation                    | 10%    |
| Error Handling & Validation      | 5%     |
| Bonus Features                   | 5%     |

---

# Submission Requirements

## GitHub Repository

Please submit a repository containing:

* Frontend application
* Backend application
* README
* Database schema/migrations

---

## README

Include:

### Setup Instructions

How to run the project locally.

### Architecture Decisions

Explain your project structure and major technical decisions.

### Database Design

Explain your schema and relationships.

### Trade-offs

What would you improve with additional time?

### AI Usage Declaration

Please include:

* AI tools used
* How they were used
* Any major prompts that influenced architecture or implementation, you are encouraged to add your .md files to your repo
* Which parts you reviewed or modified manually

---

## Application Demo Video (Required)

Please record a short **3–5 minute demo video** showing:

* Collection booking form
* Booking creation flow
* Operations dashboard
* Status updates
* Assignment workflow (if implemented)
* Any bonus features implemented

No architecture walkthrough is required. We only want to see the application working. 
You can use loom or any such platform.
---

# Important Notes

* We value clarity over complexity.
* We value maintainable code over feature count.
* We value thoughtful trade-offs over perfect implementations.
* It is completely acceptable to use AI tools during this assignment.
* Please ensure you understand and can explain all code that you submit.

Good luck, and we look forward to reviewing your solution.
