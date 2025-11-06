import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import Sales from "./pages/sales/Sales";
import Cart from "./pages/cart/Cart";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/*header layout*/}
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Products />} />
        <Route path="sales" element={<Sales />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
