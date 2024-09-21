import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  render(<MemoryRouter><App /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})

describe("Route to Login", () => {
  it("renders without crashing", () => {
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
  })

//   it("matches snapshot", () => {
//     const { asFragment } = render(<MemoryRouter initialEntries={["/login"]}><App /></MemoryRouter>);
//     expect(asFragment()).toMatchSnapshot();
//   })
})