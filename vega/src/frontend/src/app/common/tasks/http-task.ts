import { Task } from './task';
import { ServiceLocator } from './../infrastructure/service-locator';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HttpTask {
    constructor(
        protected url: string,
        protected http: HttpClient
    ) { }

    public static create(url: string): HttpTask {
        const task = new HttpTask(
            url,
            ServiceLocator.injector.get(HttpClient)
        );

        return task;
    }

    public get<T>(): Task<T> {
        return Task.create(this.http.get(this.url)
            .map(res => <T>res));
    }

    public post<T>(model: any): Task<T> {
        const body = JSON.stringify(model);
        const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json');

        return Task.create(this.http.post(this.url, body, { headers: headers })
            .map(res => <T>res));
    }

    public put<T>(model: any): Task<T> {
        const body = JSON.stringify(model);
        const headers = new HttpHeaders()
                        .set('Content-Type', 'application/json');

        return Task.create(this.http.put(this.url, body, { headers: headers })
            .map(res => <T>res));
    }

    public delete<T>(): Task<T> {
        return Task.create(this.http.delete(this.url)
            .map(res => <T>res));
    }
}
