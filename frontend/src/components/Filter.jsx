import {
  Heading,
  Input,
  VStack,
  Button,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductCategories } from "../store/productCategorySlice"
import { fetchProductsWithFilters } from "../store/productSlice"
import { STATUS } from "../utils/status"
import Loading from "./Loading"

function Filter() {
  const dispatch = useDispatch()
  const { data: categories } = useSelector((state) => state.productCategories)
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50")
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.700")

  const [category, setCategory] = useState("")
  const [prices, setPrices] = useState([NaN, NaN])
  const [input, setInput] = useState("")
  const [page, setPage] = useState(NaN)

  useEffect(() => {
    dispatch(fetchProductCategories())
  }, [])

  if (categories.status === STATUS.LOADING) return <Loading />

  if (categories.status === STATUS.ERROR) return <h1>Error</h1>

  return (
    <VStack
      align={["stretch", "stretch", "flex-start"]}
      justify="stretch"
      spacing={8}
      bg={bgColor}
      color={textColor}
      p={2}
      boxShadow="lg"
      overflow="hidden"
    >
      <Input
        w="full"
        size="sm"
        variant="outline"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            dispatch(
              fetchProductsWithFilters({
                searchStr: input,
                category: "",
                page: NaN,
                price_lte: NaN,
                price_gte: NaN,
              })
            )
          }
        }}
        color={textColor}
      ></Input>
      <VStack align="stretch" w="full">
        <Heading fontSize={26}>Category</Heading>
        {categories.map((category) => (
          <Text key={category.label} px={2}>
            {category.value}
          </Text>
        ))}
        <Menu w="full">
          <MenuButton as={Button} variant="outline">
            {category.length > 0 ? category : "Select Category"}
          </MenuButton>
          <MenuList>
            {categories.map((category) => (
              <MenuItem
                onClick={(e) => setCategory(e.target.value)}
                value={category.value}
                key={category.value}
              >
                {category.value}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </VStack>
      <VStack align="flex-start" w="full">
        <Heading fontSize={26}>Price Range</Heading>
        <Button color={textColor} variant="outline" disabled={true} w="full">
          ${prices[0] ? prices[0] : 0} {"<="}-{prices[1] ? prices[1] : 0}
        </Button>
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[10000, 50000]}
          max={100000}
          onChange={(val) => setPrices(val)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </VStack>
      <VStack w="full">
        <Button
          variant="purple"
          w="full"
          onClick={() => {
            dispatch(
              fetchProductsWithFilters({
                searchStr: input,
                category: category,
                page: page,
                price_lte: prices[1],
                price_gte: prices[0],
              })
            )
          }}
        >
          Apply Filters
        </Button>
        <Button
          variant="secondary"
          w="full"
          onClick={() => {
            setCategory("")
            setInput("")
            setPrices([NaN, NaN])
            setPage(NaN)
            dispatch(
              fetchProductsWithFilters({
                searchStr: "",
                category: "",
                page: NaN,
                price_lte: NaN,
                price_gte: NaN,
              })
            )
          }}
        >
          Clear Filters
        </Button>
      </VStack>
    </VStack>
  )
}

export default Filter
