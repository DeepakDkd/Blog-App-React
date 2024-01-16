import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import parse from "html-react-parser";

export default function Post() {

    const [post, setPost] = useState(null);
    const [option, setOption] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;



    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((fetchedpost) => {
                if (fetchedpost) setPost(fetchedpost);

                else navigate('/');
            });
        }
        else navigate('/');
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredimage);
                navigate('/');
            }
        })
    }

    return post ? (
        <div className='Post' onClick={() => option ? (setOption(false)) : null}>
            <div className='PostUsername'>
                <h1>{post.postedby}</h1>

                {
                    isAuthor &&
                    <i class={option ? "ri-close-fill" : "ri-menu-fill"} onClick={() => (setOption((prev) => !prev))}></i>
                }

            </div>
            <img src={service.getFilePreview(post.featuredimage)}
                alt={post.title} />

            {isAuthor && option ? (
                <div className='PostBtn'>
                    <button onClick={() => navigate(`/edit-post/${post.$id}`)}>Edit</button>

                    <button onClick={deletePost}>Delete</button>
                </div>
            ) : null
            }

            <h1 className='PostTitle'>{post.title}</h1>
            <div className={!post.content ? "" : "content"}>
                {parse(post.content)}
            </div>

        </div>
    ) : null;
}