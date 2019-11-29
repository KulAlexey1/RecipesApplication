import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class CustomHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Action before every request');
        console.log(req);

        return next.handle(req).pipe(
            tap((event) => {
                console.log('Action after every request');
                console.log(event);
            })
        );
    }
}
