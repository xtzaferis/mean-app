import { Post } from "./post.model";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { post } from "selenium-webdriver/http";

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private postsUpdaded = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))
            .subscribe((transformedPosts) => {
                this.posts = transformedPosts;
                this.postsUpdaded.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdaded.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
            .subscribe(response => {
                post.id = response.postId;
                this.posts.push(post);
                this.postsUpdaded.next([...this.posts]);
            });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(p => p.id !== postId);
                this.posts = updatedPosts;
                this.postsUpdaded.next([...this.posts]);
            });
    }
}