import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Message from "../components/message/Message";

// this is testing if the list of products in the cart is being generated properly
test("Message Component renders the correct content", () => {
  const message = {
    profilePicture: "person/2.jpeg",
    text: "This is a test message",
    createdAt: "2021-08-06T01:48:44.154Z",
  };

  const component = render(<Message message={message} />);

  // check if the rendered Post contains the correct content
  expect(component.container).toHaveTextContent("This is a test message");
});
