import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
// eslint-disable-next-line react/prop-types
function ChangeForm({isLoginClicked}){
  return (
        <div>
        
          {!isLoginClicked ? 
            (
              <RegisterForm />
            ) : 
            (
              <LoginForm />
            )
          }
        </div>
      );
  }
export default ChangeForm;