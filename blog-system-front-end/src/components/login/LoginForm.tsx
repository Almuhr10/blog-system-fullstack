import { VStack, Input, Button, Text, Box } from '@chakra-ui/react';

import React from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

interface ILoginForm {
  username: string;
  password: string;
  submitLogin: () => Promise<void>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}
const submitHandler = (e: any) => {
  e.preventDefault();
};

const pass_field: any = document.querySelector('.pass-key');
const showBtn: any = document.querySelector('.show');
const showPass = () => {
  if (pass_field.type === 'password') {
    pass_field.type = 'text';
    showBtn.textContent = 'HIDE';
    showBtn.style.color = '#3498db';
  } else {
    pass_field.type = 'password';
    showBtn.textContent = 'SHOW';
    showBtn.style.color = '#222';
  }
};

const LoginForm = ({
  username,
  password,
  submitLogin,
  setUsername,
  setPassword,
}: ILoginForm) => {
  return (
    <div className="bg-img-form">
      <div className="content">
        <header>Login Form</header>
        <form onSubmit={submitHandler}>
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Email or Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input
              className="pass-key"
              placeholder="Password"
              type="text"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span className="show" onClick={showPass}>
              SHOW
            </span>
          </div>
          <div className="pass">
            <a href="/">Forgot Password?</a>
          </div>
          <div className="field">
            <input type="submit" value="Login" onClick={submitLogin} />
          </div>
        </form>
        <div className="login">Or login with</div>
        <div className="links">
          <div className="facebook">
            <i className="fab fa-facebook-f">
              <span>Facebook</span>
            </i>
          </div>
          <div className="instagram">
            <i className="fab fa-instagram">
              <span>Instagram</span>
            </i>
          </div>
        </div>
        <div className="signup">
          Don't have account?
          <Link to="/sign-up">Signup Now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
