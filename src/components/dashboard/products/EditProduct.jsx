import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setTitle(data.title);
        setPrice(data.price);
        setImg(data.img);
        setCategory(data.category);
        setDesc(data.desc);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = { title, price, img, category, desc };
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Product updated:", data);
      navigate("/admin/jsonProducts");
    } catch (error) {
      setError(error.message);
      console.error("Error updating product:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <div className="inp">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="img">Image URL:</label>
          <input
            id="img"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
