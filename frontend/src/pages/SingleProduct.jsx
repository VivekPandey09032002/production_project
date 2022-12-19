import React, { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import ReactStars from "react-rating-stars-component"

import {
  FaMoneyCheckAlt,
  FaStarHalf,
  TbReplace,
  TbTruckDelivery,
} from "react-icons/all"
import Rating from "../components/Rating"
import DisplayReviews from "../components/DisplayReviews"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleProduct } from "../store/singleProductSlice"

import { STATUS } from "../utils/status"
import { fetchReview } from "../store/reviewSlice"
import AddToCart from "../components/AddToCart"

function SingleProduct() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data: currProduct, status } = useSelector(
    (state) => state.singleProduct
  )
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
    dispatch(fetchReview(id))
  }, [])
  if (currProduct.length == 0) return null
  if (status == STATUS.LOADING) return <Progress size="xs" isIndeterminate />
  if (status == STATUS.ERROR) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Something went Wrong 500:</AlertTitle>
        <AlertDescription>
          Try Refresh the page, Sorry for inconvience!!!
        </AlertDescription>
      </Alert>
    )
  }
  return (
    <Container maxW="container.xl" p={2}>
      <Breadcrumb m={5} fontSize={25}>
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to="/products">
            products
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack
        flexDirection={["column", "column", "row"]}
        gap={2}
        spacing={{ md: 10 }}
      >
        <Card minW={["90vw", "90vw", "480px"]} p={[1, 2]} bg="whiteAlpha.500">
          <CardBody
            p={0}
            borderRadius="12px"
            position="relative"
            overflow="hidden"
            m={0}
          >
            <Image
              src={currProduct.images[current].url}
              alt={currProduct.images[current].public_id}
              w="100%"
              h={{ base: "400px", md: "450px" }}
              transition="all 0.3s"
              draggable={false}
            />
            <AiOutlineArrowLeft
              className="left-arrow"
              onClick={(e) => {
                setCurrent(
                  current > 0 ? current - 1 : currProduct.images.length - 1
                )
              }}
            />
            <AiOutlineArrowRight
              className="right-arrow"
              onClick={(e) => {
                setCurrent((current + 1) % currProduct.images.length)
              }}
            />
          </CardBody>
        </Card>
        <VStack alignItems="flex-start" p={3}>
          <Heading>{currProduct.name}</Heading>
          <Flex alignItems="center" gap={2}>
            <ReactStars
              count={5}
              activeColor="#ffd700"
              size={30}
              halfIcon={<FaStarHalf />}
              value={currProduct.rating}
              isHalf={true}
              edit={false}
            />
          </Flex>
          <Text as="p" fontSize={20}>
            MRP : {currProduct.price}
          </Text>
          <Text>{currProduct.description}</Text>
          <HStack spacing={25}>
            <VStack>
              <Icon as={TbTruckDelivery} boxSize={10} mx={3}></Icon>
              <Text as="p" fontSize={12}>
                Free Delivery
              </Text>
            </VStack>
            <VStack>
              <Icon as={TbReplace} boxSize={10} mx={3}></Icon>
              <Text as="p" fontSize={12}>
                30 Days Replacement
              </Text>
            </VStack>
            <VStack>
              <Icon as={FaMoneyCheckAlt} boxSize={10} mx={3}></Icon>
              <Text as="p" fontSize={12}>
                Money back guarantee
              </Text>
            </VStack>
          </HStack>
          <Divider />
          <AddToCart currProduct={currProduct} id={id} />
        </VStack>
      </HStack>
      <Rating id={id} />

      <DisplayReviews />
      {/* <PostCard/> */}
    </Container>
  )
}

export default SingleProduct
