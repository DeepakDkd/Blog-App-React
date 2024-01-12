import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, RTE } from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {

    const { register, handleSubmit, setValue, watch, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.$id || '',
                content: post?.content || '',
                status: post?.status || 'active',
            }
        });
    const navigate = useNavigate();

    const userData = useSelector((state) => (state.auth.userData));
    const [process, setProcess] = useState(true)


    const submit = async (data) => {
        if (post) {

            setProcess(false)
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredimage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {

            setProcess(false)
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                const fileID = file.$id;

                const dbPost = await service.createPost({ ...data, userId: userData.$id, postedby: userData.name, featuredimage: fileID })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }

        }
    }

    const SlugTransform = useCallback((value) => {

        if (value && typeof value === "string")

            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, "-");

        return "";
    }
        , [])


    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", SlugTransform(value.title), { shouldValidate: true })
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, SlugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)}
            className='PostForm'>
            <Input type="text"
                placeholder="Enter Title"
                // label="Title : "
                {...register("title", { required: true })}
            />

            <Input
                type="text"
                placeholder="slug"
                // label="Slug : "

                disabled
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", SlugTransform(e.currentTarget.value), { shouldValidate: true })
                }}
            />

            <Input label="Image :"

                type="file"
                accept="image/png , image/jpg , image/jpeg , image/gif"
                {...register("image", { required: !post })}
            />

            <div className="SelectStatus">
                <Select
                    label="Post visibility : "
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                />
            </div>
            <RTE name="content" control={control} defaultValue={getValues("content")} />

            {post && (
                <div>
                    <img src={service.getFilePreview(post.featuredimage)}
                        alt={post.title}
                    />
                </div>
            )}


            <button type="submit" className="PostFormSubmit">
                {post ? (process ? "Update" : "Updating...") : (process ? "Post" : "Posting..")}
            </button>

        </form>
    )

}