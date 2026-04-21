import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  imports: [CommonModule],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css'
})
export class SeatSelectionComponent {
  selectedBus: any;
  seats: any[] = [];
  selectedSeats: string[] = [];

  constructor(private router: Router) {
    this.selectedBus = history.state.selectedBus;

    for (let i = 1; i <= 20; i++) {
      this.seats.push({
        seatNumber: `L${i}`,
        booked: [3, 7, 12].includes(i),
        selected: false
      });
    }
  }

  toggleSeat(seat: any) {
    if (seat.booked) return;

    seat.selected = !seat.selected;

    if (seat.selected) {
      this.selectedSeats.push(seat.seatNumber);
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat.seatNumber);
    }
  }

  getTotalPrice(): number {
    if (!this.selectedBus) return 0;
    return this.selectedSeats.length * this.selectedBus.price;
  }

  goToPassenger() {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    this.router.navigate(['/passenger'], {
      state: {
        bus: this.selectedBus,
        seats: this.selectedSeats,
        totalPrice: this.getTotalPrice()
      }
    });
  }
}