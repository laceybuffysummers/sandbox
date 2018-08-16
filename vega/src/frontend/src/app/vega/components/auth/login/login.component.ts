import { IProcessServiceToken, IProcessService } from './../../../../common/services/process/i-process-service';
import { Login } from './../../../../common/models/auth/login';
import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../../../common/components/common/base.component';
import { IAuthServiceToken, IAuthService } from '../../../../common/services/auth/i-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent
  extends BaseComponent implements OnInit {

  private model: Login = new Login('', '');

  constructor(
      @Inject(IProcessServiceToken) protected processService: IProcessService,
      @Inject(IAuthServiceToken) private authService: IAuthService,
      private router: Router
  ) {
      super(processService);
  }

  public ngOnInit(): void {
  }

  private onLogin(): void {
      this.authService.login(this.model, user => {
          this.router.navigate(['/']);
      });
  }
}
