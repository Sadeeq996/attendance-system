import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RosterService } from '../../services/roster.service';
import { AttendanceService } from '../../services/attendance.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  user: any;
  assignedShift: 'morning' | 'night' | null = null;
  message = '';
  todayDate = new Date().toISOString().slice(0, 10);
  today: string = '';
  constructor(
    private auth: AuthService,
    private roster: RosterService,
    private attendance: AttendanceService
  ) { }

  ngOnInit() {
    this.user = this.auth.currentUser();
    this.today = new Date().toISOString().slice(0, 10);
    this.assignedShift = this.roster.getShiftForUserOnDate(this.user.id, this.today);
  }

  async clockIn() {
    this.message = '';
    try {
      if (!this.assignedShift) throw new Error('No shift assigned today');
      await this.attendance.clockIn(this.user.id, this.user.hospitalId, this.assignedShift);
      this.message = 'Clock In recorded';
    } catch (e: any) {
      this.message = e?.message || 'Failed';
    }
  }

  async clockOut() {
    this.message = '';
    try {
      if (!this.assignedShift) throw new Error('No shift assigned today');
      await this.attendance.clockOut(this.user.id, this.user.hospitalId, this.assignedShift);
      this.message = 'Clock Out recorded';
    } catch (e: any) {
      this.message = e?.message || 'Failed';
    }
  }
}
