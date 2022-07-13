import { FC } from "react"
import MyInput from "./UI/input/MyInput"
import MySelect from "./UI/select/MySelect"

interface PostFilterProps {
    filter: {
        sort: 'body' | 'title' | '';
        query: string;
    };
    setFilter: Function
}
const PostFilter: FC<PostFilterProps> = ({ filter, setFilter }) => {
    return (
        <div>
            <MySelect
                options={[{ value: 'title', name: 'title' }, { value: 'body', name: 'text' }]}
                defaultValue={'your choise'}
                value={filter.sort}
                onChange={(selectedSort: 'title' | 'body') => {
                    setFilter({ ...filter, sort: selectedSort })
                }} />
            <MyInput
                placeholder='Search'
                value={filter.query}
                onChange={(e: { target: HTMLInputElement }) => {
                    setFilter({ ...filter, query: e.target.value })
                }} />
        </div>)
}
export default PostFilter;