# REVERSE — Frontend

Collection Booking & Operations Dashboard — React + TypeScript + Vite + TailwindCSS

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool + dev server |
| TailwindCSS | Utility-first styling |
| React Query v5 | Server state + caching |
| React Hook Form | Form management |
| Zod | Schema validation |
| Axios | HTTP client |
| Recharts | Dashboard charts |
| React Router v6 | Client-side routing |

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy env and set API URL
cp .env.example .env

# Start dev server (requires backend running on :3001)
npm run dev
```

Open http://localhost:5173

---

## Project Structure

```
src/
├── api/           # Axios API functions per resource
├── components/
│   ├── ui/        # Reusable primitives (Button, Input, Modal, Badge…)
│   ├── layout/    # AppShell, Sidebar, PageHeader
│   ├── bookings/  # Booking-specific components + form
│   ├── assignment/# Assign driver modal
│   ├── timeline/  # Activity timeline
│   └── dashboard/ # Metric cards + charts
├── hooks/         # React Query hooks (useBookings, useDrivers…)
├── pages/         # Route-level page components
├── types/         # TypeScript interfaces
├── utils/         # Formatters, statusConfig, cn()
└── constants/     # Query key factory
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Dashboard — KPI metrics + charts |
| `/bookings` | Booking list with filters + pagination |
| `/bookings/new` | Create booking form |
| `/bookings/:id` | Booking detail + timeline + assign driver |
| `/drivers` | Driver list + status filter |

---

## Key Features

- **High Priority logic** — bookings with >100 packages auto-flag as HIGH with live form indicator
- **State machine** — status transitions enforced on both frontend and backend
- **Activity Timeline** — full audit trail per booking
- **Assign Driver workflow** — modal with live available driver list
- **Pagination + filtering** — search by address, filter by status/priority, sort
- **Dashboard charts** — bookings by status bar chart + KPI grid
- **React Query caching** — staleTime, invalidation on mutation, placeholderData for smooth pagination

---

## Environment Variables

```
VITE_API_URL=http://localhost:3001/api/v1
```
