import { useState, useEffect } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { PostService } from '../../services/PostService';
import {
    HomeOutlined,
    SearchOutlined,
    CompassOutlined,
    PlaySquareOutlined,
    MessageOutlined,
    HeartOutlined,
    PlusSquareOutlined,
    UserOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import './Home.scss'
import { useInfoContext } from '../../context/InfoContext';

//components
import PostCard from '../../components/PostCard';
import OnePostInfo from '../OnePostInfo';
import Create from '../Create';
import Profile from '../Profile';
import Search from '../Search';

//img
import InstagramLogo from '../../static/logo/Instagram-Logo.png'

const Home = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const { isPostChange } = useInfoContext();
    const handleAllPost = async () => {
        try {
            const data = await PostService.getAllPosts();
            setAllPosts(data.reverse());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let user = localStorage.getItem('user');
        if (user) setCurrentUser(JSON.parse(user));
    }, [])

    useEffect(() => {
        handleAllPost();
    }, [isPostChange])

    return (
        <main className='flex items-start'>
            <aside className='h-svh w-72 border-r-2 p-6 flex flex-col items-start justify-between sticky top-0 bg-white mr-10'>
                <div className='w-full flex flex-col items-start justify-start'>
                    <img src={InstagramLogo} alt="" className='w-28 mb-3 select-none' />
                    <ul className='home-links w-full flex flex-col item-start justify-start gap-5'>
                        <li>
                            <NavLink to='/'>
                                <HomeOutlined />
                                <h5>Home</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/search'>
                                <SearchOutlined />
                                <h5>Search</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/b'>
                                <CompassOutlined />
                                <h5>Explore</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='c'>
                                <PlaySquareOutlined />
                                <h5>Reels</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='d'>
                                <MessageOutlined />
                                <h5>Message</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='e'>
                                <HeartOutlined />
                                <h5>Notification</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <PlusSquareOutlined />
                                <h5>Create</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/profile'>
                                <UserOutlined />
                                <h5>{currentUser?.name}</h5>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <li className='flex items-center justify-start'>
                    <MenuOutlined className='text-[24px] font-semibold mr-[10px]' />
                    <span className='text-[17px] font-medium'>More</span>
                </li>
            </aside>
            <Routes>
                <Route path='/' element={
                    <article className='w-full flex flex-col items-start py-5'>
                        <div>{
                            allPosts?.map((item, i) => {
                                return <PostCard key={i} item={item} />;
                            })
                        }</div>
                    </article>
                } />
                <Route path='/search' element={<Search />}></Route>
                <Route path='/post/:id' element={<OnePostInfo />} />
                <Route path='/create' element={<Create />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </main>
    )
}

export default Home;