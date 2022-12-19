import {
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  LinkBox,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

function Products({ products }) {
  return (
    <>
      <Grid
        templateColumns={{ md: "repeat(3,1fr)", lg: "repeat(4,1fr)" }}
        placeItems="center"
        gap={6}
      >
        {products.map((prod, ind) => (
          <GridItem key={ind} w="full">
            <Card w="full" border="1px solid">
              <CardBody>
                <Image
                  src={prod.images[0]?.url}
                  w="full"
                  h={300}
                  rounded="lg"
                  p={2}
                />

                <Divider my={1} />
                <Heading fontSize={18}>
                  {prod.name.slice(0, 20) +
                    (prod.name.length > 30 ? "..." : "")}
                </Heading>
                <Divider my={1} />
                <Text fontSize={14}>
                  {prod.description.slice(0, 100) +
                    (prod.description.length > 49 ? "..." : "")}
                </Text>
                <LinkBox as={Link} to={`/product/${prod._id}`}>
                  <Button mt={2} variant="outline" colorScheme="green" w="full">
                    Buy Now
                  </Button>
                </LinkBox>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </>
  )
}

export default Products
