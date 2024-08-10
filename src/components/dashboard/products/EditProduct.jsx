import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../context/productApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImg(product.image);
      setCategory(product.category);
      setDesc(product.desc);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { title, price, img, category, desc };
    updateProduct({ id, body: updatedProduct })
      .then(() => {
        console.log("Product updated successfully");
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.error("Failed to update the product: ", error);
      });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="edit">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="inp">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Image URL"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Product Category"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Product Description"
            required
          ></textarea>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
