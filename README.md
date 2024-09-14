# Task Manager App

Welcome to the Task Manager App! This web application is designed to help you manage your tasks efficiently with a modern and intuitive interface. Whether you're keeping track of daily to-dos or managing a complex project, this app is here to make task management simple and organized.

## Features

- Task Management: Add, update, and delete tasks with ease.
- Deadline Management: Set deadlines for tasks with a date and time picker.
- Task Details: View and edit detailed information about each task.
- Search Functionality: Quickly find tasks using the search bar.
- Responsive Design: Works seamlessly on both desktop and mobile devices.
- Animated UI: Smooth animations for adding and editing tasks.

## Installation

To set up the Task Manager app locally, follow these steps:

1. Clone the Repository

   git clone https://github.com/deteto747chudo/todo-using-RestAPI

2. Navigate to the Project Directory

   cd task-manager-app

3. Install Dependencies

   Ensure you have Node.js and npm installed. Then run:

   npm install

4. Run the Application

   Start the development server:

   npm start

   The app will be available at http://127.0.0.1:5000/.

## API Endpoints

The app interacts with a backend API to manage tasks. Here’s how you can test the API using Postman:

- GET /tasks
  - Retrieves a list of all tasks.
  - Example Response:
    [
      {
        "id": 1,
        "name": "Sample Task",
        "deadline": "2024-09-15T12:00:00Z",
        "finished": false
      }
    ]

- POST /tasks
  - Creates a new task.
  - Example Request Body:
    {
      "name": "New Task",
      "deadline": "2024-09-16T15:00:00Z"
    }
  - Example Response:
    {
      "id": 2,
      "name": "New Task",
      "deadline": "2024-09-16T15:00:00Z",
      "finished": false
    }

- PUT /tasks/{id}
  - Updates an existing task.
  - Example Request Body:
    {
      "name": "Updated Task",
      "deadline": "2024-09-17T16:00:00Z"
    }

- DELETE /tasks/{id}
  - Deletes a task by ID.
  - Example Response:
    {
      "message": "Task deleted successfully"
    }

## iOS Browser Optimization

For optimal performance on iOS devices:
- Hides the address bar with JavaScript scrolling.
- Prevents zooming on input fields with CSS.

## Technologies Used

- Frontend: HTML, CSS, JavaScript, Tailwind CSS
- Backend: Node.js, Express.js (for API)
- Database: MongoDB (or your choice)
