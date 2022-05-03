import { useState } from "react";
import axios from "axios";
import SideBar from "../../components/cmp-home/SideBar";
import { UseGlobelContext } from "../../context/FunctionAlContext";
import imgUser from "../../images/user.png";
import { Link } from "react-router-dom";

const Settings = () => {
  const { user, setUser } = UseGlobelContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [succsess, setSuccess] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    setError(false);
    setSuccess(false);
    e.preventDefault();
    const updateUser = {
      username,
      password,
      email,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;

      try {
        await axios.post("/upload", data);
        setSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
    if (username === "" && password === "" && email === "") {
      setError(true);
    } else {
      try {
        const res = await axios.put("/users/" + user.user._id, updateUser, {
          headers: { auth: user.token },
        });
        setUser(res.data);
        setSuccess(true);
      } catch (error) {
        console.log(error.message);
        setSuccess(false);
      }
    }
  };

  const handleDelete = async () => {
    setDeleteAccount(false);
    try {
      await axios.delete("/users/" + user.user._id, {
        headers: { auth: user.token },
      });
      setUser(null);
      window.location.replace("/register");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <span className="settings-update-title">Page update your account</span>

        <form onSubmit={handleSubmit}>
          <p>Profile Picture</p>

          <div className="img">
            {file ? (
              <img src={URL.createObjectURL(file)} />
            ) : user.user.profilePic ? (
              <img src={PF + user.user.profilePic} />
            ) : (
              <img src={imgUser} />
            )}
            <label htmlFor="input-file">
              <i className="fas fa-user-circle"></i>
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              id="input-file"
              style={{ display: "none" }}
            />
          </div>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder={user.user.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            placeholder={user.user.email}
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
          />
          {error && (
            <p className="update-error">You must enter the information!</p>
          )}
          {succsess && <p className="update-success">Updated Successfull</p>}
          <div className="buttons">
            <button type="submit">Update </button>
            <button
              type="button"
              onClick={() => setDeleteAccount(true)}
              className="settings-delete-title"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
      {deleteAccount && (
        <div className="parent-notifation-delete">
          <p>Are you shure about delete your account ? </p>
          <div className="buttons-notifation">
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setDeleteAccount(false)}>No</button>
          </div>
        </div>
      )}
      <SideBar />
    </div>
  );
};

export default Settings;
