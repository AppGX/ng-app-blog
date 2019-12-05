import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces';

@Injectable()
export class AuthService {

constructor(private http: HttpClient) { }
login(user: User){

}
}


