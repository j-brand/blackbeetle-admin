import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@api/post.service';
import { Post } from '@model/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
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
