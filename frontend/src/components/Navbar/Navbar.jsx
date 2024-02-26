import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">SchoolGuru</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && (
            <Link className="link" to="/register">
              Become a seller
            </Link>
          )}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.png"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/gigs?cat=Tutoring">
              Tutoring
            </Link>
            <Link className="link" to="/gigs?cat=Science Projects">
              Science Projects
            </Link>
            <Link className="link" to="/gigs?cat=PPT Presentations">
              Powerpoint Presentations
            </Link>
            <Link className="link" to="/gigs?cat=Essay Writing">
              Essay Writing
            </Link>
            <Link className="link" to="/gigs?cat=Art and Craft">
              Art and Crafts
            </Link>
            <Link className="link" to="/gigs?cat=Test Preparation">
              Test Preparation
            </Link>

            <Link className="link" to="/gigs?cat=Homework Help">
              Homework Help
            </Link>
            <Link className="link" to="/gigs?cat=Proofreading">
              Proofreading and Editing
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
