import LoginCardCom from "../AuthComponents/LoginCardCom";

const LoginPage: React.FC = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <div className="bg-black w-full flex justify-center items-center "></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 flex flex-col justify-center items-center">
        <LoginCardCom />
      </div>
      <div className="bg-white text-black w-full flex justify-center items-center"></div>
    </div>
  );
};

export default LoginPage;
