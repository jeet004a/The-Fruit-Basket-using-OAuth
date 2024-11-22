import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import { Profile } from './Profile';
export const Header = () => {

    const navigate=useNavigate()
    const [userInfo,setUserInfo]=useState(null)

    useEffect(() => {
        const data=localStorage.getItem('user-info')
        const userData=JSON.parse(data)
        setUserInfo(userData)
        
      }, []);
    //   console.log(userInfo)
    const handlelogout=()=>{
        localStorage.removeItem('user-info')
        navigate('/login')
    }
    // console.log(userInfo)
    const userProfile=()=>{
        navigate('/profile')
    }

    const loginProfile = () => {
        if(userInfo){
            return (
                <ul className="navbar-nav" >
                <li className="nav-item">
                   <a href="#" className="btn-lg nav-link text-warning">
                   <i className="fas fa-shopping-cart"></i>
                   </a>
               </li>
               <li className="nav-item">
                   {/* <Link to="/login" className="btn-lg nav-link text-white">
                   <FaShoppingCart />
                       <span className="ml-1" >Login</span>
                   </Link> */}
                   <FaShoppingCart />
                   {/* <IoCartOutline/> */}
                   
                   <button onClick={userProfile} style={{
                    background: "none",
                    color: "inherit",
                    border: "none", 
                    cursor: "pointer",
                    outline: "inherit"
                   }}> <FaUser/>  {userInfo.name}</button>
                   <button onClick={handlelogout} style={{
                    background: "none",
                    color: "inherit",
                    border: "none", 
                    cursor: "pointer",
                    outline: "inherit"
                   }}>Logout</button>
                   {/* <a onClick={handlelogout}><FaRegUser/></a> */}
               </li>   
        </ul>
            );
        }
        else{
            return (
                <ul className="navbar-nav" >
                <li className="nav-item">
                   <a href="#" className="btn-lg nav-link text-warning">
                   <i className="fas fa-shopping-cart"></i>
                   </a>
               </li>
               <li className="nav-item">
                   {/* <Link to="/login" className="btn-lg nav-link text-white">
                   <FaShoppingCart />
                       <span className="ml-1" >Login</span>
                   </Link> */}
                   {/* <FaShoppingCart /> */}
                   <IoCartOutline/>
                   <button onClick={handlelogout} style={{
                    background: "none",
                    color: "inherit",
                    border: "none", 
                    cursor: "pointer",
                    outline: "inherit"
                   }}><FaRegUser/> Logout</button>
                   {/* <a onClick={handlelogout}><FaRegUser/></a> */}
               </li>   
        </ul>
            );
        }


//     return (
//         <ul className="navbar-nav" >
//         <li className="nav-item">
//            <a href="#" className="btn-lg nav-link text-warning">
//            <i className="fas fa-shopping-cart"></i>
//            </a>
//        </li>
//        <li className="nav-item">
//            {/* <Link to="/login" className="btn-lg nav-link text-white">
//            <FaShoppingCart />
//                <span className="ml-1" >Login</span>
//            </Link> */}
//            {/* <FaShoppingCart /> */}
//            <IoCartOutline style={{width: "20px"}}/>
//            <button onClick={handlelogout} style={{
//             background: "none",
//             color: "inherit",
//             border: "none", 
// 	        cursor: "pointer",
//             outline: "inherit"
//            }}><FaRegUser/> Logout</button>
//            {/* <a onClick={handlelogout}><FaRegUser/></a> */}
//        </li>   
// </ul>
//     );

}



   return ( 
   <nav className="navbar navbar-expand-sm navbar-light border-bottom" style={{ backgroundColor: '#61AB4F', width:"108.5rem", top:"0",}}>
            <div className="container-fluid">
                <a href="#"><Link className="navbar-brand text-white" to="/">The Fruit Basket</Link></a>
                <button className="navbar-toggler btn-lg" data-toggle="collapse" data-target="#navbarNav">
                    <i className="fa fa-bars" aria-hidden="true" style={{ backgroundColor: '#4DA052', color: '#FFF'}}></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav m-auto">
                    </ul>
                    {loginProfile()}
                </div> 
            </div>
        </nav>
        );
}