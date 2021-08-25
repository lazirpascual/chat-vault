import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Friends from "../components/friends/Friends";

// this is testing if the list of products in the cart is being generated properly
test("Friends Component renders the correct content", () => {
  const user = {
    profilePicture: "person/2.jpeg",
    username: "Lazir Pascual",
  };

  const component = render(<Friends user={user} />);

  // check if the rendered Post contains the correct content
  expect(component.container).toHaveTextContent("Lazir Pascual");
});
