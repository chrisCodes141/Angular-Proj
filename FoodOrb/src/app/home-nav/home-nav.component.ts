import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces';
import { AuthenticationService } from '../services';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
      })
   }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    if(this.currentUserSubscription){
      this.currentUserSubscription.unsubscribe();
    }
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

}
