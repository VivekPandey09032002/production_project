import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../store/userSlice";
import CustomDrawer from "./CustomDrawer";

const NavBar = () => {
  const  navigate = useNavigate()
  const dispatch = useDispatch()
  const {data : cart} = useSelector(state => state.cart)
  const {data : user} = useSelector(state => state.user)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Container maxW="container.xl">
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <CustomDrawer  />
          </DrawerContent>
        </Drawer>
      </Container>
      <Flex
        h="75px"
        bg="brand.800"
        justify="space-between"
        align="center"
        px={4}
      >
        <IconButton
          onClick={onOpen}
          ref={btnRef}
          variant="ghost"
          color="white"
          _hover={{ bg: "main.400" }}
          fontSize="3xl"
        >
          <FaBars />
        </IconButton>

        <Flex align="center" position="relative">
          <Menu>
            <MenuButton>
              <Avatar name={user && user.name} />
            </MenuButton>
            <MenuList >
              <MenuItem onClick={(e) => navigate('/user')}>Profile</MenuItem>
              <MenuItem onClick={(e) => dispatch(logOutUser())}>Log Out</MenuItem>
            </MenuList>
          </Menu>
          <IconButton onClick={toggleColorMode} fontSize={30} m={3}>
            {colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </IconButton>
          <IconButton fontSize={30} m={3} onClick={() => {navigate("/cart")}}>
            <FaCartPlus />
          </IconButton>
          <Box
            position="absolute"
            right={3}
            top={-1}
            fontSize={20}
            fontWeight="bold"
            color="red.500"
          >
            {cart.length}
          </Box>
        </Flex>

      </Flex>
    </>
  );
};

export default NavBar;
