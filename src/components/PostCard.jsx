import { useState } from 'react'
import {
    HeartOutlined, UserOutlined, MoreOutlined, CheckCircleOutlined, AliwangwangOutlined, TagsOutlined, EyeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { Popover, Button, message } from 'antd';
import { PostService } from '../services/PostService';
import { Reactions } from '../services/Reactions';
import { useInfoContext } from '../context/InfoContext';

const PostCard = ({ item, page }) => {
    const { author, views, image, like, title, content, comments, _id } = item;
    const { user, isPostChange, setIsPostChange, postLoading, setPostLoading } = useInfoContext();

    const handleDelete = async () => {
        setPostLoading(true)
        try {
            const data = await PostService.deletePost(_id);
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
        setPostLoading(false)
    }

    const handleLike = async () => {
        try {
            const data = await Reactions.like(_id);
            message.success('added!');
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDislike = async () => {
        try {
            const data = await Reactions.dislike(_id);
            setIsPostChange(!isPostChange);
            message.success('canceled!')
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckComment = comments => {
        if (comments.length === 0) return <p>Nothing Commentd yet!</p>
        else return <Link to={`/post/${_id}`}>view all {comments.length} comments</Link>
    }

    return (
        <div className='max-w-[200px] ss:max-w-[300px] sm:max-w-[500px] mb-10 overflow-hidden '>
            <div className="flex flex-col-reverse items-center justify-between mb-1 ss:flex-row">
                <div className="flex items-center justify-left py-1 gap-2">
                    <div className=""><UserOutlined /></div>
                    <div className="flex items-center justify-start">
                        <h3 className='font-medium'>{author[0].name} <CheckCircleOutlined className='text-blue-400 ml-1 text-xs ss:text-md' /></h3>
                        <span className='w-[2px] h-[2px] ss:w-1 ss:h-1 bg-black rounded-full mx-[4px] ss:mx-[6px]'></span>
                        <span>{views} <EyeOutlined /></span>
                    </div>
                </div>
                {
                    page === 'profile' ?
                        <div>
                            <Popover content={
                                <div className='flex justify-center'>
                                    <Button onClick={() => handleDelete()} loading={postLoading}>Delete</Button>
                                </div>} title='Options' trigger='click'>
                                <Button className='flex items-center justify-center'><MoreOutlined className='leading-3 cursor-pointer text-xl' /></Button>
                            </Popover>
                        </div> : null
                }
            </div>
            <Link to={`/post/${_id}`} >
                <div className='w-full h-auto mb-2 flex items-center justify-center'>
                    <img src={image.url} className="w-full" alt="" />
                </div>
            </Link>
            <div className="flex flex-col items-start">
                <div className="w-full flex items-center justify-between text-2xl mb-3">
                    <div className='flex items-center justify-start gap-3'>
                        {
                            like.find(item => item === user?._id) ?
                                <HeartOutlined onClick={handleDislike} className='text-red-600' /> :
                                <HeartOutlined onClick={handleLike} />
                        }
                        <Link to={`/post/${_id}`} >
                            <AliwangwangOutlined />
                        </Link>
                    </div>
                    <TagsOutlined />
                </div>
                <div className="mb-2">
                    <h3 className='font-normal text-sm'>{like.length} likes</h3>
                    <p className='font-medium mb-1 text-lg'>{title}</p>
                    <p className='text-[12px] font-normal'>{content}</p>
                    {/* line-clamp-2 */}
                </div>
                <div className="text-gray-400 font-medium">
                    <div className="">{handleCheckComment(comments)}</div>
                </div>
            </div>
        </div>
    )
}

export default PostCard
