import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Loading from "../../components/Loading";
import { useToasts } from "react-toast-notifications";
export default function NewCredsPage({ location, SetUserLogin, isLogin }) {
  const { pathname } = location;
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Forgot Password</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Forgot Password
      </BreadcrumbsItem>
      {loading && <Loading></Loading>}
      <LayoutOne
        headerTop="visible"
        SetUserLogin={SetUserLogin}
        isLogin={isLogin}
      >
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link eventKey="login">
                        <h4>Set new Password</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form>
                        <input
                          type="text"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setpassword(e.target.value);
                          }}
                          placeholder="password"
                        ></input>
                        <input
                          type="text"
                          name="cpassword"
                          value={cpassword}
                          onChange={(e) => {
                            setcpassword(e.target.value);
                          }}
                          placeholder="confirm password"
                        ></input>

                        <div className="button-box">
                          <button type="submit">
                            <span>Save</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
}
