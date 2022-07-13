import React from "react";
import { FC, SyntheticEvent, useState } from "react";
import { PostInterface } from "../types/post.interface";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

interface PostFormProps {
    action: Function;
    post?: PostInterface;
}

const PostForm: FC<PostFormProps> = ({ action, post }) => {

    const [title, setTitle] = useState(post?.title);
    const [body, setBody] = useState(post?.body);

    let actionType: string;

    post ? actionType = 'Edit' : actionType = 'Create'

    const addNewPost = (e: SyntheticEvent) => {
        e.preventDefault();
        const newPost = {
            id: Math.random(),
            title: title,
            body: body,
            number: undefined,
        }
        action(newPost);
    }

    const editPost = (e: SyntheticEvent) => {
        e.preventDefault();
        const editedPost = {
            id: post?.id,
            title: title,
            body: body,
            number: post?.number,
        }


        action(editedPost);
    }

    return (
        <div>
            <form>
                <MyInput
                    type='text'
                    placeholder='Title'
                    value={title || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }} />
                <MyInput
                    type='text'
                    placeholder='Text'
                    value={body || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setBody(e.target.value) }} />
                <MyButton onClick={post ? editPost : addNewPost}>{actionType}</MyButton>
            </form>
        </div>
    )
}
export default PostForm;