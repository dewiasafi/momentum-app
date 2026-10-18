export interface AuthHeaderProps {
  title: string;
  subTitle: string;
}

const AuthHeader = ({ title, subTitle }: AuthHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-app-title mb-1">{title}</h1>
      <p className="text-sm text-app-subtext">{subTitle}</p>
    </div>
  );
};

export default AuthHeader;