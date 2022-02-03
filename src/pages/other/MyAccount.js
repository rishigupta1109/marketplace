import PropTypes from "prop-types";
import React, { Fragment,useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const MyAccount = ({ location,isLogin }) => {
  const { pathname } = location;
  const [editState, setEditState] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible" isLogin={isLogin}>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
               
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                       
                          <h3 className="panel-title">
                            <span></span> Account information{" "}
                          </h3>

                      </Card.Header>
                     
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Name</label>
                              <input disabled={!editState} onClick={(e) => { setName(e.target.value)}} type="text" />
                                </div>
                              </div>
                             
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input disabled={!editState} onClick={(e) => { setEmail(e.target.value)}} type="email" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Address</label>
                                  <input disabled={!editState} onClick={(e) => { setAddress(e.target.value)}} type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input disabled={!editState} onClick={(e) => { setPhone(e.target.value)}} type="number" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                             {editState===true&& <div className="billing-btn">
                                <button type="submit">Save</button>
                              </div>}
                             {editState===false&& <div className="billing-btn">
                                <button onClick={()=>setEditState(!editState)} type="submit">Edit</button>
                              </div>}
                             {editState===true&& <div className="billing-btn">
                                <button style={{marginLeft:"5px"}} onClick={()=>setEditState(!editState)} type="submit">Cancel</button>
                              </div>}
                            </div>
                          </div>
                        </Card.Body>
                    
                    </Card>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object
};

export default MyAccount;
