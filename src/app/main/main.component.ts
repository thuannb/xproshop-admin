import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
import { LoggedInUser } from '../core/domain/loggedin.user';
import { SystemConstants } from '../core/common/system.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public modelUser: LoggedInUser;

  constructor(private _authenService: AuthenService,
    private _utilityService: UtilityService) { }

  ngOnInit() {
    this.modelUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    console.log(this.modelUser);
  }

  logout() {
    this._authenService.logout();
    this._utilityService.navigateToLogin();
  }
}
