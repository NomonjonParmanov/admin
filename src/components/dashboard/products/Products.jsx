import React from "react";
import { useGetProductsQuery } from "../../../context/productApi";

const Products = () => {
  const { data } = useGetProductsQuery();

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
      </div>
    </div>
  ));

  return <div className="product">{card}</div>;
};

export default Products;
