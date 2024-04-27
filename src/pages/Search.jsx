import { useRef, useState } from 'react'

import { Input, Button, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { PostService } from '../services/PostService'
import PostCard from '../components/PostCard'
import debounce from 'lodash.debounce'

const Search = () => {
    const [searchedPost, setSearchedPost] = useState(null);

    const handleSearch = debounce(async event => {
        try {
            if (event.target.value.length < 4) return;
            const response = await PostService.searchPost(`${event.target.value}`);
            setSearchedPost(response);
        } catch (error) {
            message.error(error.response.data.message);
        }
    }, [1000])

    return (
        <div className='w-full h-full flex flex-col items-start justify-start'>
            <div className='w-96 flex items-center justify-center m-auto my-5'>
                <Input placeholder='Search posts by title' onChange={handleSearch}></Input>
            </div>
            <div>{
                searchedPost?.reverse().map((item, i) => {
                    return <PostCard key={i} item={item} />;
                })
            }</div>
        </div>
    )
}

export default Search