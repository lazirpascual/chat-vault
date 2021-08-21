import React, { useContext, useEffect, useState } from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { Follow, Unfollow } from "../../context/AuthActions";
import { getUserFriends, unfollowUser, followUser } from "../../services/users";
import "./rightbar.css";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser?.followings.includes(`${user?._id}`));
  }, [user, currentUser]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await getUserFriends(user?._id);
        setFriends(friendList);
      } catch (error) {
        console.log(error);
      }
    };
    user?._id && getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await unfollowUser(user._id, {
          userId: currentUser._id,
        });
        dispatch(Unfollow(user._id));
      } else {
        await followUser(user._id, {
          userId: currentUser._id,
        });
        dispatch(Follow(user._id));
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 others</b> have a birthday today.
          </span>
        </div>
        <a href="https://cloudcomputers.netlify.app">
          <img src={`${PF}cloudcomputers.jpg`} alt="" className="rightbarAd" />
        </a>
        <h3 className="rightbarTitle">Online Friends</h3>
        {currentUser.username === "Lazir Pascual" ? (
          <ul className="rightbarFriendList">
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        ) : (
          <div>There are currently no friends online.</div>
        )}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? `Unfollow` : `Follow`}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Current City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Hometown:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship Status:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "Complicated"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        {friends.length > 0 ? (
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none", color: "black" }}
                key={friend.username}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? `${PF}${friend.profilePicture}`
                        : `${PF}person/noAvatar.png`
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>This user is currently not following anyone.</div>
        )}
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? ProfileRightbar() : HomeRightbar()}
      </div>
    </div>
  );
};

export default Rightbar;
