import React from 'react'
import storageServices from '../appwrite_services/storageServices'
import { Link } from 'react-router-dom'

function PostCard({$id,title,feauturedImage}) {
  return (
<Link to={`/post/${$id}`}>
<div className='w-full bg-gray-400 hover:bg-gray-500 rounded-xl p-4 flex flex-col justify-between h-80 max-w-xs hover:shadow-lg transition-shadow duration-300'>
    <div className='w-full justify-center  mb-4'>
        <img src={storageServices.filePreview(feauturedImage)} alt={title}  className='w-full h-60 object-cover rounded-xl'/>
    </div>
    <h2 className='text-xl font-bold text-center truncate text-gray-800'>{title}</h2>
</div>
</Link>
  )
}

export default PostCard
