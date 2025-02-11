import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import "../comp_css/Product.css";
//import "../comp_css/HomeProduct.css";
import api from "../router/api";
// import imageUrl from "../router/imageUrl";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceOrder, setPriceOrder] = useState("All");
  const [nameSearch, setNameSearch] = useState("");
  let userid = localStorage.getItem("userid");

  const filterProducts = (category, priceOrder, nameSearch, data) => {
    let filteredProducts = data;

    if (category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }
    
    if (priceOrder === "LowToHigh") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "HighToLow") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (nameSearch !== "") {
      const searchQuery = nameSearch.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8081/medicines/all")
      .then((response) => {
        // Map through the response data to add image URLs if they're not already present
        const productsWithImages = response.data.map(product => ({
          ...product,
          // If your API returns an image URL
          imageUrl: product.imageUrls || "http://127.0.0.1:8081/medicines/paracetamol.jpeg",
         
        }));
  
        setProducts(productsWithImages);
        filterProducts(selectedCategory, priceOrder, nameSearch, productsWithImages);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [selectedCategory, priceOrder, nameSearch]);

  const addProductToCart = (productid) => {
    api
      .post(`/emedicines/cart/add-product?userId=${userid}&productId=${productid}`)
      .then((response) => {
        localStorage.setItem("cartid", response.data.cartId);
        alert("product added to Cart");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("Error To adding Product . Please try again later.");
          console.error("Error registering:", error);
        }
      });
  };

  return (
    <div className="product-page">
      <div className="filter-section">
      </div>

      

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <h1
            style={{
              margin: "50px",
              color: "green",
              width: "800px"

            }}
          >
            Product Not found ....
          </h1>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.productId}>
              <div className="product-image1">
                <img src={product.imageUrl} alt={product.name} />
                console.log("Image URL:", product.imageUrl);
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>
                  <strong>Category :</strong> {product.category}
                </p>
                <p>
                  <strong>Description: </strong>
                  {product.description.substring(0, 25)}
                </p>
                <h2 className="product-price">Price: ₹ {product.price}</h2>
                <div>
                  <button onClick={() => addProductToCart(product.productId)}>
                    Add to Cart
                  </button>
                  <button>
                    <Link
                      to={`/product/${product.productId}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      View
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
};
  

export default HomeProduct;
















