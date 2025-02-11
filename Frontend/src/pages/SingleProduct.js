import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from '../router/api'
import "../comp_css/SingleProduct.css";
import axios from "axios";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const userid = localStorage.getItem("userid");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8081/emedicines/${productId}`)
  //     .then((response) => {
  //       setProduct(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data from the API: ", error);
  //     });
  // }, [productId]);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8081/medicines/${productId}");
        const productsWithImages = response.data.map((product) => ({
          ...product,
          imageUrl: product.imageUrls || "http://127.0.0.1:8081/medicines/ametone.jpg",
        }));
  
        setProducts(productsWithImages);
        setFilteredProducts(productsWithImages);  // Initial filtered list
      } catch (error) {
        console.error("Error fetching data from the API: ", error);
      }
    };
  
    fetchProducts();
  }, []);
  









  const addProductToCart = (productid) => {
    api
      .post(
        `http://127.0.0.1:8081/emedicine/cart/add-product/${userid}/${productid}`
      )
      .then((response) => {
        localStorage.setItem("cartid", response.data.cartId);
        alert("Product added to Cart.....");
      })
      .catch((error) => {
        alert("Product Alredy in cart......");
      });
  };
  return (
    <>
    <h1 style={{color:"green",textAlign:"center",margin:"20px"}}>Single Product </h1>
    <div className="product-container">
     
      <div className="product-details">
        <div className="product_image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product_details">
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <p>Price: ₹ {product.price}</p>

          <div>
            <button
              onClick={() => {
                addProductToCart(product.productId);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="counter-box">
        <div>
          <button
            onClick={() => {
              navigate("/user/cart");
            }}
          >
            Move To Cart
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SingleProduct;
