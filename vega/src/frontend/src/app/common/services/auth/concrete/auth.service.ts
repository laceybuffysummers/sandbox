import { LoggedInUser } from './../../../models/auth/logged-in-user';
import { HttpTask } from './../../../tasks/http-task';
import { Login } from './../../../models/auth/login';
import { Task } from './../../../tasks/task';
import { Register } from './../../../models/auth/register';
import { Injectable, Inject } from '@angular/core';
import { IAuthService } from '../i-auth.service';
import { IConfigService, IConfigServiceToken } from '../../config/i-config-service';

@Injectable()
export class AuthService
    implements IAuthService {

    private USER = 'user';

    constructor(
        @Inject(IConfigServiceToken) private configService: IConfigService) {
    }

    protected getBaseUrl(): string {
        return this.configService.getApiBaseUrl() + 'auth';
    }

    public get isAuthenticated(): boolean {
        return !!localStorage.getItem(this.USER);
    }

    public register(register: Register, onRegistered?: (user: LoggedInUser) => void): void {
        return HttpTask.create(`${this.getBaseUrl()}/register`).post(register)
            .exec((user: LoggedInUser) => {
                this.authenticate(user);
                if (onRegistered) {
                    onRegistered(user);
                }
            });
    }

    public login(login: Login, onLoggedIn?: (user: LoggedInUser) => void): void {
        return HttpTask.create(`${this.getBaseUrl()}/login`).post(login)
            .exec((user: LoggedInUser) => {
                this.authenticate(user);
                if (onLoggedIn) {
                    onLoggedIn(user);
                }
            });
    }

    public logout(): void {
        localStorage.removeItem(this.USER);
    }

    public getUser(): LoggedInUser {
        return JSON.parse(localStorage.getItem(this.USER));
    }

    private authenticate(user: LoggedInUser): void {
        localStorage.setItem(this.USER, JSON.stringify(user));
    }
}

