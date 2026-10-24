import AuthHeader from "@/features/auth/components/AuthHeader";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      Í<AuthHeader
        title="Buat Akun Momentum"
        subTitle="Daftar untuk mulai mencatat perjalanan dan perkembangan Anda"
      />
      <RegisterForm />
    </div>

  );
};

export default RegisterPage;

