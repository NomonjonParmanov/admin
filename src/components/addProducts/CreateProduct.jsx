import React, { useState } from "react";
const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      price,
      img,
      category,
      desc,
    };
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added:", data);
        setTitle("");
        setPrice("");
        setImg("");
        setCategory("");
        setDesc("");
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <div className="inp">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            name="title"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="price">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            name="price"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="Image-url">Image-url</label>
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            type="text"
            placeholder="Image-url"
            name="Image-url"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="Category">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Category"
            name="Category"
            required
          />
        </div>
        <div className="inp">
          <label htmlFor="description">Description</label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder="Description"
            name="description"
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
