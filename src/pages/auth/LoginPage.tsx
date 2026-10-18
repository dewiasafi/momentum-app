import AuthHeader from "@/features/auth/components/AuthHeader";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <AuthHeader
        title="Selamat Datang Kembali"
        subTitle="Masuk ke akun Momentum Anda untuk melanjutkan aktivitas"
      />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
