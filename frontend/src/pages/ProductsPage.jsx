import React, { Suspense } from "react"
import { Container, Flex, HStack } from "@chakra-ui/react"
import Loading from "../components/Loading"
const Filter = React.lazy(() => import("../components/Filter"))
const ProductsList = React.lazy(() => import("../components/ProductsList"))
// import Filter from "../components/Filter"
// import ProductsList from "../components/ProductsList"

function ProductsPage() {

  return (
    <>
    <Suspense fallback={<Loading/>}>
      <Container className="products" maxW="container.xl" my={5}>
        <Flex minH="70vh" flexDirection={["column-reverse","column-reverse","row"]}>
          <Filter />
          <ProductsList />
        </Flex>
      </Container>
    </Suspense>
    </>
  )
}

export default ProductsPage
