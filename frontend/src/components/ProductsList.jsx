import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Flex, Grid, HStack, Select, Text, VStack } from "@chakra-ui/react"
import { BsFillGridFill } from "react-icons/bs"
import { CgDisplayFlex } from "react-icons/cg"
import { fetchProducts } from "../store/productSlice"
import Loading from "./Loading"
import { STATUS } from "../utils/status"
import ProductViewer from "./ProductViewer"

function ProductsList() {
  const dispatch = useDispatch()
  const { data: products } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (products.status === STATUS.LOADING) return <Loading />

  if (products.status === STATUS.ERROR) return <h1>Error</h1>

  return (
    <VStack w="100%" overflowY="auto">
      <Flex w="100%" justify="space-between" p={2}>
        <HStack>
          <BsFillGridFill />
          <CgDisplayFlex />
        </HStack>
        <Text>total product count</Text>
        <Select placeholder="Select option" w="100px">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Grid
        templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
        templateRows={["230px"]}
        style={{ gridAutoRows: "250px" }}
        gap="20px"
        p={4}
      >
        {products.map((product) => (
          <ProductViewer
            category={product.category}
            url={product.images[0].url}
            rating={product.rating}
            price={product.price}
            name={product.name}
            id={product.productId}
            key={product.id}
          />
        ))}
      </Grid>
    </VStack>
  )
}

export default ProductsList
