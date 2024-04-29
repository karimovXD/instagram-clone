import { useState, useEffect } from 'react'
import { Skeleton, Modal } from 'antd';
import moment from 'moment';
import { PostService } from '../services/PostService';
import PostCard from '../components/PostCard';
import { useInfoContext } from '../context/InfoContext';

//components
import { OnePostSkeleton } from '../components/skeleton/PostSkeleton';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const { isPostChange } = useInfoContext();

    const handleUserPosts = async () => {
        try {
            const data = await PostService.getCurrentUserPosts();
            setUserPosts(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        handleUserPosts()
    }, [isPostChange])

    return (
        user ? <div className='w-full flex flex-col items-start justify-between px-10'>
            <div className='w-full my-10 py-3 px-4 shadow-lg rounded-lg flex items-center justify-between flex-col ss:flex-row flex-wrap'>
                <div className='w-full ss:w-auto flex items-center justify-between gap-4 flex-col ss:flex-row'>
                    <Skeleton.Avatar active style={{ width: '50px', height: '50px' }} />
                    <div className='w-full flex flex-col items-center justify-center ss:items-start'>
                        <h3 className='flex items-start gap-2 text-sm ss:text-md capitalize'><span className='font-medium'>name:</span>{user.name}</h3>
                        <h3 className='flex items-start gap-2 text-sm ss:text-md capitalize'><span className='font-medium'>surname:</span>{user.surname}</h3>
                    </div>
                </div>
                <div className='text-right flex flex-col items-center justify-center ss:items-end'>
                    <h3 className='flex items-start gap-2 text-sm ss:text-md justify-end'><span className='font-medium'>Email: </span>{user.email}</h3>
                    <p className='flex items-start gap-2 text-sm ss:text-md justify-end'><span className='font-medium'>Accaunt created:</span> {moment(user.createdAt).format('MMMM Do YYYY')} y.</p>
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center gap-5'>
                {
                    userPosts.length ?
                        userPosts.map(post => {
                            return <div className='' key={post._id}>
                                <PostCard item={post} page='profile' />
                            </div>
                        }) :
                        <div>
                            <div className='hidden sm:flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <Skeleton.Input size='default' active />
                                    <Skeleton.Button active />
                                </div>
                                <OnePostSkeleton width={500} height={390} />
                            </div>
                            <div className='hidden sm:hidden ss:flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <Skeleton.Input size='default' active />
                                    <Skeleton.Button active />
                                </div>
                                <OnePostSkeleton width={300} height={300} />
                            </div>
                            <div className='ss:hidden flex flex-col gap-2'>
                                <div className='flex flex-col-reverse items-center justify-center gap-2'>
                                    <Skeleton.Input size='default' active />
                                    <Skeleton.Button active />
                                </div>
                                <OnePostSkeleton width={200} height={270} />
                            </div>
                        </div>
                }
            </div>
        </div> : <Skeleton active />
    )
}

export default Profile;
