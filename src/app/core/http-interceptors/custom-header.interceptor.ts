import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class CustomHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Action before every request');
        const modifiedRequest = req.clone({
            headers: req.headers.append('Custom-Header', 'Custom-Value')
        });
        console.log(modifiedRequest);

        return next.handle(modifiedRequest).pipe(
            tap((event) => {
                console.log('Action after every request');
                console.log(event);
            })
        );
    }
}
