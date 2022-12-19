import { Button, DrawerBody, DrawerHeader, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

function CustomDrawer() {
  const [isLogin, setLogin] = useState(false);
  const [isRegister, setRegister] = useState(true);
  return (
    <>
      <DrawerHeader>
        <HStack>
          <Button
            variant="secondary"
            w={20}
            onClick={() => {
              setLogin(false);
              setRegister(true);
            }}
          >
            Register
          </Button>
          <Button
            w={20}
            variant="purple"
            onClick={() => {
              setRegister(false);
              setLogin(true);
            }}
          >
            Login
          </Button>
        </HStack>
      </DrawerHeader>

      <DrawerBody>
        {isLogin && <Login />}
        {isRegister && <Register />}
      </DrawerBody>
    </>
  );
}

export default CustomDrawer;
