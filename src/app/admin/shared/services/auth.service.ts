import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, FbAuthResponce } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    

constructor(private http: HttpClient) { }

get token(): string{
    return ''
}

private setToken(responce: FbAuthResponce){
  console.log('auth.setToken', responce)
}

login(user: User):Observable<any>{

  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
  .pipe(
    tap(this.setToken)
  )
}

logout(){

}

isAuthenticated():boolean{
    return !!this.token;
}
}


