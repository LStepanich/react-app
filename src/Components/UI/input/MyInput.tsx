import { FC } from "react";
import './MyInput.css'

interface MyInputProps {
    [key: string]: any;
}

const MyInput: FC<MyInputProps> = ({ ...props}) => {

    return (
        <input {...props} className='myInput' />
    );
}

export default MyInput;