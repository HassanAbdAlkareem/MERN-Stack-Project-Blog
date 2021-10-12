import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SideBar from "../../components/cmp-home/SideBar";
import SinglePost from "../../components/cmp-single-post/SinglePost";

const SinglePage = () => {
  const [singlePost, setSinglePost] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getSinglePost = async () => {
      const res = await axios.get(`/posts/${path}`);
      setSinglePost(res.data);
    };
    getSinglePost();
  }, [path]);

  return (
    <div className="single-page">
      <SinglePost singlePost={singlePost} />
      <SideBar />
    </div>
  );
};

export default SinglePage;
