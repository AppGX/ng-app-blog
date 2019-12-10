import { AlertService } from './../shared/services/alert.service';
import { Post } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submited = false;

  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.route.params
    .pipe(
      switchMap((params: Params)=>{
        return this.postService.getById(params["id"]);
      }))
      .subscribe((post: Post) => {
        this.post = post;
        // console.log("Init: ", post);
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
      });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    // console.log(this.post)
    this.submited = true;
    this.uSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submited = false;
      this.alert.danger('Пост был обновлен');
    });
  }

}
