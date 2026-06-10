# REVERSE — Backend

Express + TypeScript + Sequelize + MySQL backend for the Collection Booking & Operations Dashboard.

## Prerequisites

- Node.js v18+
- MySQL 8.0+

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your DB credentials
cp .env.example .env

# 3. Create the MySQL database
mysql -u root -p -e "CREATE DATABASE reverse_db;"

# 4. Run dev server (auto-syncs tables on start)
npm run dev

# 5. (Optional) Seed demo data
npm run seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to dist/ |
| `npm start` | Run compiled production build |
| `npm run seed` | Seed demo customers, drivers & bookings |
| `npm run typecheck` | Type-check without emitting |

## API Base URL

```
http://localhost:3001/api/v1
```

## Endpoints

### Bookings
| Method | Path | Description |
|--------|------|-------------|
| POST | `/bookings` | Create booking |
| GET | `/bookings` | List bookings (filter + paginate) |
| GET | `/bookings/:id` | Get booking with timeline |
| PATCH | `/bookings/:id/status` | Update status |
| DELETE | `/bookings/:id` | Cancel booking |

### Drivers
| Method | Path | Description |
|--------|------|-------------|
| POST | `/drivers` | Register driver |
| GET | `/drivers` | List drivers |
| GET | `/drivers/available` | Get available drivers |
| PATCH | `/drivers/:id/status` | Update driver status |

### Assignments
| Method | Path | Description |
|--------|------|-------------|
| POST | `/assignments` | Assign driver to booking |
| DELETE | `/assignments/:id` | Unassign driver |
| PATCH | `/assignments/:id/complete` | Mark complete |

### Reports
| Method | Path | Description |
|--------|------|-------------|
| GET | `/reports/dashboard` | KPI metrics |
| GET | `/reports/bookings-by-status` | Count by status |
| GET | `/reports/driver-utilization` | Assignments per driver |
| GET | `/reports/high-priority` | High priority stats |

## Health Check

```
GET http://localhost:3001/health
```
