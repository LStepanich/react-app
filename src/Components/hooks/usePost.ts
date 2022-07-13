import { useMemo } from "react";
import { PostInterface } from "../../types/post.interface";

export const useSortedPosts = (posts: PostInterface[], sort: 'body' | 'title' | '') => {
    const sortedPosts = useMemo(() => [...posts].sort((a, b) => {
        if (sort) {
            const f = a[sort].localeCompare(b[sort]);
            return f;
        }
        return 0;
    })
        , [sort, posts])
    return sortedPosts;
}

export const usePosts = (posts: PostInterface[], sort: 'body' | 'title' | '', query: string) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndFindedPosts = useMemo(() => {
        return sortedPosts.filter(
            (post) => post.title.toLowerCase().includes(query.toLowerCase())
        )
    }
        , [query, sortedPosts])
    return sortedAndFindedPosts;
}