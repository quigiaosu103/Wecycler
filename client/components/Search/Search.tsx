'use client'
import React, { ChangeEvent, useState } from 'react';
import { BiSearch } from "react-icons/bi";

export type SearchProps = {
    onSearch: (value: string) => void
}

const Search = (props: SearchProps) => {
    const { onSearch } = props;
    const [value, setValue] = useState('Enter search...');

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Here, we call the onSearch function and pass the value
            onSearch(value);
        }
    };

    return (
        <div className="relative w-full text-gray-600">
            <input
                type="search"
                name="search"
                placeholder={value}
                className="bg-white h-10 px-5 pr-10 w-full border-2 border-[#DEDEDE] rounded-lg text-sm focus:outline-none shadow"
                onChange={(event) => searchHandler(event)}
                onKeyDown={handleKeyDown}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-3 text-xl">
                <BiSearch/>
            </button>
        </div>
    );
};

export default Search;