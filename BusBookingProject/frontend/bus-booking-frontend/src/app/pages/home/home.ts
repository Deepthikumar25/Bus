import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  fromCity: string = '';
  toCity: string = '';
  buses: any[] = [];
  searchClicked: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  searchBuses() {
    this.searchClicked = true;

    const url = `https://symmetrical-waffle-r4p57r9g6q79fpjxq-5181.app.github.dev/api/Buses/search?fromCity=${this.fromCity}&toCity=${this.toCity}`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.buses = data;
      },
      error: (error) => {
        console.error('Error fetching buses:', error);
        this.buses = [];
      }
    });
  }

  goToSeats(bus: any) {
    this.router.navigate(['/seats'], {
      state: { selectedBus: bus }
    });
  }
}