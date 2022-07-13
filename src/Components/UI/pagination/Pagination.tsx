import { FC } from "react";
import MyButton from "../button/MyButton";

interface PaginationProps {
    changePage: Function;
    totalPages: number;
    page: number;
}

const Pagination: FC<PaginationProps> = ({ changePage, totalPages, page }) => {

    const pagesArray = []
    for (let i = 0; i < totalPages; i++) {
        pagesArray.push(i + 1);
    }
    return <div style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {pagesArray.map((p) => {
            if (p === page)
                return <MyButton
                    onClick={() => changePage(p)}
                    key={p}
                    isActivePage={true}>
                    {p.toString()}
                </MyButton>
            else return <MyButton
                onClick={() => changePage(p)}
                key={p}>
                {p.toString()}
            </MyButton>
        })}
    </div>
}
export default Pagination;