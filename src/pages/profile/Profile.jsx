import React, { useState, useEffect, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router";
import { getUserByName } from "../../services/users";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";
import EditProfile from "../../components/editProfile/EditProfile";

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
              {currentUser.username === username && (
                <div className="editProfileContainer">
                  <EditProfile user={currentUser} setUser={setUser} />
                </div>
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
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
