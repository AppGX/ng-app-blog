import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
//import { User } from '../../../shared/interfaces';
import { User } from 'src/app/shared/interfaces';

@Injectable()
export class AuthService {

constructor(private http: HttpClient) { }
login(user: User){

}
}


