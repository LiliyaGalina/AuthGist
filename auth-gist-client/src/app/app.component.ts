import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'auth-gist-client';
  accessToken: string;  
 
  constructor(private adalService: MsAdalAngular6Service) {  
  
  }  
  
  
  login(): void {  
    this.adalService.login();  
  }  
  
  logout(): void {  
    this.adalService.logout();  
  }  
  
  getLoggedInUser(): any {  
    return this.adalService.LoggedInUserEmail;  
  }  
  
  getAccessToken(): Observable<any> {  
    return this.adalService.acquireToken('backend-api-uri');  
  }  
  
  getToken(): string {  
    const token =  this.adalService.accessToken;  
    return token;
  }  
}
