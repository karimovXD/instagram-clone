import { useState } from 'react'

import { Input, message } from 'antd'
import { PostService } from '../services/PostService'
import PostCard from '../components/PostCard'
import debounce from 'lodash.debounce'

const Search = () => {
    const [searchedPost, setSearchedPost] = useState(null);
    console.log(searchedPost);

    const handleSearch = debounce(async event => {
        try {
            if (event.target.value.length < 4) return;
            const response = await PostService.searchPost(`${event.target.value}`);
            setSearchedPost(response);
        } catch (error) {
            message.error(error.response.data.message);
        }
    }, [1500])

    return (
        <div className='w-full h-full flex flex-col items-start justify-start'>
            <div className='w-96 flex items-center justify-center m-auto my-5'>
                <Input placeholder='Search posts by title' onChange={handleSearch} className='w-auto'></Input>
            </div>
            <div className='w-full flex flex-col items-center justify-center'>{
                searchedPost ? searchedPost.reverse().map((item, i) => {
                    return <PostCard key={i} item={item} />;
                }) : <div>👀</div>
            }</div>
        </div>
    )
}

export default Search