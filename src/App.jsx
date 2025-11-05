import React from "react";
import { Container, Stack } from "@mui/material";
import ConnectionManager from "./components/ConnectionManager";
import MessageForm from "./components/MessageForm";

function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={4}>
        <ConnectionManager />
        <MessageForm />
      </Stack>
    </Container>
  );
}

export default App;
