import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LayoutOne from './../../layouts/LayoutOne';
import { Link } from "react-router-dom";
const Orders = () => {
    return (
        <Fragment>
      <MetaTags>
        <title>Flone | Orders </title>
        <meta
          name="description"
          content="Orders page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL +"Orders" }>
        Orders
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                <Breadcrumb />
            
            <div className="cart-main-area pt-90 pb-100">
                <div className="container">
                <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No Orders found <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Shop Now
                      </Link>
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
export default Orders;