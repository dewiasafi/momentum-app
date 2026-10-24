import AuthHeader from "@/features/auth/components/AuthHeader";
import ForgotPasswordForm from "@/features/auth/components/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div>
      <AuthHeader
        title="Lupa Password?"
        subTitle="Masukkan email akunmu untuk menerima instruksi reset password."
      />
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;