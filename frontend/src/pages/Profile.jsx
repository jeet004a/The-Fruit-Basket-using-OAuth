import React,{useState,useEffect} from 'react';
import { Header } from './Header';
import {cartDetails} from '../actions/profileactions'
import axios from 'axios'
import Cart from './Cart'
import { IoIosRefresh } from "react-icons/io";
import { OrderItem } from "../components/Order-comp";
export const  Profile=()=> {

    
    const [userInfo,setUserInfo]=useState(null)
    const [data,setData]=useState(null)
    const [cart,setCart]=useState(null)
    //All user information Below
    const [userdata,setUserdata]=useState(null)
    //All Addess Information
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [postalCode, setPostalCode] = useState();
    const [country, setCountry] = useState();
    const [orderAmount,setOrderAmount]=useState(0)
    const [order,setOrder]=useState(null)
    //Address Info End


    useEffect(() => {
        const data=localStorage.getItem('user-info')
        const userData=JSON.parse(data)
        setUserInfo(userData)

        const fetchAddress=async()=>{
          try {
            const userAddress=await axios.get(`http://localhost:8001/address/${userData.email}`)
            console.log(userAddress)
                setStreet(userAddress.data.street)
                setCity(userAddress.data.city)
                setPostalCode(userAddress.data.postalCode)
                setCountry(userAddress.data.country)
                setState(userAddress.data.state)
          } catch (error) {
            console.log(error)
          }
        }
        fetchAddress()

        const fetchData=async()=>{
            try {

                // const response=await axios(`http://localhost:8001/profile/${userData.email}`)
                const response=await axios(`http://localhost:8001/profile/${userData.email}`)
                // console.log(response)
                // setData(response.data.data.cart)
                setCart(response.data.cart)
                setUserdata(response)
                // const userAddress=await axios(`http://localhost:8001/address/${response.data.address}`)
                // setStreet(userAddress.data.street)
                // setCity(userAddress.data.city)
                // setPostalCode(userAddress.data.postalCode)
                // setCountry(userAddress.data.country)
                
            } catch (error) {
                console.log(error)
            }
        }
        
      
        fetchData()
        
        const fetchOrder=async()=>{
          try {
            const orderData=await axios(`http://localhost:8003/orders/${userData.email}`)
                setOrder(orderData.data)
                // console.log(orderData.data)
          } catch (error) {
            console.log(error)
          }
        }
        fetchOrder()
        // console.log(''order)
        // console.log(userdata)
        // cart.map(({ unit, product }) => {
        //   //     // totalAmount += unit * product.price;
        //   //     //   props.setOrderAmount(unit * product.price)
        //   //     // console.log(props.orderAmount+(unit * product.price))
        //       setOrderAmount(orderAmount+product.price)
        //       });
        // console.log(orderAmount)
    }, []);

    // cart.map(({ unit, product }) => {
    //       //     // totalAmount += unit * product.price;
    //       //     //   props.setOrderAmount(unit * product.price)
    //       //     // console.log(props.orderAmount+(unit * product.price))
    //           setOrderAmount(orderAmount+product.price)
    //           });

    // console.log('abc',cart[0].product.price*cart[0].unit)

    

    // cartDetails()
    const viewCart = () => {
      // return(
        // <div
        //     className="d-flex justify-content-center align-items-center"
        //     style={{ height: "20rem" }}
        //   >
        //     <span className="text-secondary"> Your Cart is Empty!</span>
        //   </div>
        // <Cart></Cart>
        // <h1>Hello</h1>
      // ) 
      if(Array.isArray(cart) && cart.length){
        return(
          <div>
            {cart.map((item)=>{
              return(<Cart unit={item.unit} cart={cart} item={item.product} setOrderAmount={setOrderAmount} orderAmount={orderAmount}></Cart>)
            })}
          </div>
        //  <div></div> 
        )
      }
      else{
        return(
          // <Cart></Cart>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "20rem" }}
          >
            <span className="text-secondary"> Your Cart is Empty!</span>
          </div>
        )
      }
    };

    const viewWishlist = () => {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "20rem" }}
        >
          <span className="text-secondary"> Your Wishlist is Empty!</span>
        </div>
      );
      // if (Array.isArray(wishlist) && wishlist.length) {
      //   return (
      //     <div>
      //       {wishlist.map((item) => {
      //         return <WishItem item={item} onTapRemove={removeFromWishlist} />;
      //       })}
      //     </div>
      //   );
      // } else {
      //   return (
      //     <div
      //       className="d-flex justify-content-center align-items-center"
      //       style={{ height: "20rem" }}
      //     >
      //       <span className="text-secondary"> Your Wishlist is Empty!</span>
      //     </div>
      //   );
      // }
    };
    
    const viewOrders = () => {
      // return (
      //   <div
      //     className="d-flex justify-content-center align-items-center"
      //     style={{ height: "20rem" }}
      //   >
      //     <span className="text-secondary"> Your Order List is Empty!</span>
      //   </div>
      // );
      // if (Array.isArray(orders) && orders.length) {
      //   return (
      //     <div>
      //       {orders.map((item) => {
      //         return <OrderItem item={item} onTapViewMore={() => {}} />;
      //       })}
      //     </div>
      //   );
      // } else {
      //   return (
      //     <div
      //       className="d-flex justify-content-center align-items-center"
      //       style={{ height: "20rem" }}
      //     >
      //       <span className="text-secondary"> Your Order List is Empty!</span>
      //     </div>
      //   );
      // }
      
        if(Array.isArray(order) && order.length){
          return(
            <div>
              {order.map((item) => {
              return <OrderItem item={item}  />;
            })}
            </div>
          )
          
        }
      
    };


    const onTapPlaceOrder =async()=>{
      try {
        const data=localStorage.getItem('user-info')
        const userData=JSON.parse(data)
        console.log(userData)
        const response=await axios.post('http://localhost:8003/orderplace',
          {name: userData.email},
          {
          headers: {
            Authorization: `Bearer ${userData.token}`, // Add the token here
          }
        })
        window.location.reload()
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }


    const viewPlaceOrder=()=>{
      if (Array.isArray(cart) && cart.length) {
        // let totalAmount = 0;
  
        // cart.map(({ unit, product }) => {
        //   totalAmount += unit * product.price;
        //   // setOrderAmount(totalAmount)
        // });
  
        return (
          <div className="row bg-white" style={{ height: "5rem" }}>
            <div className="col-3">
              <span style={{ fontSize: "1.2rem" }}>
                {" "}
                Total Amount:{" "}
                <span
                  className="ml-2"
                  style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                >
                  {/* {totalAmount} */}
                  {orderAmount}
                </span>
              </span>
            </div>
            <div className="col-3 ml-auto">
              <button
                className="btn btn-lg - btn-danger"
                onClick={() => onTapPlaceOrder()}
              >
                <i className="fas fa-gift mr-2"></i> Place Order
              </button>
            </div>
            
          </div>
        );
      }
    }

    const addNewAddress=async()=>{
      try {
        const {email,token}=userInfo
        const response=await axios.post(`http://localhost:8001/address/${email}`,
          {
            street: street,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country
          },
          {
          headers: {
              Authorization: `Bearer ${token}`, // Add the token here
          }
          })
          window.location.reload()
        // console.log(state)
      } catch (error) {
        console.log(error)
      }
    }

    const handelAddress=()=>{
        if(street!=null){
          return(
            <div className="row">
                    <form className="m-2 bg-white p-2 mt-3 ml-3 rounded">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label for="inputAddress">Street</label>
                        <input
                            type="text"
                            onChange={(e) => setStreet(e.target.value)}
                            className="form-control"
                            id="inputAddress"
                            // placeholder="1234 Main St"
                            value={street}
                        />
                        </div>
                        <div className="form-group col-md-4">
                        <label for="inputCity">City</label>
                        <input
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control"
                            id="inputCity"
                            value={city}
                        />
                        </div>
                    </div>
        
                    <div className="form-row">
                        <div className="form-group col-md-3">
                        <label for="inputCity">State</label>
                        <input
                            type="text"
                            onChange={(e) => setState(e.target.value)}
                            className="form-control"
                            id="inputCity"
                            value={state}
                        />
                        </div>
                        <div className="form-group col-md-2">
                        <label for="inputZip">Postal Code</label>
                        <input
                            type="text"
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="form-control"
                            id="inputZip"
                            value={postalCode}
                        />
                        </div>
                        <div className="form-group col-md-2">
                        <label for="inputZip">Country</label>
                        <input
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            className="form-control"
                            id="inputZip"
                            value={country}
                        />
                        </div>
                    </div>
                    <div className="row">
                        <button
                        className="btn btn-warning ml-auto mr-4"
                        onClick={() => addNewAddress()}
                        type="button"
                        >
                        Save Address
                        </button>
                    </div>
                    </form>
                </div>
        )
        }
        else{
          return(
            <div className="row">
                    <form className="m-2 bg-white p-2 mt-3 ml-3 rounded">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label for="inputAddress">Street</label>
                        <input
                            type="text"
                            onChange={(e) => setStreet(e.target.value)}
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                        />
                        </div>
                        <div className="form-group col-md-4">
                        <label for="inputCity">City</label>
                        <input
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control"
                            id="inputCity"
                        />
                        </div>
                    </div>
        
                    <div className="form-row">
                        <div className="form-group col-md-3">
                        <label for="inputCity">State</label>
                        <input
                            type="text"
                            onChange={(e) => setState(e.target.value)}
                            className="form-control"
                            id="inputCity"
                        />
                        </div>
                        <div className="form-group col-md-2">
                        <label for="inputZip">Postal Code</label>
                        <input
                            type="text"
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="form-control"
                            id="inputZip"
                        />
                        </div>
                        <div className="form-group col-md-2">
                        <label for="inputZip">Country</label>
                        <input
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            className="form-control"
                            id="inputZip"
                        />
                        </div>
                    </div>
                    <div className="row">
                        <button
                        className="btn btn-warning ml-auto mr-4"
                        onClick={() => addNewAddress()}
                        type="button"
                        >
                        Save Address
                        </button>
                    </div>
                    </form>
                </div>
          )
        }
    }


    const shoppingProfile = () => {
        return (
            <div className="conatiner">
                {handelAddress()}
                <div
          className="row bg-white"
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
          }}
        >
          <div>
            <p
              className="ml-3 my-2 mb-5"
              style={{ color: "#4179CF", fontSize: "2rem" }}
            >
              {" "}
              Shopping Cart
            </p>
          </div>
          <div className="col-12">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  className="nav-link active"
                  style={{ color: "#3680B4" }}
                  id="nav-cart-tab"
                  data-toggle="tab"
                  href="#nav-cart"
                  role="tab"
                  aria-controls="nav-cart"
                  aria-selected="true"
                >
                  <i className="fas fa-shopping-cart mr-3"></i>Cart
                </a>
                <a
                  className="nav-link"
                  style={{ color: "#3680B4" }}
                  id="nav-wishlist-tab"
                  data-toggle="tab"
                  href="#nav-wishlist"
                  role="tab"
                  aria-controls="nav-wishlist"
                  aria-selected="false"
                >
                  <i className="fas fa-heart mr-3"></i>Wishlist
                </a>
                <a
                  className="nav-link"
                  style={{ color: "#3680B4" }}
                  id="nav-orders-tab"
                  data-toggle="tab"
                  href="#nav-orders"
                  role="tab"
                  aria-controls="nav-orders"
                  aria-selected="false"
                >
                  <i className="fas fa-list-alt mr-3"></i>Orders
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div
          className="row bg-white"
          style={{ minHeight: "40rem", padding: 20 }}
        >
          <div className="tab-content container-fluid p-0" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-cart"
              role="tabpanel"
              aria-labelledby="nav-cart-tab"
            >
              {/* {cart && viewCart()} */}
              {viewCart()}
            </div>
            <div
              className="tab-pane fade"
              id="nav-wishlist"
              role="tabpanel"
              aria-labelledby="nav-wishlist-tab"
            >
              {/* {wishlist && viewWishlist()} */}
              {viewWishlist()}
            </div>
            <div
              className="tab-pane fade"
              id="nav-orders"
              role="tabpanel"
              aria-labelledby="nav-orders-tab"
            >
              {/* {orders && viewOrders()} //order */}
              {viewOrders()}
            </div>
            {/* Order Amount {orderAmount} */}
            {viewPlaceOrder()}
            
          </div>
        </div>
            </div>
        )
      };


  return  (
    <div className="container-fluid p-0" style={{
      backgroundColor: "white"
    }}>   
    <Header></Header>
    <div className="container-fluid">{shoppingProfile()}</div>
    
      </div>
  )
  
}


