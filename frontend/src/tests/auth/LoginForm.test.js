import React from "react";
import LoginForm from "../../auth/LoginForm";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


it("renders without crashing", () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);
})

it("matches snapshot", () => {
    const { asFragment } = render(<MemoryRouter><LoginForm /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
})

it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<MemoryRouter><LoginForm /></MemoryRouter>);
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Log in to your account")).toBeInTheDocument();
    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
})