import { Component, OnInit } from '@angular/core';
import { AdminService } from '@core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getDashboard();
  }
  getDashboard() {
    this.adminService
      .getDashboard()
      .subscribe((res) => (this.dashboardData = res));
  }
}
