import React from "react";
import LoginForm from "../../auth/LoginForm";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("renders correctly", () => {
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(getByText("Login")).toBeInTheDocument();
  expect(getByText("Log in to your account")).toBeInTheDocument();
  expect(getByPlaceholderText("Username")).toBeInTheDocument();
  expect(getByPlaceholderText("Password")).toBeInTheDocument();
});

it("logs in user", async () => {
  const mockFn = jest.fn().mockResolvedValue({ success: true });
  const { getByPlaceholderText, getByText } = render(
    <MemoryRouter>
      <LoginForm login={mockFn} />
    </MemoryRouter>
  );

  fireEvent.change(getByPlaceholderText("Username"), {
    target: { value: "testuser" },
  });
  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "password" },
  });

  const button = getByText("Login");
  fireEvent.click(button);
  await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1)); // mockFn is called onceexpect(mockFn).toHaveBeenCalledTimes(1); // mockFn is called once
  await waitFor(() =>
    expect(mockFn).toHaveBeenCalledWith({
      username: "testuser",
      password: "password",
    })
  );
  expect(mockFn).toHaveBeenCalledWith({
    username: "testuser",
    password: "password",
  });
});

it("logs in user with error", async () => {
  const mockFn = jest.fn().mockResolvedValue({ success: false });
  const { getByPlaceholderText, getByText, findByText } = render(
    <MemoryRouter>
      <LoginForm login={mockFn} />
    </MemoryRouter>
  );

  // Simulate input for bad username and password
  fireEvent.change(getByPlaceholderText("Username"), {
    target: { value: "baduser" },
  });
  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "badpassword" },
  });

  const button = getByText("Login");
  fireEvent.click(button);

  // Check that the mock function was called once with bad credentials
  await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(mockFn).toHaveBeenCalledWith({
      username: "baduser",
      password: "badpassword",
    })
  );

  // Check if the error message is displayed
  const errorMessage = await findByText("Invalid username/password");

  expect(errorMessage).toBeInTheDocument();
});
