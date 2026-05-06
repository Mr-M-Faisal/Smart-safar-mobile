import { createBrowserRouter } from 'react-router';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RouteDetailScreen } from './screens/RouteDetailScreen';
import { BusDetailScreen } from './screens/BusDetailScreen';
import { SeatBookingScreen } from './screens/SeatBookingScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { BookingConfirmationScreen } from './screens/BookingConfirmationScreen';
import { MyTicketsScreen } from './screens/MyTicketsScreen';
import { StopDetailScreen } from './screens/StopDetailScreen';
import { OTPRegistrationScreen } from './screens/OTPRegistrationScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { OfflineScreen } from './screens/OfflineScreen';
import { RoutesListScreen } from './screens/RoutesListScreen';
import { ScreenShowcaseScreen } from './screens/ScreenShowcaseScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SplashScreen,
  },
  {
    path: '/showcase',
    Component: ScreenShowcaseScreen,
  },
  {
    path: '/home',
    Component: HomeScreen,
  },
  {
    path: '/routes',
    Component: RoutesListScreen,
  },
  {
    path: '/route-detail/:routeId',
    Component: RouteDetailScreen,
  },
  {
    path: '/route-detail',
    Component: RouteDetailScreen,
  },
  {
    path: '/bus-detail',
    Component: BusDetailScreen,
  },
  {
    path: '/stop-detail',
    Component: StopDetailScreen,
  },
  {
    path: '/seat-booking',
    Component: SeatBookingScreen,
  },
  {
    path: '/payment',
    Component: PaymentScreen,
  },
  {
    path: '/confirmation',
    Component: BookingConfirmationScreen,
  },
  {
    path: '/tickets',
    Component: MyTicketsScreen,
  },
  {
    path: '/otp',
    Component: OTPRegistrationScreen,
  },
  {
    path: '/profile',
    Component: UserProfileScreen,
  },
  {
    path: '/offline',
    Component: OfflineScreen,
  },
]);