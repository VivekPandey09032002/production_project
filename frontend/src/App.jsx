import { useDispatch } from "react-redux"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Suspense, useEffect } from "react"
import { calculatePrice } from "./utils/UserLogic"
import React, { useState } from "react"

import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Loading from "./components/Loading"
import { fetchFeaturedProducts } from "./store/featuredProductSlice"
import { add } from "./store/cartSlice"
import { fetchUser } from "./store/userSlice"


const SingleProduct = React.lazy(() => import("./pages/SingleProduct"))
const CartPage = React.lazy(() => import("./pages/CartPage"))
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"))
const UserPage = React.lazy(() => import("./pages/UserPage"))
function App() {
  const dispatch = useDispatch()
  const [userDetail, setUserDetail] = useState({})
  const { data: user } = useNavigate((state) => state.user)
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"))
      const price = calculatePrice(cart)
      dispatch(add({ data: cart, price }))
    }
    dispatch(fetchFeaturedProducts())
    dispatch(fetchUser())
  }, [])

  return (
    <div style={{ overflow: "hidden" }}>
      <Suspense fallback={<Loading />}>
        <NavBar userDetail={userDetail} setUserDetail={setUserDetail} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<SingleProduct />}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
