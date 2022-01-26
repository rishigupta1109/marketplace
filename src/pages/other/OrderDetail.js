import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LayoutOne from './../../layouts/LayoutOne';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Order from './../../components/orders/Order';
const OrderDetail = (props) => {
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
      <BreadcrumbsItem to={process.env.PUBLIC_URL +"/Orders" }>Orders</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL +"OrderDetail"+props.param }>{props.param}</BreadcrumbsItem>
            <LayoutOne headerTop="visible">
          <Breadcrumb />
          <div className="cart-main-area pt-90 pb-100">
          <div className="container">
          <>
           <h3 className="cart-page-title">Your Order </h3>
           
          </>
           
                </div>
                </div>
              
               
                </LayoutOne>

        </Fragment>
   )
}

export default OrderDetail;