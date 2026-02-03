# Barbell Training App

A simple web app for tracking barbell training with warmup calculations and linear progression.

## Quick Start

### Node.js
```bash
node server.js
```

### Docker
```bash
docker compose up -d
```

Open http://localhost:3000

## Project Structure

```
barbell/
├── server.js      # Node.js server (no dependencies)
├── index.html     # Main training app
├── settings.html  # Configuration page
├── history.json   # Workout log (auto-created)
├── settings.json  # User settings (auto-created)
└── progress.json  # Current working weights (auto-created)
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/history` | GET/POST | Workout history |
| `/api/settings` | GET/POST | Plates, progression settings |
| `/api/progress` | GET/POST | Current working weights |

## Features

- **Exercise tracking**: Squat, Press, Deadlift
- **Warmup calculator**: Shows 5 warmup sets with plate breakdowns
- **Plate calculator**: Shows which plates to load per side
- **Linear progression**: Configurable weight increases after completing 3×5 (Squat/Press) or 1×5 (Deadlift)
- **History graph**: Visual progress over time with YYYY-MM-DD dates

## Data Format

### settings.json
```json
{
  "plates": [10, 5, 2.5, 2.5, 1.25],
  "exercises": {
    "squat": { "startingWeight": 20, "progression": 5 },
    "press": { "startingWeight": 10, "progression": 2.5 },
    "deadlift": { "startingWeight": 30, "progression": 5 }
  }
}
```

### progress.json
```json
{
  "squat": { "weight": 20 },
  "press": { "weight": 10 },
  "deadlift": { "weight": 30 }
}
```

### history.json
```json
[
  { "exercise": "squat", "weight": 25, "date": "2024-01-15T10:30:00.000Z" }
]
```

## Notes

- Weights represent total plate weight (bar not included in calculations)
- Plates array is per side, sorted largest to smallest
- History keeps last 50 entries
