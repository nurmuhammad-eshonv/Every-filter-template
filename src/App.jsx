
import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./assets/data.json";

function App() {
  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");
  const [category, setCategory] = useState(() => localStorage.getItem("category") || "all");
  const [company, setCompany] = useState(() => localStorage.getItem("company") || "");
  const [shipping, setShipping] = useState(() => localStorage.getItem("shipping") === "true");
  // const [priceRange, setPriceRange] = useState(() => localStorage.getItem("priceRange") || "100");

  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    localStorage.setItem("company", company);
  }, [company]);

  useEffect(() => {
    localStorage.setItem("shipping", shipping);
  }, [shipping]);

  // useEffect(() => {
  //   localStorage.setItem("priceRange", priceRange);
  // }, [priceRange]);

  function handeClear() {
    setSearch("");
    setCategory("all");
    setCompany("");
    setShipping(false);
    // setPriceRange("100");
    localStorage.clear(); 
  }

  return (
    <>
      <nav>
        <div>
          <div>
            <form className="max-w-[1100px] mx-auto" action="">
              <div className="div-1 mt-[30px] bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
                <div>
                  <label htmlFor="search">Search Product</label>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                    value={search}
                    className="input input-bordered w-full h-[32px]"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="option">Select Category</label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    id="option"
                    className="select select-bordered w-full select-xs font-[700] h-[32px]"
                  >
                    <option>All</option>
                    <option>Tables</option>
                    <option>Chairs</option>
                    <option>Sofas</option>
                    <option>Beds</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sortOrder">Select Company</label>
                  <input
                    onChange={(e) => setCompany(e.target.value)}
                    id="company"
                    value={company}
                    className="input input-bordered w-full h-[32px]"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="sortOrder">Sort By</label>
                  <select
                    id="sortOrder"
                    className="select select-bordered w-full font-[700] select-xs h-[32px]"
                  >
                    <option>a-z</option>
                    <option>z-a</option>
                    <option>high</option>
                    <option>low</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="priceRange"
                    className="text-[14px] flex justify-between font-[600]"
                  >
                    <span>Select Price</span>
                    <span></span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max="10000"
                    // value={priceRange}
                    // onChange={(e) => setPriceRange(e.target.value)}
                    className="range range-primary"
                  />
                  <label className="text-[13px] flex justify-between font-[600]">
                    {/* <span>${priceRange}</span> */}
                    <span>Max: $1.000.00</span>
                  </label>
                </div>
                <div className="flex flex-col items-center">
                  <label htmlFor="checkbox">Free shipping</label>
                  <input
                    onChange={(e) => setShipping(e.target.checked)}
                    checked={shipping}
                    type="checkbox"
                    name="shipping"
                    className="mt-2 checkbox checkbox-primary checkbox-sm"
                  />
                </div>
                <button type="button" className="btn btn-sm btn-primary">
                  Filter
                </button>
                <button
                  onClick={handeClear}
                  type="button"
                  className="btn btn-sm btn-secondary"
                >
                  Reset
                </button>
              </div>
            </form>
            <div className="bg-base-200 my-7 py-3 rounded-[8px] flex justify-between max-w-[1100px] mx-auto">
              <p className="text-[20px] font-[600] mx-[20px]"> Products</p>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-wrap gap-16 cont">
        {data
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .filter((item) => {
            return category.toLowerCase() === "all" || category === ""
              ? item
              : item.category.toLowerCase() === category.toLowerCase();
          })
          .filter((item) => {
            return company.toLowerCase() === ""
              ? item
              : item.company.toLowerCase().includes(company);
          })
          // .filter((item) => {
          //   return item.price <= priceRange;
          // })
          .filter((item) => {
            return !shipping || item.shipping === true;
          })
          .map((item, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl mt-16">
              <figure>
                <img className="w-80 h-80" src={item.image} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-center justify-center text-3xl mb-3">
                  {item.title}
                </h2>
                <div className="badge w-32 h-6 badge-secondary ">
                  {" "}
                  {item.category}
                </div>
                <p className="text-orange-400">
                  <span className="text-green-400 text-2xl">company: </span>
                  {item.company}
                </p>
                <p className="text-3xl  "> PRICE: {item.price} $</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline flex">
                    {" "}
                    <span className="mr-3 mb-1">FREE shipping</span>{" "}
                    <input className="mt-0" type="checkbox" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
