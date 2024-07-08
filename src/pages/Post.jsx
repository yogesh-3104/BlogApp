import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteDatabaseService from '../appwrite/database'
import appwriteStorageService from '../appwrite/storage'
export default function Post() {
    const {slug}=useParams()
    const navigate=useNavigate()
    const [post, setPost] = useState(null)
    const userData=useSelector((state)=>state.auth.userData);
    const isAuthor=post && userData ? post.userId === userData.$id:false;
   
    useEffect(()=>{
        if(slug){
            appwriteDatabaseService.getPost(slug).then((post)=>{
                if(post) setPost(post);
                else navigate("/");
            })
        }
    },[slug,navigate])

    const deletePost=()=>{
        appwriteDatabaseService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteDatabaseService.deleteFile(post.featuredImage);
                navigate('/');
            }
        })
    }
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteStorageService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
