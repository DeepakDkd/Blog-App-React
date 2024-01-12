import React, { useState, useEffect } from 'react'
import { PostCard } from '../Components'
import service from '../appwrite/config'
function AllPost() {

    const [posts, setPost] = useState([])
    const [loader , setLoader] = useState(true)
    useEffect(() => {

        service.getPosts([]).then((posts) => {
            if (posts) {
                setPost(posts.documents.reverse())
                setLoader(false)
            }
        })

    }, [])

    return loader ? (<div className="loader"> <div class="lds-hourglass"></div></div>) : (

            <div className='AllPost'>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>

    )
}

export default AllPost