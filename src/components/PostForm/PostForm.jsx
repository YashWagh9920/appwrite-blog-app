import React, { useCallback,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import storageService from '../../appwrite_services/storageServices'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    }
  })

  const submit = async (data) => {
    if (post) {
      console.log(data);
      const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
      if (file) {
         storageService.deleteFile(post.featuredImage)
      }
      const dbPost = await storageService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }
    else {
      console.log(data);
      const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
      const fileId = file.$id
      data.featuredImage = fileId
      const dbPost = await storageService.createPost({ ...data,userId: userData.$id})
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
    }
  }
}

const slugTransform = useCallback((value)=>{
  if(value && typeof value === "string"){
    return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, " ").replace(/\s/g, "-")
  }
  return ""
},[])

useEffect(()=>{
 const subsciption = watch((value,{name})=>{
   if(name === "title"){
     setValue("slug",slugTransform(value.title,{shouldValidate:true}))    
   }
 })

 return ()=>{
  subsciption.unsubscribe()
 } 
},[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
           readOnly={true}
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={storageService.filePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["public", "private"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm
