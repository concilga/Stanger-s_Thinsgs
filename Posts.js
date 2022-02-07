import {React, useState} from 'react'
import { Link } from 'react-router-dom';

const Posts = ({postResults, token}) => {
    if(!postResults.posts){
        return (
            <></>
        )
    }

    const [searchTerm, setSearchTerm] = useState('');

    function postMatches(post, text) {  
        if (post.author.username.toLowerCase().includes(text) || post.description.toLowerCase().includes(text) ||
            (post.description.toLowerCase().includes(text) || post.location.toLowerCase().includes(text) || 
            post.price.toLowerCase().includes(text) || post.title.toLowerCase().includes(text))
        ){
            return true;
        } else {
            return false;
        }
    }

    const filteredPosts = postResults.posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : postResults.posts;
    
    return (
        <div className="posts-page">
            <div className="header">
                <h2>Posts</h2>
                <form className="addPost-form">
                    <label htmlFor='title'>Title:</label>
                    <input required type='text' name='searchTerm' value={searchTerm} 
                        onChange={(event) => setSearchTerm(event.target.value)}/>
                </form>
                {token  ? (
                    <button>
                        <Link to="/AddPost">Add Post</Link>
                    </button>
                ) : (
                    null
                )}
            </div>  
            {
                postResults.posts ? (
                    postsToDisplay.map(post => {
                        return (
                            <div key={post._id} className="public-posts">
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                                <h4>{post.price}</h4>
                                <h3>{post.author.username}</h3>
                                <h4>{post.location}</h4>
                                {token ? (
                                    <button>
                                        <Link to={`/PostDetail/${post._id}`}>Details</Link>   
                                    </button>
                                ) : (
                                    null
                                )}
                            </div>

                        )
                    })
                ) : (
                    null
                )
            }
        </div>
    );
        
}

export default Posts;