import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonToolbar, IonHeader, IonicModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = 'alice@example.com';
  password = 'password';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  async submit() {
    try {
      const user = await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/dashboard');
    } catch (err: any) {
      this.error = err?.toString() || 'Login failed';
    }
  }

}
