import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchNewDetail } from "../store/userSlice"
const PostCard = () => {
  const { data: user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchNewDetail({ email  : user.email, name }))
  }
  return (
    <Flex justify="center" align="center" flexBasis="40%" >
      <Stack  boxShadow="md" borderRadius="xl" >
        <Image src="/post.png" alt="image" />
        <Stack p="2">
          <HStack>
            <Avatar size="sm" src={user.avatar.url} />
            <Text fontWeight="600">{user.name}</Text>
            <Text fontSize="sm">Role: {user.role}</Text>
          </HStack>
          <VStack align="flex-start">
            <Heading fontSize="lg">Email : {user.email}</Heading>
            <Accordion allowToggle m={2}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {user.name} update name here!!!
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <form
                      onSubmit={(e) => {
                        handleSubmit(e)
                      }}
                    >
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl  textAlign="center" p={2}>
                        <Button type="submit" variant="purple">Update Name</Button>
                      </FormControl>
                    </form>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default PostCard
