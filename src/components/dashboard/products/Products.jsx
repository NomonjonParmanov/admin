import React from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../../context/productApi";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Products = () => {
  const { data } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/editProduct/${id}`);
  };

  const handleDeleteProducts = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .then(() => {
          console.log("Product deleted successfully");
        })
        .catch((error) => {
          console.error("Failed to delete the product: ", error);
        });
    }
  };

  const card = data?.map((el) => (
    <div key={el.id} className="card">
      <img src={el.image} alt={el.title} />
      <h3>{el.title.substring(0, 20)}</h3>
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

  return <div className="product">{card}</div>;
};

export default Products;
