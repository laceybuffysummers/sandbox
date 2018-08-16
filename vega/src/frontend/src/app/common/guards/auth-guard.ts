import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { IAuthService, IAuthServiceToken } from '../services/auth/i-auth.service';

@Injectable()
export class AuthGuard
    implements CanActivate {

    constructor(
        @Inject(IAuthServiceToken) private authService: IAuthService
    ) {
    }

    public canActivate(): boolean {
        return this.authService.isAuthenticated;
    }
}
