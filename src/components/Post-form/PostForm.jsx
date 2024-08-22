import React ,{useCallback}from 'react';
import { set, useForm } from 'react-hook-form';
import {Button,Input,Select,RTE}"../index";
import appwriteService form '../../apwrite/config.js';
import { useNavigate } from 'react-router-dom';
import{useSelector} from 'react redux';







function Postform({post}) {
  const {register,handleSubmit,watchm,control,getValues}=useForm({defaultValues:{
    tile:post?.title || '',
    content:post?.content ||'',
    slug:post?.slug || '',
    status:post?.status || "active",

  },})


  const navigate =useNavigate()
  const userData=useSelector((state)=>state.userData)

 const submit =async(data)=>{
  if (post){
   const file =  data.image[0] ? appwriteService.uploadfile(data.image[0]) : null

   if (file){
   appwriteService.deleteFile(post.featuredImage)

   }

   const dbPost =await appwriteService.updatePost(post.$id,{
    ...data,
    featuredImage:file ? file.$id : undefined,

    if (dbPost){
      navigate(`/[post/${dbPost.$i}]`)
      


    }
   })
  }else{
    const file = await appwriteService.uploadfile(data.image[0])
     if (file){
      const fileId=file.$id
      data.featuredImage = field
       const dbPost = await appwriteService .createPost({
        ...data,
        userid:userData.$id,
      })
      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
     }
  }

 }


 const slugTransform = useCallback(value=>{
  if(value && typeof  value === 'string'){
    const slug = value.toLowerCase().replace(/ /g,'-')
    setValue('slug',slug)
    return slug 

  }
 },[])

 React.useEffect(()=>{
  const subscription = watch((value,{name})=>{
    if(name === 'title'){
      setValue('slug',slugTransform(value.title,{shouldValidate:true}))
    }
  })

  return()=>{
    subscription.unsubscribe()
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
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
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

export default Postform
