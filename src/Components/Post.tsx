import { FC, useContext } from "react";
import { PostInterface } from "../types/post.interface";
import EditRemoveContext, { EditRemoveContextInterface } from "./EditRemoveContext";
import MyButton from "./UI/button/MyButton";

interface PostProps {
    key: number;
    post: PostInterface;
}

const Post: FC<PostProps> = ({ post }) => {
    const editRemoveContext = useContext<EditRemoveContextInterface>(EditRemoveContext);
    return (
        <div className="post">
            <div className="post_content">
                <strong>{post.number}: {post.title}</strong>
                <div>{post.body}</div>
            </div>
            <div>
                <MyButton onClick={() => editRemoveContext.edit(post)}>Edit</MyButton>
                <MyButton onClick={() => editRemoveContext.delete(post)}>Delete</MyButton>

            </div>
        </div>)
}

export default Post;