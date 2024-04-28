import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PostService } from '../services/PostService';
import { message, Button } from 'antd'
import { useInfoContext } from '../context/InfoContext';
import { HeartOutlined, SendOutlined, TagsOutlined, DeleteOutlined, EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Reactions } from '../services/Reactions';
import moment from 'moment';
import { CommentService } from '../services/CommentService';

//components
import { OnePostSkeleton } from '../components/skeleton/PostSkeleton';

const OnePostInfo = () => {
    const { id } = useParams();
    const [currentPost, setCurrentPost] = useState(null);
    const [openComment, setOpenComment] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const inputRef = useRef();
    const changeInputRef = useRef();

    const { user, isPostChange, setIsPostChange, postLoading, setPostLoading } = useInfoContext();

    const handleOnePost = async () => {
        try {
            let data = await PostService.getPostId(id);
            setCurrentPost(data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLike = async () => {
        try {
            const data = await Reactions.like(currentPost._id);
            message.success('added!');
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDislike = async () => {
        try {
            const data = await Reactions.dislike(currentPost._id);
            message.success('canceled!');
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckComment = comments => {
        if (comments.length === 0) return 'Nothing Commentd yet!'
        else return `view all ${comments.length} comments`
    }

    const handleAddComment = async e => {
        e.preventDefault();
        setPostLoading(true);
        try {
            const obj = {
                postId: id,
                content: inputRef.current.value,
            }
            const data = await CommentService.addComment(obj);
            message.success('Comment Added');
            setIsPostChange(!isPostChange)
        } catch (error) {
            console.log(error);
        }

        setPostLoading(false)
    }

    const handleDeleteComment = async id => {
        setPostLoading(true)
        try {
            const response = await CommentService.deleteComment(id);
            message.success('comment deleted!')
            setIsPostChange(!isPostChange)
        } catch (error) {
            console.log(error);
        }
        setPostLoading(false)
    }

    const handleUpdateComment = async () => {
        try {
            await CommentService.updateComment(editingId, { content: changeInputRef.current.value, });
            message.success('changed!')
            setEditingId(null);
            setIsPostChange(!isPostChange)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleOnePost()
    }, [isPostChange])

    return (
        currentPost ?
            <div className='w-full py-5 px-10 flex items-start justify-center'>
                <div className='w-[700px]'>
                    <img src={currentPost.image.url} alt="post image" className='w-[700px] h-[500px] object-cover' />
                    <div className="flex flex-col items-start">
                        <div className="w-full flex items-center justify-between text-2xl my-3">
                            <div className='flex items-center justify-start gap-3'>
                                {
                                    currentPost.like.find(item => item === user?._id) ?
                                        <HeartOutlined onClick={handleDislike} className='text-red-600' /> :
                                        <HeartOutlined onClick={handleLike} />
                                }
                            </div>
                            <TagsOutlined />
                        </div>
                        <div className="mb-2">
                            <h3 className='font-normal text-sm'>{currentPost.like.length} likes</h3>
                            <p className='font-medium mb-1 text-lg'>{currentPost.title}</p>
                            <p className='text-[12px] font-normal'>{currentPost.content}</p>
                            {/* line-clamp-2 */}
                        </div>
                        <div className="w-full text-gray-400 font-medium mb-5">
                            <span className="cursor-pointer" onClick={() => setOpenComment(!openComment)}>{handleCheckComment(currentPost.comments)}</span>
                            <form className='flex items-center justify-between h-10 mt-2' onSubmit={handleAddComment}>
                                <input type="text" placeholder='Add comment' className='border-2 w-full h-full py-1 px-2 text-black text-sm' ref={inputRef} />
                                <Button loading={postLoading} className='h-full ml-1 w-20' icon={<SendOutlined className='text-2xl w-auto h-auto' />}></Button>
                            </form>
                        </div>
                        <div className='w-full'>
                            {
                                openComment ?
                                    currentPost.comments.map((item, i) => {

                                        return (
                                            <div key={item._id} className='w-full h-auto p-2 border-b-[1px] my-2 overflow-hidden flex items-center justify-between'>
                                                <div className='w-full'>
                                                    <div className='flex items-center justify-start text-gray-600 text-sm font-light mb-1'>
                                                        <h3 className='font-normal'>{item.author[0].name}</h3>
                                                        <span className='w-[3px] h-[3px] bg-black rounded-full mx-2 select-none'></span>
                                                        <span>{moment(item.updatedAt, 'YYYYMMDD').fromNow()}</span>
                                                    </div>
                                                    <div className='pr-14'>{
                                                        item._id === editingId ?
                                                            <input type="text" placeholder='change comment' className='border w-full text-sm py-1 px-2' ref={changeInputRef} /> :
                                                            <p className='text-md'>
                                                                {item.content}
                                                            </p>
                                                    }</div>
                                                </div>
                                                {
                                                    item?.authorId === user?._id &&
                                                    <div>{
                                                        item._id === editingId ?
                                                            <div className='flex gap-2'>
                                                                <Button icon={<CheckOutlined />} onClick={() => handleUpdateComment(item?._id)} />
                                                                <Button loading={postLoading} icon={<DeleteOutlined />} onClick={() => handleDeleteComment(item?._id)} />
                                                            </div> :
                                                            <div className='flex gap-2'>
                                                                <Button icon={<EditOutlined />} onClick={() => setEditingId(item._id)} />
                                                                <Button loading={postLoading} icon={<DeleteOutlined />} onClick={() => handleDeleteComment(item?._id)} />
                                                            </div>
                                                    }</div>
                                                }
                                            </div>
                                        )
                                    }) :
                                    ''
                            }
                        </div>
                    </div>
                </div>
            </div> : <div className='w-full py-5 px-10 flex items-center justify-center'> <OnePostSkeleton width={700} height={500} /> </div>
    )
}

export default OnePostInfo;
