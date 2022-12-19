import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import React, { useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import Drawer from "./MyDrawer";

import {Link as ReactLink} from 'react-router-dom'

function Header({ searchStr, setMyProductsState, name }) {
  const [isLargerThan690] = useMediaQuery("(min-width: 690px)");
  const [displaySearch, setDisplaySearch] = useState(false);
  return (
    <Flex h="90px" justifyContent="space-between" position="relative">
      { (displaySearch && !isLargerThan690) && (
        <InputGroup position="absolute" top="91px" w="90%" marginLeft="5%" >
          <Input
            placeholder="Search"
            borderEndRadius="50px"
            borderStartRadius="50px"
            value={searchStr}
            onChange= { (e) => {setMyProductsState({type : "SEARCH_STR" , payloaod : e.target.value})}}
            bg="logo"
            zIndex="20"
          />
          <InputRightElement children={<FaSearch color="white" />} />
        </InputGroup>
      )}
      <Flex w="90%" alignItems="center">
        <Drawer />
        <Box>
          <Image
            src="../src/assets/logo__final.png"
            h="120px"
            w="150px"
            objectFit="cover"
            ml={-6}
          />
        </Box>
        {isLargerThan690 && (
          <InputGroup flexBasis="368px" ml="8px" size="lg">
            <Input
              placeholder="Search"
              borderEndRadius="50px"
              borderStartRadius="50px"
              value={searchStr}
              onChange= { (e) => {   setMyProductsState({type : "SEARCH_STR" , payload : e.target.value})}}
            />
            <InputRightElement children={<FaSearch color="grey" />} />
          </InputGroup>
        )}
      </Flex>
      <Flex alignItems="center" mr="8px">
        {name && (
          <Text fontSize="xl" m={3}>
            {name.split(" ")[0]}
          </Text>
        )}
        {isLargerThan690 ? (
          <Link as={ReactLink} to="/login">
          <Button bg="logo" h="48px" borderRadius="45px" p={5} color="white">
            Sign in
          </Button>
          </Link>
        ) : (
          <Flex>
            <Button
              borderRadius={18}
              p={1}
              fontSize="30px"
              mr="8px"
              color="search.before"
              bg="none"

              onClick={ () => { displaySearch ? setDisplaySearch(false) : setDisplaySearch(true)}}
            >
              <FaSearch color="grey" />
            </Button>
            <Link as={ReactLink} to="/login" bg="logo" borderRadius={18} p={1} fontSize="30px" mr="8px" color="white">
              <AiOutlineUser />
            </Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}



export default Header;
