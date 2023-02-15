import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterPage from "./RegisterPage";

test("renders learn react link", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
