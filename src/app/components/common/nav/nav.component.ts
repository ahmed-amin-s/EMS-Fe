import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isLoggedIn?: boolean;

  constructor(private router: Router, private authService: AuthService) {
    if (localStorage.getItem('token')) {
      this.authService.isLoggedIn$.subscribe((status) => {
        this.isLoggedIn = status; // Update UI based on login state
      });
    }
  }
  logout() {
    // this.isLoggedIn = false;
    this.authService.logout(); // Clear token and update state

    // localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
