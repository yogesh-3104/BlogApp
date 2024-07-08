import React, { useEffect, useState } from "react";
import appwriteDatabaseService from "../appwrite/database";
import { Container, PostCard } from "../component/index";
export default function AllPost() {
  const [posts, setPosts] = useState()
  useEffect(()=>{
    appwriteDatabaseService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  },[])

  
  return( 
  <div className="w-full py-8">
    <Container>
        <div className="flex">
            {posts.map((post)=>(
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
    </Container>
  </div>
  )
}
