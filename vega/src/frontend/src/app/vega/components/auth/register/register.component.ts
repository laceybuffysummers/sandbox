import { IAuthServiceToken, IAuthService } from './../../../../common/services/auth/i-auth.service';
import { IProcessServiceToken, IProcessService } from './../../../../common/services/process/i-process-service';
import { Register } from './../../../../common/models/auth/register';
import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../../../common/components/common/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent
  extends BaseComponent implements OnInit {

    private model: Register = new Register('', '', '');

    constructor(
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        @Inject(IAuthServiceToken) private authService: IAuthService,
        private router: Router
    ) {
        super(processService);
    }

    public ngOnInit(): void {
    }

    private onRegister(): void {
        this.authService.register(this.model, user => {
            this.router.navigate(['/']);
        });
    }
}
