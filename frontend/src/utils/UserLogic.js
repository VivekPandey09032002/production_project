import axios from "axios"

export const getUser = (setUserDetail) => {
  const instance = axios.create({
    withCredentials: true,
  })

  instance
    .get("http://localhost:4000/api/v1/me")
    .then((res) => {
      setUserDetail(res.data.user)
    })
    .catch((e) => {
      console.log(e.message)
    })
}

export function calculatePrice(cart) {
  let price = 0
  for (let i = 0; i < cart.length; i++) {
    price += cart[i].price * cart[i].quantity
  }
  return price
}


export const shippingDetails = (
  cart,
  price,
  phoneNo,
  pinCode,
  address,
  city,
  state
) => {
  let taxPrice = (price * 0.18).toFixed(2)
  let totalPrice = parseInt(price)

  const orderItems = cart.map((item) => ({
    product: item.productId,
    name: item.name,
    price: item.price,
    image: item.url,
    quantity: item.quantity,
  }))

  const shippingDetail = {
    itemsPrice: price,
    taxPrice,
    shippingPrice: 100,
    totalPrice,
    orderItems,
    shippingInfo: {
      address,
      city,
      state,
      phoneNo,
      country: "India",
      pinCode,
    },
    paymentInfo: {
      id: "sample id",
      status: "succeeded",
    },
  }

  return shippingDetail
}
