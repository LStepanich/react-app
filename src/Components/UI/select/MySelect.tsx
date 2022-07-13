import { FC } from "react";

interface MySelectProps {
    options: { value: string, name: string, }[];
    defaultValue: string;
    value: 'body' | 'title' | '';
    onChange: Function;
}

const MySelect: FC<MySelectProps> = ({ options, defaultValue, value, onChange }) => {
    return (
        <div>
            <select value={value} onChange={e => { onChange(e.target.value) }}>
                <option disabled value=''>{defaultValue}</option>
                {options.map((option) => <option key={option.value} value={option.value}>By {option.name}</option>)}
            </select>
        </div >);
}

export default MySelect;