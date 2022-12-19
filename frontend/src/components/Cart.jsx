import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBin3Fill } from "react-icons/all"
import { remove } from "../store/cartSlice"

import { calculatePrice } from "../utils/UserLogic"

const Cart = () => {
  const { data: cart, price : cartPrice  } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const { toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50")
  const textColor = useColorModeValue("gray.600", "whiteAlpha.600")


  if(cart == null)  return null
  return (
    <VStack w="full" h="full" p={3} spacing={6} align="flex-start" bg={bgColor}>
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Your cart</Heading>
        <Text>
          If the price is too hard on your eyes,{" "}
          <Button
            onClick={toggleColorMode}
            variant="outline"
            colorScheme="black"
          >
            try changing the theme.
          </Button>
        </Text>
      </VStack>
      <VStack
        spacing={4}
        alignItems="stretch"
        w="full"
        overflowY="auto"
      >
        {cart.map((item) => (
          <HStack key={item.productId} spacing={6} alignItems="center" w="full">
            <AspectRatio ratio={1} w={24}>
              <Image src={item.url} alt="Skateboard" />
            </AspectRatio>
            <Stack
              spacing={0}
              w="full"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              p={2}
            >
              <VStack w="full" spacing={0} alignItems="flex-start">
                <Heading size="md">{item.name.substring(0, 12)}</Heading>
                <Text color={textColor}>{item.productId}</Text>
              </VStack>
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                {item.quantity}
              </Badge>
              <Heading size="sm" textAlign="end" p={2}>
                ${item.price}
              </Heading>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="remove from cart"
                fontSize={30}
                icon={<RiDeleteBin3Fill />}
                onClick={() => {
                  let productId = item.productId
                  let newCart = cart.filter(
                    (item) => item.productId != productId
                  )
                  let price = calculatePrice(newCart)
                  localStorage.setItem("cart", JSON.stringify(newCart))
                  dispatch(remove({data : newCart, price : price}))
                }}
              ></IconButton>
            </Stack>
          </HStack>
        ))}
      </VStack>

      <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
          <Text color={textColor}>Total Price</Text>
          <Heading size="sm">${cartPrice}</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={textColor}>Shipping</Text>
          <Heading size="sm">$100.00</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={textColor}>Taxes (estimated)</Text>
          <Heading size="sm">${(cartPrice*0.18).toFixed(2)}</Heading>
        </HStack>
      </VStack>
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color={textColor}>Total</Text>
        <Heading size="lg">
          ${   
            
              parseFloat((cartPrice+ (cartPrice*0.18) + 100 )).toFixed(2) 
            
          }
        </Heading>
      </HStack>
    </VStack>
  )
}

export default Cart
