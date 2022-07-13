import React from "react";
import { PostInterface } from "../types/post.interface";

export interface EditRemoveContextInterface {
    delete: (post: PostInterface) => void;
    edit: (post: PostInterface) => void;
}

const defaultValue = {
    delete: () => undefined,
    edit: () => undefined,
}

const EditRemoveContext = React.createContext<EditRemoveContextInterface>(defaultValue)

export default EditRemoveContext;
