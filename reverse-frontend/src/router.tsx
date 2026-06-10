import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { BookingsPage } from './pages/BookingsPage';
import { BookingDetailPage } from './pages/BookingDetailPage';
import { NewBookingPage } from './pages/NewBookingPage';
import { DriversPage } from './pages/DriversPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'bookings/new', element: <NewBookingPage /> },
      { path: 'bookings/:id', element: <BookingDetailPage /> },
      { path: 'drivers', element: <DriversPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
