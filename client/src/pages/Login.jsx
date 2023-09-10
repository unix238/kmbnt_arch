import React, { useEffect } from "react";
import "../style/login.css";
import { Logo } from "../components/UI/Icons/Logo";
import { Search } from "../components/UI/Icons/Search";
import { Link } from "react-router-dom";
import { Button } from "../components/UI/Button/Button";
import { Facebook } from "../components/UI/Icons/Facebook";
import { useState } from "react";
import ServiceApi from "../api/ServiceApi";
import { validateEmail, validatePhone } from "../utils/validate";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { Google } from "../components/UI/Icons/Google";
import { VK } from "../components/UI/Icons/VK";
import { Twitter } from "../components/UI/Icons/Twitter";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [regError, setRegError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newPhone, setNewPhone] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const [choice, setChoice] = useState("email");

  const [currentPage, setCurrentPage] = useState("login");

  const googleLogin = async (tokenResponse) => {
    const response = await ServiceApi.googleAuth(tokenResponse);
    console.log(response);
    console.log(response.status);

    if (response?.status == 200) {
      localStorage.setItem("token", response.token);
      window.location.reload();
    }
  };

  const facebookLogin = async (data) => {
    // const response = await Se.facebookAuth(data);
    // console.log(response);
    // if (response.status == 200) {
    // Cookies.set("token", response.data.token);
    // window.location.reload();
    // }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: (tokenResponse) => googleLogin(tokenResponse),
  });

  const changeState = (state) => {
    setCurrentPage(state);
  };

  const handlePassword = (e, set) => {
    set(e.target.value);
    if (password !== password1) {
      setPasswordError("Пароли не совпадают");
    } else {
      setPasswordError("");
    }
  };

  const LogIn = async (e) => {
    console.log("dasd");
    e.preventDefault();
    if (login.length < 0) {
      setError("Неверный номер телефона или пароль");
      return;
    }
    if (loginPassword.length < 0) {
      setError("Неверный номер телефона или пароль");
      return;
    }
    try {
      const req = await ServiceApi.login(login, loginPassword);
      if (req) {
        setError("");
        setIsLoading(false);
        setLogin("");
        setPassword("");
        localStorage.setItem("user", JSON.stringify(req.user));
        localStorage.setItem("token", req.token);
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e);
      setError("Неверный номер телефона или пароль");
    }
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const req = await ServiceApi.checkToken(token);
        if (req?._id) {
          console.log(req?._id);
          window.location.href = "/";
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const register = async () => {
    if (validateEmail(newEmail) && validatePhone(newPhone)) {
      const user = {
        phone: newPhone,
        name: newName,
        email: newEmail,
      };
      try {
        const req = await ServiceApi.register(user);
        console.log(req.status); // НЕ УБИРАТЬ КАКИСТО ХУЕМ ВСЕ ЛОМАЕТСЯ
        if (req) {
          if (req.status == 205) {
            const activationMessageRequest =
              await ServiceApi.sendActivationCode(newEmail);
            if (activationMessageRequest) {
              if (activationMessageRequest.status === 200) {
                console.log("Code sent");
              }
            }
            setCurrentPage("activation");
          }
          if (req.status == 200) {
            const activationMessageRequest =
              await ServiceApi.sendActivationCode(newEmail);
            if (activationMessageRequest.status === 200) {
              console.log("Code sent");
            }
            setCurrentPage("activation");
          }
        }
      } catch (e) {
        setRegError("Пользователь с таким номером телефона уже существует");
        console.log("2131312323wqdas");
      }
    } else {
      console.log("daxczx");
      setRegError("Проверьте правильность введенных данных");
    }
  };

  const accountActivationHandler = async () => {
    try {
      const res = await ServiceApi.activateAccount({
        activationCode,
        email: newEmail,
      });
      if (res.status === 200) {
        setCurrentPage("password");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const continueRegistration = async () => {
    const req = await ServiceApi.continueRegistration({
      email: newEmail,
      password,
    });
    if (req.status === 200) {
      setCurrentPage("login");
      console.log("REGISTER SUCCESS");
    }
  };

  return (
    <div className='login'>
      <div className='headerTop'>
        <div className='wrapper'>
          <div className='headerItems'>
            <div className='logo'>
              <Link to='/'>
                <Logo width={110} height={20} />
              </Link>
            </div>
            <div className='search'>
              <Search width={20} height={20} />
            </div>
          </div>
        </div>
      </div>

      <div className='login__form'>
        <div className='login__wrapper'>
          <div className='login__register__choice'>
            <div
              className={
                currentPage === "login"
                  ? "login__choice active__choice"
                  : "login__choice"
              }
              onClick={() => {
                changeState("login");
              }}
            >
              Войти
            </div>
            <div
              className={
                currentPage === "register" || currentPage === "activation"
                  ? "register__choice active__choice"
                  : "register__choice"
              }
              onClick={() => {
                changeState("register");
              }}
            >
              Регистрация
            </div>
          </div>
          {currentPage === "login" ? (
            <form onSubmit={LogIn}>
              <input type='submit' hidden />
              <div className='login__form__form'>
                <div className='form__inputs'>
                  <div className='form__input'>
                    <div className='input__text'>Номер телефона или e-mail</div>
                    <input
                      type='text'
                      className='logininput'
                      id='phone'
                      placeholder='+7(___)-___-__-__'
                      value={login}
                      onChange={(e) => {
                        setLogin(e.target.value);
                      }}
                    />
                  </div>
                  <div className='form__input'>
                    <div className='input__text'>Пароль</div>
                    <input
                      type='password'
                      className='logininput'
                      id='password'
                      placeholder='Пароль'
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                      }}
                      value={loginPassword}
                    />
                  </div>
                  <div className='error'>{error}</div>
                  <div className='submitLogin'>
                    <Button
                      style={{ width: "100%", height: 40 }}
                      text='Войти в аккаунт'
                      onClick={LogIn}
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : currentPage === "register" ? (
            <>
              <div className='login__form__form'>
                <div className='form__inputs'>
                  <div className='form__input'>
                    <div className='input__text'>Имя</div>
                    <input
                      type='text'
                      className='logininput'
                      id='phone'
                      placeholder='Имя'
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                  </div>
                  <div className='form__input'>
                    <div className='input__text'>e-mail</div>
                    <input
                      type='text'
                      className='logininput'
                      placeholder='example@gmail.com'
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className='input__text'>Номер Телефона</div>
                  <input
                    type='text'
                    className='logininput'
                    id='phone'
                    placeholder='+7(___)-___-__-__'
                    value={newPhone}
                    onChange={(e) => {
                      setNewPhone(e.target.value);
                    }}
                  />
                  <div className='chooseConfirmation'>
                    <div className='radiobuttons'>
                      <div className='radiobutton'>
                        <input
                          type='radio'
                          value={"email"}
                          checked={choice === "email"}
                          onChange={(e) => {
                            setChoice(e.target.value);
                          }}
                          name='confirmation'
                          id='confirmation1'
                        />
                        <label htmlFor='confirmation1'>
                          Получить код по почте
                        </label>
                      </div>
                      <div className='radiobutton'>
                        <input
                          type='radio'
                          value={"sms"}
                          checked={choice === "sms"}
                          onChange={(e) => {
                            setChoice(e.target.value);
                          }}
                          name='confirmation'
                          id='confirmation2'
                        />
                        <label htmlFor='confirmation2'>
                          Получить код по SMS
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='error'>{regError}</div>
                  <div className='submitLogin'>
                    <Button
                      style={{ width: "100%", height: 40 }}
                      text='Получить код подтверждения'
                      onClick={register}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : currentPage === "activation" ? (
            <div className='activation'>
              <div className='activationText'>
                Код был отправлен на номер {newPhone}. Чтобы подтвердить свою
                личность, введите его:
              </div>
              <div className='activationCode'>
                <input
                  maxLength='4'
                  id='activation'
                  value={activationCode}
                  onChange={(e) => {
                    setActivationCode(e.target.value);
                  }}
                />
              </div>
              <div className='sendAgain'>Отправить повторно через 00:58</div>
              <Button
                style={{ width: "100%", height: 40 }}
                text='Продолжить'
                onClick={accountActivationHandler}
              />
            </div>
          ) : currentPage === "password" ? (
            <div className='password'>
              <div className='login__form__form'>
                <div className='form__inputs'>
                  <div className='form__input'>
                    <div className='input__text'>Придумайте пароль</div>
                    <input
                      type='password'
                      className='logininput'
                      id='password'
                      placeholder='••••••••••••'
                      value={password}
                      onChange={(e) => {
                        handlePassword(e, setPassword);
                      }}
                    />
                  </div>
                  <div className='form__input'>
                    <div className='input__text'>Повторите пароль</div>
                    <input
                      type='password'
                      className='logininput'
                      id='phone'
                      placeholder='••••••••••••'
                      value={password1}
                      onChange={(e) => {
                        handlePassword(e, setPassword1);
                      }}
                    />
                  </div>
                  <div className='error'>
                    {passwordError ? passwordError : ""}
                  </div>
                  <div className='submitLogin'>
                    <Button
                      style={{ width: "100%", height: 40 }}
                      text='Создать аккаунт'
                      onClick={continueRegistration}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className='line'></div>

          <div className='login__via'>
            <div className='login__via__tabs'>
              <FacebookLogin
                appId='802681641562466'
                onSuccess={(response) => {
                  facebookLogin(response);
                  console.log(response);
                }}
                onFail={(error) => {
                  console.log("Login Failed!", error);
                }}
                onProfileSuccess={(response) => {
                  console.log("Get Profile Success!", response);
                  // facebookLogin(response.email);
                }}
                render={({ onClick, logout }) => (
                  <div className='login__tab' onClick={onClick}>
                    <div className='tab__icon'>
                      <Facebook color={"black"} />
                    </div>
                    <div className='tab__title'>Facebook</div>
                  </div>
                )}
              />
              <div className='login__tab' onClick={googleLoginHandler}>
                <div className='tab__icon'>
                  <Google color={"black"} />
                </div>
                <div className='tab__title'>Google</div>
              </div>
              <div className='login__tab disabled'>
                <div className='tab__icon'>
                  <VK color={"black"} />
                </div>
                <div className='tab__title'>Vkontakte</div>
              </div>
              <div className='login__tab disabled'>
                <div className='tab__icon'>
                  <Twitter color={"black"} />
                </div>
                <div className='tab__title'>Twitter</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
