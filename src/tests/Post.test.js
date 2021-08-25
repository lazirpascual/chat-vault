import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Post from "../components/post/Post";
import { BrowserRouter as Router } from "react-router-dom";

// this is testing if the following post is being generated properly
test("Post Component renders the correct content", () => {
  const post = {
    comments: [
      {
        desc: "That's dope",
        name: "Mark Mathews",
        picture: "person/2.jpeg",
        id: "2443e810-0070-11ec-8a86-4bdd5f8bf1ab",
      },
      {
        desc: "Weird flex but ok?",
        name: "Dora Hawks",
        picture: "person/4.jpeg",
        id: "39c260e0-0070-11ec-8a86-4bdd5f8bf1ab",
      },
    ],
    userId: "610c8b587db84236e99bd788",
    desc: "This is a test post",
    img: "post/1.jpeg",
    createdAt: "2021-08-06T01:48:44.154Z",
    updatedAt: "2021-08-18T22:04:16.803Z",
  };

  const component = render(
    <Router>
      <Post post={post} />
    </Router>
  );

  const button = component.container.querySelector("#comments");
  fireEvent.click(button);

  // check if the rendered post contains the correct content
  expect(component.container).toHaveTextContent("This is a test post");
  expect(component.container).toHaveTextContent("0 People liked this post");
  expect(component.container).toHaveTextContent("That's dope");
  expect(component.container).toHaveTextContent("Weird flex but ok?");
});
