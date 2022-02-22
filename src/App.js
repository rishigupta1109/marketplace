import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy, useState } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect, useDispatch, useSelector } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { fetchProducts } from "./redux/actions/productActions";
import { useToasts } from "react-toast-notifications";
import Axios from "axios";
// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionFour = lazy(() => import("./pages/home/HomeFashionFour"));
const HomeFashionFive = lazy(() => import("./pages/home/HomeFashionFive"));
const HomeFashionSix = lazy(() => import("./pages/home/HomeFashionSix"));
const HomeFashionSeven = lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeKidsFashion = lazy(() => import("./pages/home/HomeKidsFashion"));
const HomeCosmetics = lazy(() => import("./pages/home/HomeCosmetics"));
const HomeFurniture = lazy(() => import("./pages/home/HomeFurniture"));
const HomeFurnitureTwo = lazy(() => import("./pages/home/HomeFurnitureTwo"));
const HomeFurnitureThree = lazy(() =>
  import("./pages/home/HomeFurnitureThree")
);
const HomeElectronics = lazy(() => import("./pages/home/HomeElectronics"));
const HomeElectronicsTwo = lazy(() =>
  import("./pages/home/HomeElectronicsTwo")
);
const HomeBookStore = lazy(() => import("./pages/home/HomeBookStore"));
const HomePlants = lazy(() => import("./pages/home/HomePlants"));
const HomeFlowerShop = lazy(() => import("./pages/home/HomeFlowerShop"));
const HomeOrganicFood = lazy(() => import("./pages/home/HomeOrganicFood"));
const HomeOrganicFoodTwo = lazy(() =>
  import("./pages/home/HomeOrganicFoodTwo")
);
const HomeOnepageScroll = lazy(() => import("./pages/home/HomeOnepageScroll"));
const HomeGridBanner = lazy(() => import("./pages/home/HomeGridBanner"));
const HomeAutoParts = lazy(() => import("./pages/home/HomeAutoParts"));
const HomeCakeShop = lazy(() => import("./pages/home/HomeCakeShop"));
const HomeHandmade = lazy(() => import("./pages/home/HomeHandmade"));
const HomePetFood = lazy(() => import("./pages/home/HomePetFood"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Orders = lazy(() => import("./pages/other/Orders"));
const OrderDetail = lazy(() => import("./pages/other/OrderDetail"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));
const URL = "https://infinite-sands-08332.herokuapp.com/";
// const URL = "http://localhost:9000/";
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

const App = props => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });

  const [user,SetUserLogin ] = useState(null);


  const { addToast } = useToasts();
  const fetchingErrorHandler = (err) => {
    addToast(err, {
      appearance: "warning",
      autoDismiss: true
    })
  }
  const dispatch = useDispatch();
  useEffect(() => {
            fetch(`${URL}getProducts`).then(
          res => {
            console.log(res);
                if (res.status == 400) {
              fetchingErrorHandler("Error while Fetching Products");
            }
            return res.json();
          }
        ).then(
          data => {
            console.log(data);
            const fn = fetchProducts(data);
            fn(dispatch);
          }
        ).catch(err => {
          fetchingErrorHandler("Error while Fetching Products");
        });
    const cookie = getCookie("jwtoken");
    console.log(cookie);
    fetch(`${URL}checkLogin`,{method:"POST",body:JSON.stringify({"cookie":cookie}), headers: {
      'Content-Type': 'application/json'
    },}, {
      credentials: 'include'
    }).then((res) => {
      return res.json();
    }).then(data => {
      console.log(data);
      if (data.isLogin) {
        console.log(data.userdata);
        SetUserLogin(data.userdata);
      }
        })
  }, [])
  return (
   
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFashion}
                /> */}
                <Route exact path={process.env.PUBLIC_URL + "/orders"}>
                  {user? <Orders isLogin={true}/>:<Orders isLogin={false}/>}
                </Route>
                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion"}
                  component={HomeFashion}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-two"}
                  component={HomeFashionTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-three"}
                  component={HomeFashionThree}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-four"}
                  component={HomeFashionFour}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-five"}
                  component={HomeFashionFive}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-six"}
                  component={HomeFashionSix}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion-seven"}
                  component={HomeFashionSeven}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-kids-fashion"}
                  component={HomeKidsFashion}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-cosmetics"}
                  component={HomeCosmetics}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture"}
                  component={HomeFurniture}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture-two"}
                  component={HomeFurnitureTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-furniture-three"}
                  component={HomeFurnitureThree}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-electronics"}
                  component={HomeElectronics}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-electronics-two"}
                  component={HomeElectronicsTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-book-store"}
                  component={HomeBookStore}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-plants"}
                  component={HomePlants}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-flower-shop"}
                  component={HomeFlowerShop}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-organic-food"}
                  component={HomeOrganicFood}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-organic-food-two"}
                  component={HomeOrganicFoodTwo}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-onepage-scroll"}
                  component={HomeOnepageScroll}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-grid-banner"}
                  component={HomeGridBanner}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-auto-parts"}
                  component={HomeAutoParts}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-cake-shop"}
                  component={HomeCakeShop}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-handmade"}
                  component={HomeHandmade}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/home-pet-food"}
                  component={HomePetFood}
                />

                {/* Shop pages */}
              {/* <Route
                exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={ShopGridStandard}
                />  */}
                {/* <Route exact
                  path={process.env.PUBLIC_URL + "/"}
                  element= {user && user._id ? <ShopGridStandard isLogin={true}/>:<ShopGridStandard isLogin={false}/>}
                /> */}
              <Route exact path={process.env.PUBLIC_URL + "/"}>
                {user ? <ShopGridStandard  isLogin={true} SetUserLogin={SetUserLogin}/>:<ShopGridStandard SetUserLogin={SetUserLogin} isLogin={false} />}
              </Route>
                {/* <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                /> */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-filter"}
                  component={ShopGridFilter}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-two-column"}
                  component={ShopGridTwoColumn}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}
                  component={ShopGridNoSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-full-width"}
                  component={ShopGridFullWidth}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
                  component={ShopGridRightSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-standard"}
                  component={ShopListStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-full-width"}
                  component={ShopListFullWidth}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-two-column"}
                  component={ShopListTwoColumn}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/Orderdetail/:id"}
                  render={routeProps => (
                    <OrderDetail param={routeProps.match.params.id} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={routeProps => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                  component={ProductTabLeft}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                  component={ProductTabRight}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                  component={ProductSticky}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-slider/:id"}
                  component={ProductSlider}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                  component={ProductFixedImage}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog-standard"}
                  component={BlogStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                  component={BlogNoSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                  component={BlogRightSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-details-standard"}
                  component={BlogDetailsStandard}
                />

                {/* Other pages */}
                {/* <Route exact path={process.env.PUBLIC_URL + "/about"}>
                    {user ? <About isLogin={true}/>:<About isLogin={false}/>}
                </Route> */}
                <Route exact path={process.env.PUBLIC_URL + "/about"}>
                    {user ? <About isLogin={true} location={"/about"}/>:<About isLogin={false} location={"/about"}/>}
               </Route>

               <Route exact path={process.env.PUBLIC_URL + "/contact"}>
                    {user ? <Contact isLogin={true} location={"/contact"}/>:<Contact isLogin={false} location={"/contact"}/>}
               </Route>
               

               {/* <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                /> */}
               <Route exact path={process.env.PUBLIC_URL + "/my-account"}>
                    {user ? <MyAccount SetUserLogin={SetUserLogin} user={user} isLogin={true} location={{pathname:"/my-account"}}/>:<MyAccount SetUserLogin={SetUserLogin} user={user} isLogin={false} location={{pathname:"/my-account"}}/>}
               </Route>
                {/* <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                 
                  render={props => (<LoginRegister  SetUserLogin = {SetUserLogin} {...props}/>)}
                /> */}
                <Route exact path={process.env.PUBLIC_URL + "/login-register"}>
                    {user ? <LoginRegister SetUserLogin={SetUserLogin} isLogin={true} location={{pathname:"/login-register"}}/>:<LoginRegister SetUserLogin={SetUserLogin} isLogin={false} location={{pathname:"/login-register"}}/>}
               </Route>

                <Route exact path={process.env.PUBLIC_URL + "/cart"}>
                    {user ? <Cart SetUserLogin={SetUserLogin} isLogin={true} location={{pathname:"/cart"}}/>:<Cart SetUserLogin={SetUserLogin} isLogin={false} location={{pathname:"/cart"}}/>}
               </Route>

               <Route exact path={process.env.PUBLIC_URL + "/wishlist"}>
                    {user ? <Wishlist SetUserLogin={SetUserLogin} isLogin={true} location={"/wishlist"}/>:<Wishlist SetUserLogin={SetUserLogin} isLogin={false} location={"/wishlist"}/>}
               </Route>

               <Route exact path={process.env.PUBLIC_URL + "/compare"}>
                    {user ? <Compare isLogin={true} location={"/compare"}/>:<Compare isLogin={false} location={"/compare"}/>}
               </Route>

               {user!==null&& <Route exact path={process.env.PUBLIC_URL + "/checkout"}>
                    {user ? <Checkout user={user} SetUserLogin={SetUserLogin} isLogin={true} location={{pathname:"/checkout"}}/>:<Checkout SetUserLogin={SetUserLogin} isLogin={false} location={{pathname:"/checkout"}}/>}
               </Route>}

                <Route exact path={process.env.PUBLIC_URL + "/not-found"}>
                    {user ? <NotFound isLogin={true} location={"/not-found"}/>:<NotFound isLogin={false} location={"/not-found"}/>}
               </Route>

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
