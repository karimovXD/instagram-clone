import { useState, useEffect } from 'react'
import { Skeleton, Modal } from 'antd';
import moment from 'moment';
import { PostService } from '../services/PostService';
import PostCard from '../components/PostCard';
import { useInfoContext } from '../context/InfoContext';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const { postLoading } = useInfoContext();
    const [open, setOpen] = useState(true);

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
    }, [postLoading])

    return (
        user ? <div className='w-full flex flex-col items-start justify-between'>
            <div>
                <div className='row'>
                    <div className=''><h1>User Image</h1></div>
                    <div>
                        <h3>{user.name} {user.surname}</h3>
                        <span>{user.email}</span>
                        <p>{moment(user.createdAt).format('MMMM Do YYYY')} y.</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap items-start justify-center gap-5'>
                {
                    userPosts ? userPosts.lenght === 0 ? <h3>Postlar mavjud emas!</h3> :
                        userPosts?.map(post => {
                            return <div className='' key={post._id}>
                                <PostCard item={post} page='profile' />
                            </div>
                        }) :
                        <div className='' key={post._id}>
                            <PostCard item={post} setOpen={setOpen} />
                        </div>
                }
            </div>
        </div> : <Skeleton active />
    )
}

export default Profile;
