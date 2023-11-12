import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private role: string= "ROLE_USER";
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private router : Router ,private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log("User Object:", user); // Log the user object
      this.role = user.role;
      console.log("Roleee" + this.role);

      this.showAdminBoard = this.role.includes("ROLE_ADMIN");
      this.showModeratorBoard = this.role.includes("ROLE_USER");

      this.username = user.email;
    }
  }

  logout(): void {
    window.sessionStorage.removeItem("auth-user");
    this.router.navigate(['/login']); // or navigate to the home pag
  }
}
