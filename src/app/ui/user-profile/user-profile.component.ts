import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../data-transfer.service';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {

  constructor(
    public auth: AuthService,
    private dataService: DataTransferService,

  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.dataService.sendLoggedUser(user);
    });
  }

  logout() {
    this.auth.signOut();
  }
}
