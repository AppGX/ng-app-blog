import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private post: PostService) { }

  ngOnInit() {
    this.post$ = this.route.params
    .pipe(switchMap((params: Params) => {
      return this.post.getById(params['id']);
    }));
  }

}
