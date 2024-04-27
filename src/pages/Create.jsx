import { useRef, useState } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { PostService } from '../services/PostService';

const Create = () => {
  const [image, setImage] = useState(null);
  const title = useRef();
  const content = useRef();

  const handleCreatePost = async () => {
    try {
      let formData = new FormData();
      formData.append('title', title.current.value);
      formData.append('content', content.current.value);
      formData.append('image', image);
      const data = await PostService.createPost(formData);
      message.success(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-[600px] flex flex-col items-center justify-start py-5'>
      <input id='post' type='file' accept='image/*' className='border hidden' onChange={e => setImage(e.target.files[0])} />
      <label htmlFor="post" className='w-full h-[400px] border-2 border-sky-200 border-dashed flex items-center justify-center text-2xl rounded-md'>
        {
          image ?
            <img src={URL.createObjectURL(image)} alt="" className='w-full h-full object-cover rounded-md' /> :
            <PlusSquareOutlined />
        }
      </label>
      <input type="text" placeholder='title' className='w-full my-5 shadow-md outline-none p-2 border' ref={title} />
      <textarea cols="30" rows="3" placeholder='write something...' className='w-full shadow-md outline-none p-2 resize-none border' ref={content}></textarea>
      <Button className='my-5' onClick={() => handleCreatePost()}>create</Button>
    </div>
  )
}

export default Create;