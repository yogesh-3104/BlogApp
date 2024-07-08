import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/storage'
function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img className='rounded-xl' src={storageService.getFilePreview(featuredImage)} alt={title} />
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard
