import React from "react";
import LoginForm from "../../auth/LoginForm";
import { render, fireEvent } from "@testing-library/react";
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

it("logs in user", () => {
    const mockFn = jest.fn().mockResolvedValue({ success: true });
    const { getByPlaceholderText, getByText } = render(<MemoryRouter><LoginForm login={mockFn}/></MemoryRouter>);
    
    fireEvent.change(getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(getByPlaceholderText("Password"), { target: { value: "password" } });
    
    const button = getByText("Login");
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1); // mockFn is called once
    expect(mockFn).toHaveBeenCalledWith({ username: "testuser", password: "password" });
    
})


it("logs in user with error", () => {
    const mockFn = jest.fn().mockResolvedValue({ success: false });
    const { getByPlaceholderText, getByText } = render(<MemoryRouter><LoginForm login={mockFn}/></MemoryRouter>);
    
    fireEvent.change(getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(getByPlaceholderText("Password"), { target: { value: "password" } });
    
    const button = getByText("Login");
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1); // mockFn is called once
    expect(mockFn).toHaveBeenCalledWith({ username: "testuser", password: "password" });

    expect(getByText("Request failed with status code 401")).toBeInTheDocument();
})