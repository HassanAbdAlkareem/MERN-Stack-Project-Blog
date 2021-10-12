import React, { useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  const [readMoreDesc, setReadMoreDesc] = useState(false);

  return (
    <div className="post">
      {post.photo && <img src={PF + post.photo} alt="" />}
      <div className="post-info">
        <div className="post-cats">
          {post.categories.map((cate) => (
            <span className="post-cat">{cate.name}</span>
          ))}
        </div>

        <Link className="link" to={`/post/${post._id}`}>
          <span className="post-title">
            <b>Title : </b>
            {post.title.substring(0, 15)}
            {post.title.length > 15 && (
              <span className="show-post">... Show Post</span>
            )}
          </span>
        </Link>

        <hr />
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>

        <p className="post-desc">
          {readMoreDesc ? post.desc : post.desc.substring(0, 100)}
        </p>

        {post.desc.length > 100 && (
          <b className="show" onClick={() => setReadMoreDesc(!readMoreDesc)}>
            {readMoreDesc ? "Show Less" : "Show More .."}
          </b>
        )}
      </div>
    </div>
  );
};

export default Post;
