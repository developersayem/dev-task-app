"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PasswordInput from "../AuthComponents/PasswordInput";
import { useAuth } from "@/contexts/AuthProvider";
import { InputOTPCom } from "@/app/settings/components/Input-otp";
import { Button } from "@/components/ui/button";

export default function ForgetPasswordPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const verifyOtp = async () => {
    try {
      const response = await fetch("/api/v1/auth/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.success) {
          setShowOtp(true);
          toast.success(data.message);
        }
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleForgetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/v1/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          verificationCode: otp,
          newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        logout();
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {showOtp ? (
        <div className="w-full max-w-sm space-y-2">
          <h1 className="text-2xl text-center font-bold">Forget Password!</h1>
          <h3 className="text-sm text-center text-muted-foreground">
            Enter your new password and confirm it.
          </h3>
          <div className="mt-5 space-y-4">
            <PasswordInput
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              className="w-full"
              placeholder="Enter new password"
              passwordVisible={newPasswordVisible}
              setPasswordVisible={setNewPasswordVisible}
            />
            <PasswordInput
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full"
              placeholder="Enter confirm password"
              passwordVisible={confirmPasswordVisible}
              setPasswordVisible={setConfirmPasswordVisible}
            />
          </div>
          <div className="mt-5">
            <button
              onClick={handleForgetPassword}
              className="w-full cursor-pointer bg-black text-white py-2 rounded-md"
              disabled={!newPassword || !confirmPassword}
            >
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="py-5 space-y-2">
            <h1 className="text-2xl text-center font-bold">Forget Password!</h1>
            <h3 className="text-sm text-center text-muted-foreground">
              Enter your new password and confirm it.
            </h3>
          </div>
          <span className="py-2">
            <InputOTPCom otp={otp} setOtp={setOtp} />
            <p className="text-sm text-muted-foreground p-1 text-center">
              Enter verification code to change password
            </p>
          </span>
          <Button
            onClick={verifyOtp}
            disabled={!otp}
            className="w-full mx-auto"
          >
            Verify
          </Button>
        </div>
      )}
    </div>
  );
}
