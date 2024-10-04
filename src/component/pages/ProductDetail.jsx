import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const ProductDetail = () => {
    const {id}=useParams();
    
    const [products,setProducts]=useState(null)
    let res;
    const getData=async()=>{
        try{
            const data=await axios.get(`https://freetestapi.com/api/v1/cars/${id}`)
            res=data?.data;
            setProducts(res)
        }
        catch(error){
            console.log(error)  
         }
    }
    useEffect(()=>{
        getData()
    },[id])
    
    if (!products) {
        return <div>Loading...</div>;
      }
    

        const{ image, make, price, engine,color,mileage,fuelType,year, model }=products;
   
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
        
            
                <div  className="w-56 h-auto m-3 border-2 rounded-lg border-solid border-black">
                    <div className="m-2 ">
                        <img className="w-36 h-40 mx-auto" src={image} alt="" />
                    </div>
                    <div className="h-auto overflow-hidden flex flex-col justify-center items-center">
                        <h3 className="font-bold p-1 mx-auto">{make}{model}</h3>
                        <p className="p-2">Engine : {engine}</p>
                        <p className="p-2">Price : {price}</p>
                        <p className="p-2">Year: {year}</p>
                        <p className="p-2">Engine : {engine}</p>
                        <p className="p-2">Color : {color}</p>
                        <p className="p-2">Mileage : {mileage}</p>
                        <p className="p-2">FuelType : {fuelType}</p>
                        <p className='p-2'>Price : ${price}</p>
                        

                    </div>
                    <div className="flex justify-center items-center">

                    </div>
                </div>

            
        

      
    </div>
  )
}

export default ProductDetail
