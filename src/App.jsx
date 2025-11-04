import React from "react";
import { CssBaseline, Container } from "@mui/material";
import MessageForm from "./components/MessageForm";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <MessageForm />
      </Container>
    </>
  );
}
