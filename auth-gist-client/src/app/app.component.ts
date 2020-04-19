import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'auth-gist-client';
  accessToken: string;
  response = null;

  constructor(private adalService: MsAdalAngular6Service,
    private http: HttpClient) {

  }

  getResponse() {
    this.adalService.acquireToken('backend-api-uri').subscribe(
      token => {
        const authtoken = `Bearer ${token}`;
        const headerss = new HttpHeaders().set('Authorization', authtoken);

        this.http.get("https://localhost:44321/WeatherForecast", {
          headers: headerss
        }).subscribe(data => {
          this.response = data;
        });

      }
    )

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

  copyToken() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.getToken();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getToken(): string {
    const token = this.adalService.accessToken;
    return token;
  }
}
