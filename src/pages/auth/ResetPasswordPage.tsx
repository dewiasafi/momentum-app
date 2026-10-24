import AuthHeader from "@/features/auth/components/AuthHeader";
import ResetPasswordForm from "@/features/auth/components/ResetForm";

const ResetPasswordPage = () => {
  return (
    <div>
      <AuthHeader
        title="Buat Password Baru"
        subTitle="Buat password baru untuk mengamankan akun Momentum Anda."
      />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;