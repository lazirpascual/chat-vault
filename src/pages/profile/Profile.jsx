import React, { useState, useEffect, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router";
import { getUserByName } from "../../services/users";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams(); // fetches username params we defined in our profile react route
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const initialUser = await getUserByName(username);
      setUser(initialUser);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture
                    ? `${PF}${user.coverPicture}`
                    : `${PF}person/noCover.png`
                }
                alt="Cover"
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? `${PF}${user.profilePicture}`
                    : `${PF}person/noAvatar.png`
                }
                alt="Profile"
              />
            </div>
            <div className="profileInfoContainer">
              <div
                className={
                  currentUser.username === username
                    ? "profileInfoCurrentUser"
                    : "profileInfo"
                }
              >
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
              {currentUser.username === username && (
                <Button
                  className="profileInfoButton"
                  style={{ width: "15%" }}
                  variant="contained"
                >
                  <EditIcon />
                  <span style={{ marginLeft: 10 }}>Edit Profile</span>
                </Button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
