import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue():User{
     return this.currentUserSubject.value;
   }

   login(username: string, password: string){
     return this.http.post<any>('/users/authenticate', {username, password}).pipe(
       map(user => {
         if (user && user.token) {
           localStorage.setItem('currentUser', JSON.stringify(user));
           this.currentUserSubject.next(user);
         }
         return user;
       })
     );
   }

   validateEmail(email: string) {
     return this.http.post<any>('/users/validateEmail', {email}).pipe(
       map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
