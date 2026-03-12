from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import Client, create_client
from dotenv import load_dotenv
import os

# Setup
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)
CORS(app)

# C: Create
@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    supabase.table("tasks").insert({
        "task": data.get("task")
    }).execute()

    response = supabase.table("tasks").select("*").execute()
    return jsonify(response.data)

# R: Read
@app.route("/tasks", methods=["GET"])
def get_task():
    response = supabase.table("tasks").select("*").execute()

    return jsonify(response.data)

# U: Update
@app.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()

    supabase.table("tasks").update({
        "task": data.get("task")
    }).eq("id", task_id).execute()

    response = supabase.table("tasks").select("*").execute()
    return jsonify(response.data)

# D: Delete
@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    supabase.table("tasks").delete().eq("id", task_id).execute()

    response = supabase.table("tasks").select("*").execute()
    return jsonify(response.data)

if __name__ == "__main__":
    app.run(debug=True)

