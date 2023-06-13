import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
  } = CartState();
  const {
    filterState: { byStock, byFastDelivery, byRating, sort,searchQuery },
    filterDispatch,
  } = CartState();
  const transformProducts = () => {
    let filteredProduct = products;
    if (sort) {
      filteredProduct = filteredProduct.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    byStock ||
      (filteredProduct = filteredProduct.filter((prod) => prod.inStock > 0));
    byFastDelivery &&
      (filteredProduct = filteredProduct.filter(
        (prod) => prod.fastDelivery === true
      ));
    {
      byRating > 0
        ? (filteredProduct = filteredProduct.filter(
            (prod) => prod.ratings >= byRating
          ))
        : filteredProduct;
    }
    if (searchQuery) {
      filteredProduct = filteredProduct.filter((prod)=>
      prod.name.toLowerCase().includes(searchQuery));
    }
    return filteredProduct;
  };
  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((product) => {
          return <SingleProduct product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
