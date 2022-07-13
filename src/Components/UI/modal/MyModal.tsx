import { FC, ReactNode } from "react";
import './MyModal.css'

interface MyModalProps {
    children: ReactNode;
    setVisible: Function;
}

const MyModal: FC<MyModalProps> = ({ children, setVisible }) => {
    const classes = ['myModal']
    classes.push('active')
    return (<div className={classes.join(' ')} onClick={() => { setVisible(false) }}>
        <div className="myModalContent" onClick={(e) => { e.stopPropagation() }}>
            {children}
        </div>

    </div>);
}

export default MyModal;