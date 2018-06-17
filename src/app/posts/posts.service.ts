import { Post } from "./post.model";
import { Subject } from 'rxjs';

export class PostsService {
    private posts: Post[] = [];
    private postsUpdaded = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postsUpdaded.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { title: title, content: content }
        this.posts.push(post);
        this.postsUpdaded.next([...this.posts]);
    }
}