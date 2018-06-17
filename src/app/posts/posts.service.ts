import { Post } from "./post.model";
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private postsUpdaded = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postsUpdaded.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdaded.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content }
        this.posts.push(post);
        this.postsUpdaded.next([...this.posts]);
    }
}