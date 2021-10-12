import React, { useState } from "react";
import axios from "axios";
import { UseGlobelContext } from "../../context/FunctionAlContext";

const Write = () => {
  const { user } = UseGlobelContext();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cate, setCate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error.message);
    }
    try {
      await axios.post("/categories", {
        name: cate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write">
      {file && <img src={URL.createObjectURL(file)} alt="" />}

      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label htmlFor="input-file">
            <i className="fas fa-plus-circle"></i>
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="input-file"
            style={{ display: "none" }}
          />
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title .."
            autoFocus
          />
        </div>

        <div className="write-form-group">
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Tell Your Store ..."
            typeof="text"
          ></textarea>
        </div>

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default Write;
