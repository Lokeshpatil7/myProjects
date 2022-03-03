import React from "react";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="link1" to={"/home"}>
                Home
              </Link>
              <Link
                className="link2"
                aria-current="page"
                to={"/pokemonAPI"}
              >
                API
              </Link>
          
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
