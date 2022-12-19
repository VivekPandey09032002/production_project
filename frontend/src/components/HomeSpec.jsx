import { Container, HStack, VStack, Flex, Text, Card, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { TbTruckDelivery, MdLocalShipping, GiReceiveMoney, SiFsecure } from "react-icons/all";

function HomeSpec() {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const textColor = useColorModeValue("gray.600", "whiteAlpha.600");
  return (
    <Container maxW="container.xl"  minH={400} alignSelf="center">
      <Flex direction={["column","column","row"]}  align="center" minH={400} gap={[5,5,10]} justifyContent={["stretch","center"]}>
        <Card bg={bgColor}>
          <VStack p={10}>
            <TbTruckDelivery fontSize={50} color={textColor} />
            <Text>Super Fast and Free Delivery</Text>
          </VStack>
        </Card>
        <VStack>
          <Card bg={bgColor}>
            <HStack p={10}>
              <MdLocalShipping fontSize={50} color={textColor} />
              <Text>Non-contact Shipping</Text>
            </HStack>
          </Card>
          <Card bg={bgColor}>
            <HStack p={10} >
              <GiReceiveMoney fontSize={50} color={textColor} />
              <Text>Money-back guarantee</Text>
            </HStack>
          </Card>
        </VStack>
        <Card bg={bgColor}>
          <VStack p={10}>
            <SiFsecure fontSize={50} color={textColor}/>
            <Text>Super Secure Payment System</Text>
          </VStack>
        </Card>
      </Flex>
    </Container>
  );
}

export default HomeSpec;
