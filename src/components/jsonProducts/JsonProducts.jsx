import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JsonProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/editProduct/${id}`);
  };

  const handleDeleteProducts = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted successfully!");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const card = products?.map((el) => (
    <div key={el.id} className="card">
      <img src={el.img} alt={el.title} />
      <h3>{el.title.substring(0, 20)}...</h3>
      <p className="desc">{el.desc.substring(0, 30)}...</p>
      <div className="card__bottom">
        <div className="text">
          <p>
            {el.price}$ <span>50$</span>
          </p>
        </div>
        <div className="delete">
          <button onClick={() => handleEdit(el.id)}>
            <CiEdit />
          </button>
          <button
            className="delete2"
            onClick={() => handleDeleteProducts(el.id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="json__products">
      <div className="cards">{card}</div>
    </div>
  );
};

export default JsonProducts;
