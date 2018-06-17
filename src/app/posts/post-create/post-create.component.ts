import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostsService) { }

  ngOnInit() {
  }

  onAddedPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const title = form.value.title;
    const content = form.value.content;

    this.postService.addPost(title, content);
    form.resetForm();
  }
}
