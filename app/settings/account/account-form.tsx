"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputOTPCom } from "../components/Input-otp";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AccountForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [showOtp, setShowOtp] = useState({
    email: false,
    password: false,
  });
  const [otp, setOtp] = useState("");
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Send email verification code
  const sendEmailVerificationCode = async () => {
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
        setShowOtp((prevShowOtp) => ({ ...prevShowOtp, email: true }));
      } else {
        toast.error(data.message || "Failed to send verification code.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  // Update email address
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
        setShowOtp((prevShowOtp) => ({ ...prevShowOtp, email: false }));
        setOtp("");
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  // Send change password verification code
  const sendChangePasswordVerificationCode = async () => {
    if (!user?.email) {
      toast.error("Please enter a new email address.");
      return;
    }
    try {
      const response = await fetch(
        "/api/v1/auth/send-change-password-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Verification code sent to " + user?.email);
        setShowOtp((prevShowOtp) => ({ ...prevShowOtp, password: true }));
      } else {
        toast.error(data.message || "Failed to send verification code.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  // Change password
  const changePassword = async () => {
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/v1/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          oldPassword: changePasswordData.oldPassword,
          newPassword: changePasswordData.newPassword,
          verificationCode: otp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password changed successfully!");
        setChangePasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowOtp((prevShowOtp) => ({ ...prevShowOtp, password: false }));
        setOtp("");
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  // forget password
  const handleForgetPassword = async () => {
    try {
      const response = await fetch(
        "/api/v1/auth/send-forget-password-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        router.push("/forget-password");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-lg font-medium py-2">Change Email</h1>
        {!showOtp.email ? (
          <>
            <Input
              placeholder="Enter your new email"
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
            />
            <p className="text-sm text-muted-foreground p-1">
              Please enter a valid email address to receive the verification
              code.
            </p>
            <Button
              className="mt-2"
              onClick={sendEmailVerificationCode}
              disabled={!newEmail}
            >
              Send Code
            </Button>
          </>
        ) : (
          <>
            <span className="py-2">
              <InputOTPCom otp={otp} setOtp={setOtp} />
              <p className="text-sm text-muted-foreground p-1">
                Enter verification code to update email address
              </p>
            </span>
            <Button onClick={updateEmail} disabled={!otp}>
              Change Email
            </Button>
          </>
        )}
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <h1 className="text-lg font-medium py-2">Change Password</h1>
          <Button
            variant="link"
            className="text-red-500"
            onClick={handleForgetPassword}
          >
            Forget Password
          </Button>
        </div>
        {!showOtp.password ? (
          <>
            {/* Old Password Input */}
            <div className="relative">
              <Input
                placeholder="Old password"
                type={showPassword.oldPassword ? "text" : "password"}
                value={changePasswordData.oldPassword}
                onChange={(e) =>
                  setChangePasswordData((prev) => ({
                    ...prev,
                    oldPassword: e.target.value,
                  }))
                }
                className="mt-2"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      oldPassword: !prev.oldPassword,
                    }))
                  }
                >
                  {showPassword.oldPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* New Password Input */}
            <div className="relative">
              <Input
                placeholder="New password"
                type={showPassword.newPassword ? "text" : "password"}
                value={changePasswordData.newPassword}
                onChange={(e) =>
                  setChangePasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="mt-2"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      newPassword: !prev.newPassword,
                    }))
                  }
                >
                  {showPassword.newPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <Input
                placeholder="Confirm password"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={changePasswordData.confirmPassword}
                onChange={(e) =>
                  setChangePasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="mt-2"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                >
                  {showPassword.confirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground p-1">
              Please enter your current password and a new password to update
              your password.
            </p>
            {/* Send Verification Code Button */}
            <Button
              className="mt-2"
              onClick={sendChangePasswordVerificationCode}
              disabled={
                !changePasswordData.oldPassword ||
                !changePasswordData.newPassword ||
                !changePasswordData.confirmPassword
              }
            >
              Send Code
            </Button>
          </>
        ) : (
          <>
            {/* OTP Input */}
            <span className="py-2">
              <InputOTPCom otp={otp} setOtp={setOtp} />
              <p className="text-sm text-muted-foreground p-1">
                Enter OTP to change password
              </p>
            </span>

            {/* Change Password Button */}
            <Button onClick={changePassword} disabled={!otp}>
              Change Password
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
