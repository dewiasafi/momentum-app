import AuthHeader from "@/features/auth/components/AuthHeader";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <AuthHeader title='Create New Account' subTitle='Join momentum and catch your moment' />
      <RegisterForm />
    </div>

  );
};

export default RegisterPage;

