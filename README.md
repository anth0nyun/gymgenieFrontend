# 🏋️‍♂️ GymGenie

**GymGenie** is a fitness tracker app that helps users plan, log, and organize their workouts in one place.  
It replaces scattered notes with an intuitive interface for viewing, creating, and editing workouts, along with a weekly planner for scheduling routines.

---

## Overview

GymGenie allows users to:
- View all existing workouts
- Create new workout templates
- Edit or delete workouts
- Plan a weekly workout schedule using a simple visual planner
- Store data persistently with MongoDB and maintain state in localStorage


## Features

### Backend
- **Full CRUD** for workouts (`GET`, `POST`, `PATCH`, `DELETE`)
- RESTful API structure with controllers and routes
- Connected MongoDB instance (local or Atlas)
- Request validation and structured error handling
- Seed script for default workouts

### Frontend
- **Workouts List Page:** displays all workouts with search and navigation  
- **Workout Detail Page:** shows workout info with edit and delete options  
- **Workout Form Page:** create or edit workouts through controlled form inputs  
- **Weekly Planner Page:** assign workouts to weekdays; saves selections locally  
- Navigation bar, consistent theme, and reusable button & grid styles

## API Routes Table

| Resource | Method | Endpoint | Description |
|-----------|--------|-----------|--------------|
| Workouts | GET | `/api/workouts` | Get all workouts |
| Workouts | GET | `/api/workouts/:id` | Get a single workout by ID |
| Workouts | POST | `/api/workouts` | Create a new workout |
| Workouts | PATCH | `/api/workouts/:id` | Update an existing workout |
| Workouts | DELETE | `/api/workouts/:id` | Delete a workout |

## Thought Process

The project began by setting up a backend with Express and MongoDB, followed by implementing CRUD routes for the **Workouts** collection. Once the API was verified through seed data and REST testing, we connected the React frontend to display and manage workouts dynamically.

After CRUD functionality was complete, a **Weekly Planner page** was added to demonstrate persistent client-side state management and user interactivity. The design emphasizes simplicity and easy navigation for a gym-tracking user experience.

## Future Implementations

- **Sessions Collection:** Track individual workout sessions (date, duration, notes)
- **User Accounts:** Add authentication and personal dashboards
- **Workout Analytics:** Display progress charts and PR tracking
- **Mobile Responsive Design:** Optimize layout for phones/tablets
