import React,{useState,useEffect} from 'react';
import axios from 'axios'
import Cart from './Cart'
function Item() {
  const [all,setAll]=useState("Loading...")
  let stb=[]
  const getData=async()=>{
      try {
        await axios('http://localhost:8002').then((response)=>{
          setAll(response.data.data.products)
        })
        // let img=response.data.data.products
        // // console.log('abc',img)
        // setAll(img)
      } catch (error) {
        console.log(error)
      }
    }
  useEffect(() => {
    getData()
  }, []);

  const cart=async(id)=>{
    const data=localStorage.getItem('user-info')
    const userData=JSON.parse(data)
    // console.log('Add to cart',id)
    // console.log(userData)
    const response=await axios.put(`http://localhost:8002/cart/${id}`,
      {name: userData.email},
      {
      headers: {
        Authorization: `Bearer ${userData.token}`, // Add the token here
      }
    })
    // console.log(response)
  }

  // console.log(all)
  for(let i=0;i<all.length;i++){
    stb.push(
      <div class="card" style={{
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        width: "20%",
        // marginTop: "5px",
        margin: "5px 5px 5px 5px",
      }}>
        <img src={all[i].banner} style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          height: "180px",
          width: "100px"
        }}></img>
          <div class="container">
            <h4><b>{all[i].name}</b></h4> 
            <p>{all[i].desc}</p> 
          </div>  
          <button onClick={()=>cart(all[i]._id)}>Add to Cart</button>
      </div> 
    )
  }
  return (
    <div style={{
      display: "flex",
      alignItem: "center",
      flexDirection: "row"
    }}>
      {stb}
    </div>

  );
}

export default Item;
