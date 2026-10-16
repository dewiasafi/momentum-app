export interface AuthHeaderProps {
     title: string
     subTitle: string
}

const AuthHeader = ({title, subTitle}: AuthHeaderProps) => {
     return (
          <div className="mb-7">
               <h1 className="">{title}</h1>
               <p className="">{subTitle}</p>
          </div>
     )
}

export default AuthHeader