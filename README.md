# 🧠 Deadlock Simulator System

**An interactive, AI-powered simulator to visualize, detect, and resolve software deadlocks.**  
This project replicates a desktop-style interface where each application (like Word, Zoom, Antivirus) initiates a unique deadlock scenario. The system simulates the lifecycle of processes — from creation to deadlock — and uses an AI backend to predict and resolve them in real-time.

---

## 📁 Repository Structure

This repository follows a **modular, branch-based structure** to separate core components:

| Branch Name        | Description |
|--------------------|-------------|
| `main`             | Production-ready code for both frontend and backend |
| `frontend`         | All HTML, CSS, JavaScript codebase for the simulation UI |
| `backend`          | Flask backend server, AI/ML model logic, deadlock handling |
| `ml-model`         | (Optional) ML model training, prediction scripts, datasets |
| `assets`           | Images, icons, audio effects, simulation background assets |

---

## 🎯 Features

- 💻 **Desktop-style interface** with icons (e.g., Word, Zoom, VLC, Device Manager)
- 🔄 **Real-time simulation** of software interactions and deadlock creation
- 🧠 **AI-powered prediction and resolution** of deadlocks via Flask backend
- 🔒 **Interactive locking system** to visualize resource acquisition and conflict
- 📊 **Process Simulation Panel** showing live logs and AI reasoning
- 🎨 Custom styling, sound effects, and animations
- 🧪 Support for multiple software flows and deadlock chains

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js (optional for asset tooling)
- Git
- Flask
- Modern browser (Chrome/Firefox)

---

## 📦 Installation & Setup

### 🔧 Backend Setup (Flask + AI/ML)

1. Clone the repository:
   ```
   git clone https://github.com/Sathishkumar0912/deadlock-simulator.git
   cd deadlock-simulator
   git checkout backend

## ⚙️ Backend Setup (Flask + AI)

### 🐍 Create and Activate Virtual Environment

  
  # Create virtual environment
  python -m venv venv

# Activate the environment

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

### 📦 Install Python Dependencies

```
cd backend
pip install -r requirements.txt
```
### 🚀 Run the Flask Server

```
python app.py
```
🎨 3. Frontend Setup (HTML, JS, CSS)
------------------------------------

You have two options:

### 🔁 Option 1: Serve using Flask

If you are using the Flask backend, it already serves your HTML via:

### 💻 Option 2: Open Locally Without Flask

You can open the `index.html` directly in your browser:

```
cd frontend/templates
open index.html   # Or double-click the file in your File Explorer
```
## 🧠 AI-Powered Deadlock Flow

Each simulation follows this sequence:

1. User clicks a **desktop icon** (e.g. Word, VLC, Zoom).
2. A **deadlock report** appears immediately.
3. The report displays the reason for the deadlock.
4. You click the **Resolve** button.
5. The backend:
   - Creates and logs processes.
   - Analyzes the deadlock using simulated AI.
   - Resolves it with suggested actions.
6. The **Live Simulation Panel** displays visual steps of resolution.

✅ This flow ensures a realistic simulation of detection → analysis → resolution powered by AI logic.

## 🧩 Icons / Scenarios Simulated

| App           | Scenario                                      |
|---------------|-----------------------------------------------|
| Word          | Printing locks vs. PDF conversion locks       |
| Antivirus     | Scan file vs. Backup locks                    |
| Device Manager| Driver Update vs. Windows Update              |
| VLC           | Playback vs. Metadata Indexing                |
| Photoshop     | Editing vs. OneDrive Sync                     |
| Zoom          | Webcam Lock vs. Camera App                    |
| VM            | Host vs. Guest File Lock                      |
| Excel         | File open during background operations        |
| Code Editors  | Dual access to same folder                    |
| Video Save    | Playback vs. Write                            |

## 🔥 Process Flow Examples

### 📝 Scenario 1: Word and PDF Printer Deadlock

```
Process 1 created: Word locks the document
Process 2 created: PDF Printer tries reading the same file
Deadlock Detected: Word waits for printer to finish; printer waits for Word to release
```
→ AI analyzes the resource wait graph
→ AI detects circular wait
→ AI decides to terminate Process 2 (PDF Printer) to resolve
→ Lock is released, Word resumes
→ Deadlock resolved successfully using AI logic

## 💡 Tips

- Ensure Flask is running before testing frontend.
- All icons and animations are dynamically simulated.
- Logs update only after hitting **Resolve**.
- Deadlock report is shown immediately on icon click.
