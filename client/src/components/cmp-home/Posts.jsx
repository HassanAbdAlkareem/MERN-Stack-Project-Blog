import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <React.Fragment>
      <div className="posts">
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default Posts;
