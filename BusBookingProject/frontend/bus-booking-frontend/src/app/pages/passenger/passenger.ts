import { Router } from '@angular/router';

constructor(private router: Router) {
  this.bus = history.state.bus;
  this.seats = history.state.seats || [];
  this.totalPrice = history.state.totalPrice || 0;
}

confirmBooking() {
  if (!this.name || !this.age || !this.email || !this.phone) {
    alert('Please fill all details');
    return;
  }

  this.router.navigate(['/success'], {
    state: {
      name: this.name,
      age: this.age,
      email: this.email,
      phone: this.phone,
      bus: this.bus,
      seats: this.seats,
      totalPrice: this.totalPrice
    }
  });
}