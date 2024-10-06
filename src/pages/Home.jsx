import React,{useState,useEffect} from 'react'
import { Container ,PostCard} from '../components/index'
import storageService from '../appwrite_services/storageServices'
import { useDispatch,useSelector } from 'react-redux';
import { addpost } from '../Store/postSlice';
import { Query } from 'appwrite';

function Home() {
    const [posts,setPosts] = useState([]);
    const dispatch = useDispatch();
    const cachepost = useSelector((state)=> state.post.allPosts);
    
    useEffect(()=>{
        if(cachepost && cachepost.length > 0){
            setPosts(cachepost);
        }
        else{
            storageService.getAllPosts([Query.equal("status","public")])
            .then((posts)=> {
            if(posts){
                setPosts(posts.documents);
                dispatch(addpost(posts.documents));
            }
            else{
             setPosts([])
            }
        })
        }
    },[cachepost])

  if(posts.length === 0){
    return (
        <div className='w-full py-8'>
            <Container>
            <h1 className='text-2xl font-bold text-center'>No Posts Found</h1>
            </Container>
        </div>
    )
  }
    return (
        <div className='w-full py-8'>
         <Container>
            <div className='flex flex-wrap'>
            {
                posts && posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard $id={post.$id} title={post.title} feauturedImage={post.featuredImage}/>
                </div>
                ))
            }
            </div>
         </Container>
        </div>
    )
}

export default Home
