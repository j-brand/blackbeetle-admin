import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@core/services/post.service';
import { Post } from '@core/models/post';

@Component({
  selector: 'app-edit-post-index',
  templateUrl: './edit-post-index.component.html',
  styleUrls: ['./edit-post-index.component.scss'],
})
export class EditPostIndexComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.getPost(parseInt(id));
  }

  getPost(id: number) {
    this.postService.getPost(id).subscribe((post) => (this.post = post));
  }
}
