"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirect
import { useAuth } from "@/contexts/AuthProvider"; // Use the AuthContext
import { toast } from "sonner"; // Import toast from Sonner

export default function LoginCardCom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const { login } = useAuth(); // Access the login function from AuthContext
  const router = useRouter(); // Get the router for redirecting

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      // Make POST request to the login API
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Check if login is successful
      if (response.ok) {
        const user = await response.json();
        // Call the login function from AuthContext and save user data
        login(user);

        // Redirect to /task page
        router.push("/tasks");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-2xl">Log in to your account</CardTitle>
          <CardDescription>
            Enter required information to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"} // Toggle between text and password type
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-[70%] right-3 transform -translate-y-1/2"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
            >
              {passwordVisible ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Log In
          </Button>
        </CardFooter>
        <div className="text-center text-sm text-muted-foreground pb-4">
          <span>Don&apos;t have an account?</span>
          <span
            className="text-blue-500 px-1 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Create Account
          </span>
        </div>
      </Card>
    </>
  );
}
