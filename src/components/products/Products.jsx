import React, { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import { getRequest } from "../../utils/api";
import { END_POINTS, TEXT_CONSTANS } from "../../utils/constants";
import ProductList from "./productList/ProductList";
import "./products.css";

export default function Products() {
  const DEFAULT_LIMIT = 5;
  const [productsList, setProductList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filterData, setFitlerData] = useState({
    sort: "asc",
    category: null,
  });
  const [pagination, setPagination] = useState();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchProducts = (updatedFilters) => {
    let endPoint = `?sort=${updatedFilters.sort}&limit=${updatedFilters.limit}`;
    if (updatedFilters.category) {
      endPoint = `/category/${updatedFilters.category}?sort=${updatedFilters.sort}&limit=${updatedFilters.limit}`;
    }
    return getRequest(endPoint);
  };

  const fetchInitialData = async () => {
    try {
      const [productsList, categories] = await Promise.allSettled([
        fetchProducts({ sort: filterData.sort, limit: DEFAULT_LIMIT }),
        getRequest(END_POINTS.categories),
      ]);

      if (productsList.status === "fulfilled") {
        setProductList(productsList.value);
      }
      if (categories.status === "fulfilled") {
        setCategoryOptions(categories.value);
      }
    } catch (err) {
      console.log(TEXT_CONSTANS.WENT_WRONG);
    }
  };

  const updateFilters = async (name, value) => {
    setFitlerData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    let updatedFilter = { ...filterData, [name]: value, limit: DEFAULT_LIMIT };

    const data = await fetchProducts(updatedFilter);
    console.log("data", data);
  };

  const renderProductList = () => {
    if (productsList.length < 1) {
      return (
        <h2 className="section-title">
          no products matched your search criteria
        </h2>
      );
    }

    return (
      <section className="section">
        <h2 className="section-title">Products List</h2>
        <div className="products-center">
          {productsList.map((item) => {
            return <ProductList key={item.id} {...item} />;
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="products-wrapper">
      {/* Filter options */}
      <Filter
        updateFilters={updateFilters}
        filterData={filterData}
        categoryOptions={categoryOptions}
      ></Filter>
      {/* Products List  */}
      {renderProductList()}
    </div>
  );
}
