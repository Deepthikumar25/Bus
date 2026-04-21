import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SeatSelectionComponent } from './pages/seat-selection/seat-selection';
import { PassengerComponent } from './pages/passenger/passenger';
import { BookingSuccessComponent } from './pages/booking-success/booking-success';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seats', component: SeatSelectionComponent },
  { path: 'passenger', component: PassengerComponent },
  { path: 'success', component: BookingSuccessComponent }
];