import React, { useState } from 'react'
import service from '../appwrite/config'
import authService from '../appwrite/auth'
import { Link } from 'react-router-dom'
function PostCard({ $id, title, featuredimage, postedby, $createdAt, userId }) {
    const [user, setUser] = useState(false)
    authService.getCurrentUser()
        .then((data) => {
            setUser(data.$id === userId)
        })
    return (
        <Link to={`/post/${$id}`}>
            <div className="PostCard">
                <div>
                    <img src={service.getFilePreview(featuredimage)} alt={title} />
                </div>

                <h2>{title}</h2>
                <h3>{postedby} {user ? ("(You)") : ("")}</h3>
                <h6>{$createdAt.slice(0, 10).split('-').reverse().join('-')}</h6>
            </div>
        </Link>
    )
}

export default PostCard