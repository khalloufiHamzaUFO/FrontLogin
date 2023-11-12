import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import {JwtService} from "../_services/jwt-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = "ROLE_USER";

  constructor(private authService: AuthService, private storageService: StorageService,private jwtService:JwtService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().role;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        const token = data.accessToken;

        const decodedToken = this.jwtService.decodeToken(token);
        console.log('Decoded Token:', decodedToken); // Log the decoded token

        this.storageService.saveUser(decodedToken);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = decodedToken.roles;
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
