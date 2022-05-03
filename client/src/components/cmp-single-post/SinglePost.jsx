import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseGlobelContext } from "../../context/FunctionAlContext";

const SinglePost = ({ singlePost }) => {
  const { user } = UseGlobelContext();
  const PF = " http://localhost:5000/images/";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + singlePost._id, {
        data: { username: user.user.username },
        headers: { auth: user.token },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdate = async () => {
    try {
      await axios.put(
        "/posts/" + singlePost._id,
        { title, desc },
        {
          headers: { auth: user.token },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single-post">
      <div className="wrapper">
        {singlePost.photo && <img src={PF + singlePost.photo} alt="" />}
        <div className="info">
          <span>
            Author :
            <Link className="link" to={`/?user=${singlePost.username}`}>
              <b>{singlePost.username}</b>
            </Link>
          </span>
          <span>{new Date(singlePost.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <input
            autoFocus
            id="input"
            value={title}
            className="update-input"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="title">
            <div className="description">
              <div className="flex-title">
                <span>Title</span>
                {singlePost.username === user.user.username && (
                  <div className="edit">
                    <i
                      className="fas fa-edit"
                      onClick={() => {
                        setUpdateMode(true);
                        setTitle(singlePost.title);
                        setDesc(singlePost.desc);
                      }}
                    ></i>
                    <i className="fas fa-trash" onClick={handleDelete}></i>
                  </div>
                )}
              </div>
              <p>{singlePost.title}</p>
            </div>
          </h1>
        )}
        {updateMode ? (
          <React.Fragment>
            <textarea
              value={desc}
              className="update-input"
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="parent-button">
              <button onClick={handelUpdate} className="button-update">
                Updated ?
              </button>
              <button
                className="button-update"
                onClick={() => setUpdateMode(false)}
              >
                Back
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div className="description">
            <span>Description </span>
            <p>{singlePost.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
