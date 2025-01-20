import React from "react";
import Button from "../../../utils/atoms/button/Button";
import { TEXT_CONSTANS } from "../../../utils/constants";

import "./productList.css";

export default function ProductList({
  product,
  handleRef,
  updateSelectedProduct,
}) {
  const { image, title, category } = product;

  return (
    <article className="single-product-wrapper" ref={handleRef}>
      <div className="single-product">
        <div className="img-container">
          <img src={image} alt={title} loading={"lazy"} />
        </div>
        <div className="product-footer">
          <h3 className="title">{title}</h3>
          <p className="category">{category}</p>
          <Button
            text={TEXT_CONSTANS.DETAIL}
            className="btn btn-primary btn-details"
            onClick={() => updateSelectedProduct(product)}
          ></Button>
        </div>
      </div>
    </article>
  );
}
