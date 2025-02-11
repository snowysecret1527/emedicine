import React, { useState, useEffect } from "react";
import "../comp_css/AllProductAdmin.css";
import axios from "axios";
import UpdateProductForm from "./UpdateProductForm";

const AllProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://127.0.0.1:8081/medicines/all");
      const sortedProducts = response.data.sort((a, b) => b.productId - a.productId);
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const updateProduct = (productIdToUpdate) => {
    const productToUpdate = products.find((product) => product.productId === productIdToUpdate);
    setSelectedProduct(productToUpdate);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setShowUpdateModal(false);
  };

  const handleUpdate = (updatedProduct) => {
    axios
      .put(`http://127.0.0.1:8081/medicines/update/${updatedProduct.productId}`, updatedProduct)
      .then(() => {
        closeUpdateModal();
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const deleteProduct = (productIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://127.0.0.1:8081/medicines/${productIdToDelete}`)
        .then(() => {
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 style={{ color: "green", textAlign: "center", margin: "5px" }}>
        ALL Live Products
      </h1>

      {showUpdateModal && (
        <div className="update-modal">
          <UpdateProductForm
            product={selectedProduct}
            onUpdate={handleUpdate}
            onClose={closeUpdateModal}
          />
        </div>
      )}

      <div className="product-container1">
        {products.map((product) => (
          <div className="product-card1" key={product.productId}>
            <div className="product-image11">
              <img
                src={product.imageUrls}  // Use the full image URL provided by the backend
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder_image.jpg"; // Default fallback image
                }}
              />
            </div>
            <div className="product-info1">
              <h2>{product.name}</h2>
              <p>Product ID: {product.productId}</p>
              <p>Category: {product.category}</p>
              <p>
                Description:{" "}
                {product.description.length > 30
                  ? product.description.substring(0, 50) + "..."
                  : product.description}
              </p>
              <h2 className="product-price1">Price: ₹ {product.price}</h2>
              <div className="button-container1">
                <button onClick={() => updateProduct(product.productId)}>Update</button>
                <button onClick={() => deleteProduct(product.productId)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllProductAdmin;
