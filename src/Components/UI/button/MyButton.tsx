
import { FC } from "react";
import './MyButton.css'

interface MyButtonProps {
    readonly children: string;
    readonly isActivePage?: boolean;
    [key: string]: any;
}

const MyButton: FC<MyButtonProps> = ({ isActivePage, ...props }) => {

    const buttonClass = isActivePage ? 'myButton submited' : 'myButton'

    return (
        <button {...props} className={buttonClass}>
            {props.children}
        </button >
    );
}

export default MyButton;