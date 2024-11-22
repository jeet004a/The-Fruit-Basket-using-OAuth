import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { Header } from './Header';
import axios from 'axios'
import Item from './Item'

function Dashboard() {
    const [userInfo,setUserInfo]=useState(null)
    const navigate=useNavigate()
    const [name,setName]=useState([])
    const [desc,setDesc]=useState([])
    const [banner,setBanner]=useState([])
    const [price,setPrice]=useState([])
    const [all,setAll]=useState(null)
    let itemBody=[]
    useEffect(() => {
      const data=localStorage.getItem('user-info')
      const userData=JSON.parse(data)

      const fetchData=(
        async()=>{
          try {
            const response=await axios('http://localhost:8002')
            let img=response.data.data.products
            // console.log('abc',img)
            setAll(img)
          } catch (error) {
            console.log(error)
          }
        }
      )()

      // fetchData()
      // console.log(all[0].name)
      // all.map((item)=>{
      //   console.log(item.name)
      // })
      // console.log(all)
      // console.log(all)
      setUserInfo(userData)
    }, []);

    const handlelogout=()=>{
        localStorage.removeItem('user-info')
        navigate('/login')
    }
    // for(let i=0;i<all.length;i++){
    //   itemBody.push(<Item key={i} name={all[i].name} desc={all[i].desc} banner={all[i].banner} price={all[i].price} id={all[i]._id}></Item>)
    // }
    // itemBody.push(<Item></Item>)
  return (
    // <div>
    //   <h1>Name: {userInfo?.name}</h1>
    //   <h3>Email: {userInfo?.email}</h3>
    //   <img src={userInfo?.image} alt={userInfo?.email} />
    //   <button onClick={handlelogout}>LogOut</button>
    //   {/* hello */}
    // </div>
    // class="container-fluid p-0"
    <div className="container-fluid p-0" style={{
      backgroundColor: "white",
      width: "100%"
    }}>   
    <Header/>

      <img src="bg.jpg" className="card-img" style={{
        
        height: "50.2rem",
        width: "108.5rem",
        display: "flex"

      }} alt="..."></img>
      
      {/* <div style={{
        display: "flex",
        alignItem: "center",
        flexDirection: "row"
      }}> */}
      {/* {itemBody} */}
      <Item ></Item>
      {/* </div> */}
      
    </div>
  );
}

export default Dashboard;
