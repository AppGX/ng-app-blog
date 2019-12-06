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
  const expDate = new Date(localStorage.getItem('fb-token-exp'))
  if (new Date()> expDate){
    return null;
    this.logout();
  }
  return localStorage.getItem('fb-token')
}

private setToken(responce: FbAuthResponce | null){
  ///console.log('auth.setToken', responce)
  if (responce){
  //console.log('auth.setToken', responce)
  const expDate = new Date(new Date().getTime()+ +responce.expiresIn * 1000)
  localStorage.setItem('fb-token', responce.idToken)
  localStorage.setItem('fb-token-exp', expDate.toString())
  } else {
    localStorage.clear();
  }
}

login(user: User):Observable<any>{
user.returnSecureToken = true
  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
  .pipe(
    tap(this.setToken)
  )
}

logout(){
  this.setToken(null)
}

isAuthenticated():boolean{
    return !!this.token;
}
}


