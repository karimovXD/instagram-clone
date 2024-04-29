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
    EnterOutlined,
    LoginOutlined
} from '@ant-design/icons';
import './Home.scss'
import { useInfoContext } from '../../context/InfoContext';

//components
import { OnePostSkeleton } from '../../components/skeleton/PostSkeleton';

//pages
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
    const { isPostChange, setIsPostChange } = useInfoContext();

    //functions
    const handleAllPost = async () => {
        try {
            const data = await PostService.getAllPosts();
            setAllPosts(data.reverse());
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignOut = () => {
        localStorage.clear('token', 'user');
        setIsPostChange(!isPostChange)
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
            <aside className='h-svh w-24 ss:w-72 border-r-2 p-6 flex flex-col items-start justify-between sticky top-0 bg-white'>
                <div className='w-full flex flex-col items-start justify-start'>
                    <Link to='/'><img src={InstagramLogo} alt="" className='w-28 mb-3 select-none hidden ss:block' /></Link>
                    <ul className='home-links w-full flex flex-col items-center justify-start gap-5 ss:items-start'>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='/'>
                                <HomeOutlined />
                                <h5 className='hidden ss:block'>Home</h5>
                            </NavLink>
                        </li>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='/search'>
                                <SearchOutlined />
                                <h5 className='hidden ss:block'>Search</h5>
                            </NavLink>
                        </li>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='/b'>
                                <CompassOutlined />
                                <h5 className='hidden ss:block'>Explore</h5>
                            </NavLink>
                        </li>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='c'>
                                <PlaySquareOutlined />
                                <h5 className='hidden ss:block'>Reels</h5>
                            </NavLink>
                        </li>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='d'>
                                <MessageOutlined />
                                <h5 className='hidden ss:block'>Message</h5>
                            </NavLink>
                        </li>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='e'>
                                <HeartOutlined />
                                <h5 className='hidden ss:block'>Notification</h5>
                            </NavLink>
                        </li>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='/create'>
                                <PlusSquareOutlined />
                                <h5 className='hidden ss:block'>Create</h5>
                            </NavLink>
                        </li>
                        <li className='mb-4 ss:mb-0'>
                            <NavLink to='/profile'>
                                <UserOutlined />
                                <h5 className='hidden ss:block'>{currentUser?.name}</h5>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {
                    currentUser ?
                        <li className='flex items-center justify-start cursor-pointer' onClick={handleSignOut}>
                            <EnterOutlined className='text-[24px] font-semibold mr-[10px]' />
                            <span className='text-[17px] font-medium hidden ss:block'>Sign out</span>
                        </li> :
                        <Link to='/login'>
                            <li className='flex items-center justify-start cursor-pointer' onClick={handleSignOut}>
                                <LoginOutlined className='text-[24px] font-semibold mr-[10px]' />
                                <span className='text-[17px] font-medium hidden ss:block'>log in</span>
                            </li>
                        </Link>
                }
            </aside>
            <Routes>
                <Route path='/' element={
                    <article className='w-full flex flex-col items-center py-5 px-10'>
                        <div>{
                            allPosts.length ? allPosts.map((item, i) => {
                                return <PostCard key={i} item={item} />;
                            }) :
                                (
                                    <div>
                                        <div className='hidden sm:flex flex-col gap-20'>
                                            <OnePostSkeleton width={500} height={380} />
                                            <OnePostSkeleton width={500} height={380} />
                                            <OnePostSkeleton width={500} height={380} />
                                        </div>
                                        <div className='hidden sm:hidden ss:flex flex-col gap-20'>
                                            <OnePostSkeleton width={300} height={300} />
                                            <OnePostSkeleton width={300} height={300} />
                                            <OnePostSkeleton width={300} height={300} />
                                        </div>
                                        <div className='ss:hidden flex flex-col gap-20'>
                                            <OnePostSkeleton width={200} height={270} />
                                            <OnePostSkeleton width={200} height={270} />
                                            <OnePostSkeleton width={200} height={270} />
                                        </div>
                                    </div>
                                )
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