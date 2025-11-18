import { Component, Pipe } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AttendanceService } from '../../../services/attendance.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  records: any[] = [];

  constructor(private auth: AuthService, private attendance: AttendanceService) { }

  ngOnInit() {
    const user = this.auth.currentUser();
    if (user) {
      this.records = this.attendance.getHistoryForUser(user.id);
    }
  }
}
