import { Box, Image, Link, Text } from "@chakra-ui/react"
import React from "react"
import ReactStars from "react-rating-stars-component"
import { NavLink } from "react-router-dom"
import {FaStarHalf} from 'react-icons/fa'

function ProductViewer({ category, url, rating, price, name, id }) {
  return (
    <Box position="relative" overflow="hidden" className="box" shadow="lg">
      <Link as={NavLink} to={`/product/${id}`}>
        <Box
          position="absolute"
          h="100%"
          w="100%"
          bg="black"
          opacity="0.75"
          left="-100%"
          className="content"
          transition="all 0.73s"
          color="white"
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Text>{name}</Text>
          <ReactStars
            count={5}
            activeColor="#ffd700"
            size={20}
            value={rating}
            halfIcon={<FaStarHalf />}
            isHalf={true}
            edit={false}
          />
          <Text>category: {category}</Text>
          <Text>Price: {price}</Text>
        </Box>
        <Image src={url} h="100%" w="100%" draggable="false"></Image>
      </Link>
    </Box>
  )
}

export default ProductViewer
