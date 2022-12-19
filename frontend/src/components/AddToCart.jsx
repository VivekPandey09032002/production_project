import { Button, Divider, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { add, newItem } from "../store/cartSlice"

import {calculatePrice} from '../utils/UserLogic'

function AddToCart({currProduct,id}) {
  const dispatch =  useDispatch()
  const [quantity,setQuantity] = useState(1)
  return (
    <>
      <Stack spacing={1}>
        <Text>
          Available : {currProduct.stock > 0 ? "In Stock" : "Out Of Stock"}
        </Text>
        <Text>Current Stock : {currProduct.stock}</Text>
      </Stack>
      <Divider />
      <NumberInput
        size="lg"
        maxW={32}
        defaultValue={1}
        min={1}
        max={currProduct.stock}
        value={quantity}
        onChange={(value) => {
          setQuantity(+value)
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button
        variant="secondary"
        w="full"
        onClick={() => {
          let myCart = newItem(currProduct, quantity)
          if (localStorage.getItem("cart") == null  ) {
            const price = calculatePrice([myCart])
            dispatch(add({data : [myCart], price  }))
            localStorage.setItem("cart", JSON.stringify([myCart]))
          } else {
            let localCart = JSON.parse(localStorage.getItem("cart"))

            localCart = localCart.filter((item) => {
              return item.productId != id
            })
            localCart.push(myCart)
            const price = calculatePrice(localCart)
            dispatch(add({data : localCart, price}))
            localStorage.setItem("cart", JSON.stringify(localCart))
          }
        }}
      >
        Add to Cart
      </Button>
    </>
  )
}

export default AddToCart
