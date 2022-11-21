import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {KeepAliveService} from '../../core/services/keep-alive/keep-alive.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedDashboardItem = 'Projects';

  constructor(private keepAliveService: KeepAliveService) {
  }

  ngOnInit(): void {

  }

  setSelectedDashboard(selected: string): void {
    this.selectedDashboardItem = selected;
    this.keepAliveService.keepAlive();
  }
}
