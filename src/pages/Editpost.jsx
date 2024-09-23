import React,{useState,useEffect} from 'react'
import { Container,Postform } from "../components/index";    
import { useParams,useNavigate } from 'react-router-dom';
import storageService from '../appwrite_services/storageServices';

function Editpost() {

    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
          storageService.getPost(slug)
          .then((post)=> {
            console.log(typeof slug);
            
            post ? setPost(post) : setPost(null)
          })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])


  return post ? (
    <div className='py-8'>
        <Container>
            <Postform post={post} />
        </Container>
    </div>
  ) : (null)
}

export default Editpost
