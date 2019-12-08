import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  submitted = false
  message: string;

  constructor(
    public auth:AuthService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe((params:Params)=>{
      if (params['loginAgain']){
        this.message = 'Пожалуйстаб введите данные'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit(){
    //console.log(this.form)
    if (this.form.invalid){
      return;
    }

    this.submitted = true
    const user:User =  {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, ()=>{
      this.submitted = false
    })
    //console.log(user)
  }

}
