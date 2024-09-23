import React,{useState,useEffect} from 'react'
import { Container ,PostCard} from '../components/index'
import storageService from '../appwrite_services/storageServices'

function Home() {
    const [posts,setPosts] = useState([])
    
    useEffect(()=>{
        storageService.getAllPosts([])
        .then((posts)=> posts ? setPosts(posts.documents) : setPosts([]))
    },[])

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
