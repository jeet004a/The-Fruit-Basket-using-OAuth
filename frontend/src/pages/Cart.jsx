import React,{useState,useEffect} from 'react';
import { CiCircleMinus } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa6";
import axios from 'axios'



function Cart(props) {
    // console.log('xyz',props.item._id)
    let [count,setCount]=useState(null)
    let [amount,setAmount]=useState(0)

    useEffect(() => {
      setCount(props.unit)

    let c=0
    for(let i=0;i<props.cart.length;i++){
        c=c+(props.cart[i].unit*props.cart[i].product.price)
    }
        
    props.setOrderAmount(c)
    }, []);
    
    const orderIn=async()=>{
        let totalAmount=0
        props.cart.map(({ unit, product }) => {
        props.setOrderAmount(props.orderAmount+product.price)
        });
    }

    const dec=async()=>{
        let totalAmount=0
        props.cart.map(({ unit, product }) => {
        if(props.orderAmount>0){
            props.setOrderAmount(props.orderAmount-product.price)
        }
        });
        // console.log(amount)
    }

    const addCart=async(id)=>{
        try {
            const data=localStorage.getItem('user-info')
            const userData=JSON.parse(data)
            // console.log(userData)
            // console.log(id)
            const response=await axios.put(`http://localhost:8002/cart/${id}`,
            {name: userData.email},
            {
            headers: {
                Authorization: `Bearer ${userData.token}`, // Add the token here
            }
            })
            // console.log('aaa',props)
            setCount(count+1)
            orderIn()
            
        } catch (error) {
            console.log('error location Cart jsx',error)
        }
    }

    const removeCart=async(id)=>{
        try {
            const data=localStorage.getItem('user-info')
            const userData=JSON.parse(data)
            const data2 = {
                name: userData.email,
            };
            const headers= {
                Authorization: `Bearer ${userData.token}`, // Add the token here
            }
            const response=await axios.delete(`http://localhost:8002/cart/${id}`,
                {
                    data: data2,
                    headers: headers
                }  
            )
            if(count>0){
                setCount(count-1)
            }
            // console.log(userData)
            dec()
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="row mb-2 p-1 border rounded">
            <div className="col-2">
                <img variant="top" style={{ width: '6rem'}} src={props.item.banner} />
            </div>
            <div className="col p-2">
                <span className="font-weight-bold">{props.item.name}</span>
                <p className="text-secondary" style={{ fontSize: '0.9rem'}}>{props.item.type}</p>
                <span>₹{props.item.price}</span>
            </div>
            <div className="col-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <button className="btn bg-warning"
                        onClick={() => removeCart(props.item._id)}
                    >
                        {/* <i className="fas fa-minus"></i> */}  
                        <FaMinus />
                    </button>
                    <span className="m-3" style={{ fontSize: '2.0rem'}}>{count} Unit</span> 
                    <button className="btn bg-warning"
                        onClick={() => addCart(props.item._id) }
                    >
                        {/* <i className="fas fa-plus"></i> */}
                        <TiPlus />
                    </button>
            </div>
        </div>
    );
}

export default Cart;
