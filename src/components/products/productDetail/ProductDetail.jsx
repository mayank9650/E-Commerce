import React from "react";
import Modal from "../../../utils/molecules/modal/Modal";
import "./productDetail.css";
import SmoothImage from "../../../utils/atoms/smoothImage/SmoothImage";

export default function ProductDetail({
  selectedProduct,
  updateSelectedProduct,
}) {
  return (
    <Modal isOpen={true} onClose={() => updateSelectedProduct(null)}>
      <div className="details-container">
        <div className="details-image">
          <SmoothImage
            src={selectedProduct?.image}
            alt={selectedProduct?.title}
            width={"100%"}
            height={"100%"}
            preloader
          ></SmoothImage>
        </div>
        <div className="details-section">
          <h2 className="details-title">{selectedProduct?.title}</h2>
          <p className="details-description">{selectedProduct?.description}</p>
          <p className="details-category">
            <b className="details-name">Category: </b>
            {selectedProduct?.category}
          </p>
          <p className="details-price">
            <b className="details-name">Price: </b>${selectedProduct?.price}
          </p>
          <p className="details-rating">
            <b className="details-name">Rating: </b>{" "}
            {selectedProduct?.rating?.rate}
          </p>
        </div>
      </div>
    </Modal>
  );
}
