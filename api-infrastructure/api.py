import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Path to the JSON file
TASKS_FILE = 'tasks.json'

# Helper function to load tasks from the JSON file
def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r') as file:
            return json.load(file)
    return []

# Helper function to save tasks to the JSON file
def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as file:
        json.dump(tasks, file, indent=4)

# Load tasks into memory when the server starts
tasks = load_tasks()

# Route to get all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks), 200

# Route to add a new task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    if not data or 'name' not in data or 'deadline' not in data:
        return jsonify({"error": "Name and deadline are required"}), 400
    
    # Create a new task with a unique ID and a default 'finished' status
    new_task = {
        "id": len(tasks) + 1 if not tasks else max(task['id'] for task in tasks) + 1,
        "name": data["name"],
        "deadline": data["deadline"],
        "finished": False
    }
    
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task), 201

# Route to edit an existing task
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def edit_task(task_id):
    data = request.get_json()
    task = next((task for task in tasks if task["id"] == task_id), None)
    
    if task is None:
        return jsonify({"error": "Task not found"}), 404

    # Update task fields if provided
    task["name"] = data.get("name", task["name"])
    task["deadline"] = data.get("deadline", task["deadline"])
    
    save_tasks(tasks)
    return jsonify(task), 200

# Route to delete a task
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    
    save_tasks(tasks)
    return jsonify({"message": "Task deleted"}), 200

# Route to mark a task as finished
@app.route("/tasks/<int:task_id>/finish", methods=["PUT"])
def finish_task(task_id):
    task = next((task for task in tasks if task["id"] == task_id), None)
    
    if task is None:
        return jsonify({"error": "Task not found"}), 404

    task["finished"] = True
    
    save_tasks(tasks)
    return jsonify(task), 200

# Default route to check server status
@app.route("/")
def live_status():
    return "The Rest Server is Alive!"

if __name__ == "__main__":
    app.run(debug=True)
