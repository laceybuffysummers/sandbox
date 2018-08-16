import { Component, OnInit, Inject } from '@angular/core';
import { IAuthServiceToken, IAuthService } from '../../../common/services/auth/i-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(
    @Inject(IAuthServiceToken) private auth: IAuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
  }

  private logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
