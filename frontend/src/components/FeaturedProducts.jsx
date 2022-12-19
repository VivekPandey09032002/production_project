import { Box, Container, Heading, HStack, Text, Grid } from "@chakra-ui/react"
import React from "react"
import { useSelector } from "react-redux"
import ProductViewer from "./ProductViewer"

function FeaturedProducts() {
  const { data: products } = useSelector((state) => state.featuredProduct)
  return (
    <>
      <Box bg="gray.200">
        <Container maxW="container.xl" alignSelf="center" p={12} minH={400}>
          <Text as="p" color="gray.500">
            CHECK NOW!
          </Text>
          <Heading fontSize={35} color="gray.900">
            Our Feature Services
          </Heading>
          <Grid
            templateColumns={[
              "1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
            ]}
            templateRows={["230px"]}
            style={{ gridAutoRows: "250px" }}
            gap="20px"
            p={4}
          >
            {products.map((product) => (
              <ProductViewer
                key={product.id}
                url={product.images[0].url}
                rating={product.rating}
                category={product.category}
                price={product.price}
                name={product.name}
                id={product.productId}
                p={2}
              />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default FeaturedProducts
