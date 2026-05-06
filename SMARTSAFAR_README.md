# smartSafar - Pakistani Urban Bus Tracking & Seat Booking App

**A Complete Mobile UI Kit for Smart Public Transit Tracking System**

## 🚀 Quick Start

### Viewing the App
1. **Start at Splash Screen:** The app opens with an animated splash screen that auto-navigates to the home screen
2. **Use the Screen Navigator:** Click the purple menu button in the top-right corner to jump to any screen
3. **Try the Showcase:** Visit `/showcase` to see all 13 screens at a glance
4. **Follow the Flow:** Start from Home → Book a bus seat → View your ticket

### Primary User Flow (Try This First!)
```
Splash (/) → Home (/home) → Route Detail (/route-detail) → 
Bus Detail (/bus-detail) → Seat Booking (/seat-booking) → 
Payment (/payment) → Confirmation (/confirmation)
```

### Key Features to Explore
- 🗺️ **Live Map** with animated buses moving across routes
- 🎫 **Interactive Seat Selection** with color-coded availability
- 📱 **OTP Verification** with countdown timer
- 🎉 **Booking Confirmation** with confetti animation and QR code
- 🔔 **Toast Notifications** (appears 5 seconds after loading home screen)
- 📊 **User Stats** showing trips and spending

---

## Project Overview

smartSafar is a comprehensive mobile app UI kit designed for a Pakistani urban bus tracking and seat booking system for Faisalabad city. This is optimized for Android mobile browsers with a 375×812px (iPhone 14 frame) portrait orientation.

**Project Details:**
- **University:** NUML University Faisalabad
- **Project Type:** Final Year Project (Real-Time Transit Tracking System)
- **Purpose:** UX Design Lab Project & Passenger Interface

## Design Specifications

### Visual Style
- **Design Philosophy:** Modern, clean, flat design
- **Primary Color:** Deep Teal `#0F6E56`
- **Accent Color:** Amber `#EF9F27`
- **Background:** White `#FFFFFF` with light gray surfaces `#F4F4F2`
- **Typography:** Poppins (Urdu-friendly, minimum 14px body text)
- **Border Radius:** 12-16px for rounded corners
- **Layout:** Card-based with no skeuomorphism

### Mobile Optimization
- **Viewport:** 375×812px (iPhone 14 frame)
- **Orientation:** Portrait only
- **Status Bar:** Dark with teal background
- **Navigation:** Bottom tab bar with 4 tabs

## Complete Screen Flow (12 Screens)

### 1. **Splash Screen** (`/`)
- smartSafar logo centered on teal background
- Animated bus icon
- Tagline: "اپنی بس. Real Time." / "Apni Bus. Real Time."
- Auto-navigates to Home after 3 seconds

### 2. **Home / Live Map Screen** (`/home`)
- Full-screen map of Faisalabad with animated bus icons
- Search bar at top: "Search stop or route..."
- Location pin button
- Filter chips: All Routes / Route 4 / Route 2
- Bottom drawer showing next bus information
- Features: Route 4, 8 min away, 12 seats available

### 3. **Routes List Screen** (`/routes`)
- Complete list of all available routes
- Each route card shows:
  - Route name and number
  - From/To locations
  - Number of stops
  - Frequency
  - Distance
  - Fare price
- Search functionality

### 4. **Route Detail Screen** (`/route-detail`)
- Split view: Map + Stop list
- Left sidebar: All stops with arrival ETAs
- Active bus highlighted on route
- Blue polyline showing route path
- "Book Seat" CTA button at bottom

### 5. **Bus Detail Bottom Sheet** (`/bus-detail`)
- Modal sliding from bottom
- Shows:
  - Bus ID (4-B) and arrival time (8 min)
  - Seat availability bar (12/40 seats)
  - Current location: "Near Millat Chowk"
  - Live speed: 35 km/h
- Two buttons: "Track This Bus" and "Book a Seat"

### 6. **Seat Booking Screen** (`/seat-booking`)
- Visual bus seat grid (8 rows × 4 seats)
- Color coding:
  - 🟢 Green = Available
  - ⚫ Gray = Occupied
  - 🔴 Red = Booked
  - 🔵 Blue = Selected
- Summary card at bottom with seat, route, and price
- "Confirm & Pay" button

### 7. **Payment Screen** (`/payment`)
- Payment options:
  - EasyPaisa (with logo)
  - JazzCash (with logo)
  - Bank Transfer
- Amount breakdown:
  - Ticket: PKR 950
  - Service Fee: PKR 20
  - Total: PKR 970
- Security badge at bottom
- "Pay Now" button

### 8. **Booking Confirmation Screen** (`/confirmation`)
- Success checkmark animation
- Confetti celebration
- Digital ticket card:
  - Passenger: Ayesha Malik
  - Route: Faisalabad → Lahore
  - Seat: B-7
  - Departure: 9:00 AM, May 5, 2026
- Large QR code for boarding
- "Download" and "Share" buttons
- "Back to Home" button

### 9. **My Tickets / Booking History** (`/tickets`)
- List of past and upcoming tickets
- Each ticket card shows:
  - Booking ID
  - From/To locations
  - Date and time
  - Seat number
  - Status badge (Upcoming/Completed/Cancelled)
- Cancelled tickets show refund status

### 10. **Stop Detail Screen** (`/stop-detail`)
- Individual stop view for "D-Ground Chowk"
- Stats: Number of routes, buses per hour, avg wait time
- List of upcoming buses with:
  - Bus ID and route
  - ETA with progress bar
  - Seat availability
- Favorite stop toggle (star icon)
- Routes available from this stop

### 11. **OTP Registration Screen** (`/otp`)
**Phone Number Entry:**
- Pakistan flag + +92 prefix
- Mobile number input
- "Continue" button

**OTP Verification:**
- 4 large digit input boxes
- Countdown timer "Resend in 0:45"
- "Verify" button in teal
- Auto-navigates to profile after verification

### 12. **User Profile Screen** (`/profile`)
- Avatar with initials (AM for Ayesha Malik)
- Phone number: 0312-XXXXXXX
- Journey stats:
  - 42 trips taken
  - PKR 38,400 spent
- Upcoming bookings section
- Settings options:
  - Notifications
  - Saved Stops
  - Language (Urdu/English)
  - Edit Profile
  - Logout

### Bonus: **Offline / No Connection Screen** (`/offline`)
- Gentle illustration of bus at stop
- Message: "No internet connection. Showing cached route info."
- Static route map
- "Retry" button

## Navigation Structure

### Bottom Tab Bar (4 tabs)
1. **Home** (Map icon) → `/home`
2. **Routes** (List icon) → `/routes`
3. **My Tickets** (Ticket icon) → `/tickets`
4. **Profile** (Person icon) → `/profile`

Active tab displays in teal color.

## User Flow Examples

### Primary Flow: Book a Seat
```
Splash → Home → Route Detail → Bus Detail → 
Seat Booking → Payment → Confirmation → My Tickets
```

### Secondary Flow: Find a Stop
```
Home → Stop Detail → Bus Detail
```

### Account Setup Flow
```
Splash → OTP Registration → Profile
```

## Technical Stack

- **Framework:** React 18.3.1
- **Router:** React Router v7
- **Styling:** Tailwind CSS v4 + Custom Theme
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Maps:** React Leaflet
- **Components:** Radix UI (shadcn/ui components)
- **Forms:** React Hook Form
- **OTP Input:** input-otp
- **Confetti:** canvas-confetti

## Additional Features

### Loading States
- Skeleton screens for map and list views
- Loading animations during data fetch

### Empty States
- "No tickets found" message in My Tickets
- Helpful illustrations and guidance

### Toast Notifications
- "Bus 4-B arriving in 2 min!" alerts
- Booking confirmations
- Error messages

### Responsive Design
- Mobile-first approach
- Optimized for 375px width
- Safe area insets for modern devices
- Smooth animations and transitions

## Brand Assets

### App Icon
- Bus + location pin in teal circle
- Suitable for Android home screen

### Color Palette
```css
--teal: #0F6E56      /* Primary - Buttons, headers, active states */
--amber: #EF9F27     /* Accent - Highlights, badges, alerts */
--white: #FFFFFF     /* Background - Cards, screens */
--light-gray: #F4F4F2 /* Surface - Secondary backgrounds */
--dark: #1F2937      /* Text - Primary content */
```

## Typography Hierarchy

- **Headings:** Poppins Semi-Bold (600)
- **Body:** Poppins Regular (400)
- **Buttons:** Poppins Medium (500)
- **Minimum Size:** 14px (for Urdu readability)

## Accessibility Features

- High contrast ratios for text
- Large touch targets (minimum 44px)
- Clear visual feedback for interactions
- Readable font sizes for Urdu and English

## Production Readiness

This UI kit is:
- ✅ Pixel-perfect and consistent
- ✅ Fully interactive and clickable
- ✅ Ready for design handoff
- ✅ Suitable for development implementation
- ✅ Optimized for user testing
- ✅ Ready for academic submission

## How to Use

### Navigation
- Start at the Splash Screen (`/`)
- Use the bottom navigation to switch between main sections
- All screens are interconnected for seamless flow
- Back buttons navigate to previous screens

### Testing the Flow
1. Wait for splash screen animation
2. Explore the live map with animated buses
3. Select a route to view details
4. Book a seat and complete payment
5. View your ticket with QR code
6. Check your profile and booking history

## Credits

**Developed for:**
- NUML University Faisalabad
- UX Design Lab Project
- Final Year Project (FYP)
- Real-Time Transit Tracking System

**Target Audience:**
- Public transport passengers in Faisalabad
- Urban commuters
- Students and working professionals

---

**Version:** 1.0.0  
**Last Updated:** May 5, 2026  
**License:** Academic Project