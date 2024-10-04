import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './Products.css'
import Header from "../Header/Header";
const Products = () => {
  const [category, setCategory] = useState([]); 
  const [models, setModels] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [filterProducts, setFilterProducts] = useState([]); 
  const [selectedMake, setSelectedMake] = useState("All"); 
  const [selectedModel, setSelectedModel] = useState("All");

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await axios.get('https://freetestapi.com/api/v1/cars'); 
      setProducts(data); 
      setFilterProducts(data); 
      const make = [...new Set(data.map((item) => item.make))]; 
      const model = [...new Set(data.map((item) => item.model))]; 
      setModels(model);
      setCategory(make);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFilter = (make, model) => {
    let filteredData = products;

    
    if (make !== "All") {
      filteredData = filteredData.filter((item) => item.make === make);
    }

    
    if (model !== "All") {
      filteredData = filteredData.filter((item) => item.model === model);
    }

    setFilterProducts(filteredData);
  };

  const handleMakeChange = (make) => {
    setSelectedMake(make);
    handleFilter(make, selectedModel); 
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    handleFilter(selectedMake, model); 
  };

  return (
      <>
      <Header />
      <div className="flex justify-center items-center m-2 gap-4">
        <div>
          <select
            value={selectedMake}
            onChange={(e) => handleMakeChange(e.target.value)}
            className="border-2 border-solid border-blue rounded"
          >
            <option value="All">All Makes</option>
            {category.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            className="border-2 border-solid border-black rounded"
          >
            <option value="All">All</option>
            {models.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex  flex-wrap gap-2 justify-center items-center">
        {filterProducts.length > 0 ? (
          filterProducts.map((item) => {
            const { image, make, id, price, engine, year, color, mileage, fuelType, model } = item;
            return (
              <div key={id} className="w-56 product-card poppins-reg h-auto m-3 border-2 rounded-lg border-solid border-blue-600">
                <div className="m-2">
                  <img className="w-36 h-40 mx-auto" src={image} alt={model} />
                </div>
                <div className="h-56 overflow-hidden flex flex-col justify-center items-center text-blue-600">
                  <h3 className="font-bold p-1 mx-auto">{make} {model}</h3>
                  <p className="p-2">Engine: {engine}</p>
                  <p className="p-2">Color: {color}</p>
                  <p className="p-2">Mileage: {mileage}</p>
                  
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="border-2 p-1 m-1 border-solid border-black rounded-lg"
                    onClick={() => navigate(`/products/${id}`)}
                  >
                    View More
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
};

export default Products;
