import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
  passwordVisible: boolean;
  setPasswordVisible: (passwordVisible: boolean) => void;
};

const PasswordInput = ({
  value,
  onChange,
  className,
  placeholder,
  passwordVisible,
  setPasswordVisible,
}: PasswordInputProps) => {
  return (
    <div className="relative">
      <Input
        type={passwordVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        onClick={() => setPasswordVisible(!passwordVisible)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {passwordVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};

export default PasswordInput;
