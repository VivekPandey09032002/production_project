import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import Cart from "../components/Cart";
import YourDetails from "../components/YourDetails";

const CartPage = ({ cart, setCart }) => {
  return (
    <div>
      <Container maxW="container.xl" p="4px">
        <Breadcrumb mt={[1, 1, 3]} fontSize={25}>
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={NavLink} to="/cart">
              Cart
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex
          h={{ base: "auto", md: "100vh" }}
          py={[2, 10, 20]}
          direction={{
            base: "column-reverse",
            md: "row",
          }}
        >
          <YourDetails />
          <Cart cart={cart} setCart={setCart} />
        </Flex>
      </Container>
    </div>
  );
};

export default CartPage;
