import { LoggedInUser } from './../../models/auth/logged-in-user';
import { Login } from './../../models/auth/login';
import { Task } from './../../tasks/task';
import { Register } from './../../models/auth/register';
import { InjectionToken } from '@angular/core';

export interface IAuthService {
    readonly isAuthenticated: boolean;

    register(register: Register, onRegistered?: (user: LoggedInUser) => void): void;

    login(login: Login, onLoggedIn?: (user: LoggedInUser) => void): void;

    logout(): void;

    getUser(): LoggedInUser;
}

export const IAuthServiceToken = new InjectionToken<IAuthService>('IAuthService');
