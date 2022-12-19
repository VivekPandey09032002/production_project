import React, { useState } from "react"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  VStack,
  StackDivider,
  useToast,
  Stack,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { updateUser } from "../store/userSlice"

function Login() {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setLoading] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(
        "http://localhost:4000/api/v1/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        // use if cookie is not working
        // Cookies.set("access_token", res.data.token);
        setLoading(false)
        dispatch(updateUser(res.data.user))
        toast({
          title: "Login Success",
          description: "Successfully logged in to account",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        })
        navigate("/products")
      })
      .catch((err) => {
        setError(err.response.data.message)
        setLoading(false)
        toast({
          title: "Login Failed",
          description: `${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        })
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={3}>
          <Stack direction={["column", "row"]}>
            <FormControl isRequired>
              <VStack align="flex-start" spacing={0}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </VStack>
            </FormControl>
            <FormControl isRequired>
              <VStack align="flex-start" spacing={0}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </VStack>
            </FormControl>
          </Stack>

          <Button variant="primary" type="submit" w="full">
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              "Sign In"
            )}
          </Button>
        </VStack>
      </form>
    </>
  )
}

export default Login
