import React, { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import { getRequest } from "../../utils/api";
import {
  DEFAULT_LIMIT,
  END_POINTS,
  TEXT_CONSTANS,
} from "../../utils/constants";
import ProductList from "./productList/ProductList";
import "./products.css";
import useObserver from "../../utils/useObserver";
import Loader from "../../utils/molecules/loader/Loader";
import ProductDetail from "./productDetail/ProductDetail";

export default function Products() {
  const [productsList, setProductList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filterData, setFitlerData] = useState({
    sort: "asc",
    category: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(DEFAULT_LIMIT);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lastProductElement, setLastProductElement] = useState(null);
  const obsElement = useObserver(lastProductElement);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (obsElement) {
      updateProductsList();
    }
  }, [obsElement]);

  const updateProductsList = async () => {
    try {
      let updatedFilter = {
        ...filterData,
        limit: pagination + DEFAULT_LIMIT,
      };
      setPagination(pagination + DEFAULT_LIMIT);
      setIsLoading(true);

      const resp = await fetchProducts(updatedFilter);
      if (resp) {
        // Directly updating the response as not able to get the page specific result
        setProductList(resp);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("Something went wrong in updateProductList!");
    }
  };

  const fetchProducts = (updatedFilters) => {
    let endPoint = `?sort=${updatedFilters.sort}&limit=${updatedFilters.limit}`;
    if (updatedFilters.category) {
      endPoint = `/category/${updatedFilters.category}?sort=${updatedFilters.sort}&limit=${updatedFilters.limit}`;
    }
    return getRequest(endPoint);
  };

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (err) {
      console.log(TEXT_CONSTANS.WENT_WRONG);
      setIsLoading(false);
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
    try {
      setPagination(DEFAULT_LIMIT);
      setIsLoading(true);
      window.scrollTo(0, 0);

      const data = await fetchProducts(updatedFilter);
      if (data) {
        setProductList(data);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("Something went wrong in updateFilters!");
      setIsLoading(false);
    }
  };

  const handleRef = (event) => {
    if (event) {
      setLastProductElement(event);
    }
  };

  const updateSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const renderProductList = () => {
    if (productsList.length < 1 && !isLoading) {
      return <h2 className="section-title">{TEXT_CONSTANS.NO_PRODUCTS}</h2>;
    }

    return (
      <section className="section">
        <h2 className="section-title">Products List</h2>
        <div className="products-center">
          {productsList.map((product) => {
            return (
              <ProductList
                key={product.id}
                product={product}
                handleRef={handleRef}
                updateSelectedProduct={updateSelectedProduct}
              />
            );
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
      {isLoading && <Loader></Loader>}
      {renderProductList()}
      {selectedProduct && (
        <ProductDetail
          selectedProduct={selectedProduct}
          updateSelectedProduct={updateSelectedProduct}
        ></ProductDetail>
      )}
    </div>
  );
}
