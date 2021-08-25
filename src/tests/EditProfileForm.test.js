import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditProfile from "../components/editProfile/EditProfile";

describe("When EditProfile Form is submitted,", () => {
  const submitProfile = jest.fn();
  let component;

  const user = {
    profilePicture: "person/2.jpeg",
    username: "Lazir Pascual",
    desc: "Hi Friends",
    city: "Kitchener",
    from: "Waterloo",
  };

  beforeEach(() => {
    component = render(<EditProfile user={user} setUser={submitProfile} />);

    // get reference to all inputs in ReviewForm
    const bioInput = component.container.querySelector("#bio");
    const cityInput = component.container.querySelector("#city");
    const hometownInput = component.container.querySelector("#hometown");
    const button = component.container.querySelector("submitButton");

    // change the inputs
    fireEvent.change(bioInput, {
      target: { value: "Test Bio" },
    });
    fireEvent.change(cityInput, {
      target: { value: "This is a test city" },
    });
    fireEvent.change(hometownInput, {
      target: { value: "This is a test hometown" },
    });
    fireEvent.click(button);
  });

  test("setUser() is called", () => {
    // check if submitting the form calls the createReview method
    expect(submitProfile.mock.calls).toHaveLength(1);
  });

  test("review contains correct content", () => {
    // check if the review contains correct content
    expect(submitProfile.mock.calls[0][0].desc).toBe("Test Bio");
    expect(submitProfile.mock.calls[0][0].city).toBe("This is a test city");
    expect(submitProfile.mock.calls[0][0].from).toBe("This is a test hometown");
  });
});
