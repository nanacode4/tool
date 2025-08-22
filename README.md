
# Tool

A full-stack programming learning platform with a **React frontend** and **Django backend**, deployed using **Docker Compose**.

## Features
- **Frontend**: React (my-tool)
- **Backend**: Django (djangobackend)
- **Authentication**: JWT-based
- **APIs**: RESTful API communication
- **Deployment**: Docker & Docker Compose

## Requirements
- Node.js >= 18
- Python >= 3.10
- Docker & Docker Compose

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/<your-username>/tool.git
cd tool
````

### Run with Docker

```bash
docker-compose up --build
```

The frontend will be available at: `http://localhost:3000`
The backend API will be available at: `http://localhost:8000`

### Run Manually (Development)

#### Backend

```bash
cd djangobackend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend

```bash
cd my-tool
npm install
npm start
```

