import { Component, OnInit } from '@angular/core';
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
  token: string;
  response = null;

  constructor(private adalService: MsAdalAngular6Service,
    private http: HttpClient) {

    this.token = this.adalService.accessToken;
    this.adalService.acquireToken('https://localhost:44321').subscribe(
      token => this.accessToken = token);

  }

  getResponse() {

    const token = this.accessToken;
    const authtoken = `Bearer ${token}`;
    const headerss = new HttpHeaders().set('Authorization', authtoken);

    this.http.get('https://localhost:44321/WeatherForecast', {
      headers: headerss
    }).subscribe(data => {
      this.response = data;
    });

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
    return this.adalService.acquireToken('https://localhost:44321');
  }

  copyIntoBuffer(content) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = content;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
