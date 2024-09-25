import React,{useState,useEffect} from 'react'
import { PostCard,Container } from "../components/index";
import storageServices from "../appwrite_services/storageServices";

function Allpost() {

    const [post,setPost] = useState([]);
    useEffect(()=>{
        storageServices.getAllPosts([])
        .then((posts)=> posts ? setPost(posts.documents) : setPost([]))
    },[])

  return (
    <div className='w-full py-8'>
     <Container>
        <div className='flex flex-wrap'>
        {
            post && post.map((post)=>(
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

export default Allpost
