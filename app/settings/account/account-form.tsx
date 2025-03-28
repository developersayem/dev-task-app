"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTPCom } from "../components/Input-otp";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "sonner";

export function AccountForm() {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Send OTP to new email
  const sendCode = async () => {
    if (!newEmail || newEmail === user?.email) {
      toast.error("Please enter a new email address.");
      return;
    }
    try {
      const response = await fetch("/api/v1/auth/send-email-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, newEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Verification code sent to " + newEmail);
        setShowOtp(true);
      } else {
        toast.error(data.message || "Failed to send verification code.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  // Verify OTP and update email
  const updateEmail = async () => {
    if (!otp) {
      toast.error("Please enter the verification code.");
      return;
    }
    try {
      const response = await fetch("/api/v1/auth/verify-email-and-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          newEmail,
          verificationCode: otp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Email updated successfully!");
        const updatedUser = { ...user, email: newEmail };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowOtp(false);
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    console.log("Password changed successfully", newPassword);
  };

  return (
    <div>
      {/* Email change form */}
      <div>
        <h1 className="text-lg font-medium py-2">Change Email</h1>
        {!showOtp ? (
          <div>
            <Input
              placeholder="Enter your new email"
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
            />
            <Button className="mt-2" onClick={sendCode}>
              Send Code
            </Button>
          </div>
        ) : (
          <div className="py-4 flex justify-start items-center gap-5">
            <InputOTPCom otp={otp} setOtp={setOtp} />
            <Button onClick={updateEmail}>Update</Button>
          </div>
        )}
      </div>

      {/* Password change form */}
      <div className="mt-5">
        <h1 className="text-lg font-medium py-2">Change Password</h1>
        <Input
          placeholder="Old password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          className="mt-2"
          placeholder="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          className="mt-2"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button className="mt-2" onClick={changePassword}>
          Change Password
        </Button>
      </div>
    </div>
  );
}
