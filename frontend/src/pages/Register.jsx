import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  VStack,
  StackDivider,
  HStack,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { uploadImage } from "../utils/apiCalls";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState({});
  const [isUploadLoading, setIsUploadLoading] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:4000/api/v1/register", {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      })
      .then((res) => {
        setLoading(false);
        toast({
          title: "Register Successfully",
          description: "Login in to your account first",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
        toast({
          title: "Registration Failed",
          description: `${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
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

        <Stack direction={["column", "row"]} className="upload-btn">
          <FormControl isRequired>
            <VStack align="flex-start" spacing={0}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter Your Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </VStack>
          </FormControl>
          <FormControl isRequired>
            <VStack align="flex-start" spacing={0}>
              <FormLabel>upload</FormLabel>

              <Input
                type="file"
                id="file"
                accept="image/*"
                onChange={async (e) => {
                  const avatar = await uploadImage(
                    e.target.files[0],
                    setIsUploadLoading
                  );
                  setAvatar(avatar);
                  setIsUploadLoading(false);
                }}
              />
              {isUploadLoading && (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              )}
            </VStack>
          </FormControl>
        </Stack>
        <Button  variant="primary" type="submit" width="full">
          {isLoading ? (
            <CircularProgress isIndeterminate size="24px" color="teal" />
          ) : (
            "Sign In"
          )}
        </Button>
      </VStack>
    </form>
  );
}

export default Register;
