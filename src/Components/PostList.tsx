
import React from "react";
import { FC, forwardRef, RefObject } from "react";
import Post from "./Post";

interface PostsProps {
    title: string;
    posts: {
        id: number;
        number: number;
        title: string;
        body: string;
    }[]
}

const PostList = forwardRef<HTMLDivElement, PostsProps>(({ posts, title }, lastElementRef) => {
    if (!posts.length) {
        return (<h1 style={{ textAlign: 'center', marginTop: '10px' }}>No any posts</h1>)
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>

            {posts.map((post, index) => (
                <Post post={{ ...post, number: index + 1 }} key={post.id} />
            ))}
            <div ref={lastElementRef} style={{ width: '100%', height: '10px', backgroundColor: 'red' }} />
        </div>);
})

export default PostList;