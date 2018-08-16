import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { IAuthServiceToken, IAuthService } from '../services/auth/i-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        @Inject(IAuthServiceToken) private authService: IAuthService
    ) {
    }

    public intercept(req, next) {

        const user = this.authService.getUser();
        if (!user) {
            return next.handle(req);
        }

        const authRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${user.token}`)
        });

        return next.handle(authRequest);
    }
}
