import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import Header from "../../components/cmp-home/Header";
import SideBar from "../../components/cmp-home/SideBar";
import Posts from "../../components/cmp-home/Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Header />
      {posts.length != 0 ? (
        <p className="title-all-posts">All The Posts </p>
      ) : (
        <div className="no-posts">
          <p className="no-posts">There are no posts yet !</p>{" "}
        </div>
      )}
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
