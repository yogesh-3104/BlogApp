import React, { useEffect, useState } from 'react'
import {Container ,PostForm} from '../component/index'
import appwriteDatabaseService from '../appwrite/database'
import { useParams } from 'react-router-dom';
export default function EditPost() {
    const [post, setPost] = useState(null)
    const {slug}=useParams();
    const navigate=useNavigate();
    useEffect(() => {
      if(slug){
        appwriteDatabaseService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
        })
      }else{
        navigate('/');
      }
    }, [slug,navigate])
    
  return (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  )
}
