import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription

  constructor(private auth: AuthService,
    private postService: PostService) { }

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe( posts => {
      this.posts = posts;
      console.log(posts)
    })
  }

  ngOnDestroy(): void{
    if (this.pSub){
      this.pSub.unsubscribe()
    }
  }

  remove(id: string){

  }

}
