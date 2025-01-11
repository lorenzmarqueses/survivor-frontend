import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../app/(unauthenticated)/login/page";
import { useForm } from "react-hook-form";
import useLoginMutation from "@/hooks/useLoginMutation";

// Mock the hook and other components to avoid side effects during testing
jest.mock("@/hooks/useLoginMutation");

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <div>{children}</div>,
  CardDescription: ({ children }: any) => <div>{children}</div>,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: "idle",
      isError: false,
      error: null,
    });
  });

  it("renders the login form", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits the form with valid input", async () => {
    const mockMutate = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });

    render(<LoginPage />);

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /login/i }) as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(useLoginMutation().mutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows validation errors when inputs are empty", async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: /login/i }) as HTMLButtonElement;

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("disables the submit button when login is in progress", () => {
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: "pending",
      isError: false,
      error: null,
    });

    render(<LoginPage />);

    const submitButton = screen.getByText("Logging in...") as HTMLButtonElement;

    expect(submitButton).toBeDisabled();
  });

  it("shows an error message if the login mutation fails", async () => {
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: "idle",
      isError: true,
      error: new Error("Invalid credentials"),
    });

    render(<LoginPage />);

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /login/i }) as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
