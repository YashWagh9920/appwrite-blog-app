import React, { useState, useEffect } from 'react'
import { PostCard, Container } from "../components/index";
import storageServices from "../appwrite_services/storageServices";
import { useSelector, useDispatch } from 'react-redux';
import { Query } from 'appwrite';
import { addUsersPost } from '../Store/postSlice';
import { Link } from 'react-router-dom';

function YourPost() {
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.usersPosts) || [];
  const userId = useSelector(state => state.auth.userData.$id);


  useEffect(() => {
    if (posts && posts.length > 0) {
      setPost(posts);
    }
    else {
      storageServices.getAllPosts([Query.equal("userId", userId)])
        .then((posts) => {
          if (posts) {
            setPost(posts.documents);
            dispatch(addUsersPost(posts.documents));
          }
          else {
            setPost([]);
          }
        })
    }

  }, [])

  if(post.length === 0){
    return (
        <div className='w-full py-8'>
            <Container >
              <div className="flex justify-center items-center flex-col gap-2">
              <h1 className='text-2xl font-bold text-center'>You have Not created Post Yet</h1>
            <Link 
            to={"/add-post"}
             className='text-base font-semibold text-center rounded-lg border-none px-2 py-1 bg-black text-white' 
             >Click Here To Create Post</Link>
              </div>
            </Container>
        </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {
            post && post.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard $id={post.$id} title={post.title} feauturedImage={post.featuredImage} />
              </div>
            ))
          }
        </div>
      </Container>
    </div>
  )
}

export default YourPost
