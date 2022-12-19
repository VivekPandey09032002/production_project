import {
  AspectRatio,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import HomeSpec from "../components/HomeSpec";


function Home() {
  return (
    <>
      <Stack spacing={10}>
        {/* Home - Page */}
        <Container
          maxW="container.xl"
          alignSelf="center"
          p={12}
          minH={400}
          mt={10}
        >
          <Stack direction={["column", "column", "row"]} spacing={4}>
            <VStack align="flex-start" spacing={3}>
              <Text as="p" color="gray.500">
                Welcome To
              </Text>
              <Heading fontSize={45}>E-Mart</Heading>
              <Text as="p" color="gray.500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                ex ratione hic, id doloribus eaque voluptate libero veritatis
                explicabo iusto accusantium vitae ullam! Cum, perspiciatis
                pariatur fugiat quae et velit!
              </Text>
              <Button
                as={NavLink}
                alignSelf={["center", "center", "flex-start"]}
                colorScheme="blue"
                p={4}
                to="/products"
              >
                Shop Now
              </Button>
            </VStack>

            <AspectRatio
              ratio={16 / 9}
              display={{ base: "none", md: "block" }}
              w="1200px"
            >
              <Image
                src="./src/assets/panda.jpg"
                draggable="false"
                boxShadow="35px -30px 0px 0px #A670FF"
              ></Image>
            </AspectRatio>
          </Stack>
        </Container>
        {/* featuredProducts */}
        <FeaturedProducts />
        {/* home stack */}
        <HomeSpec />

      </Stack>
    </>
  );
}

export default Home;
