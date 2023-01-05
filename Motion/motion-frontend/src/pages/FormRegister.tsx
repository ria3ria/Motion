import {
  FunctionComponent,
  useState,
  useRef,
  useCallback,
  useEffect,
  MouseEventHandler,
  FocusEventHandler,
  FormEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";
import TooltipError from "../components/TooltipError";
import PortalPopup from "../components/PortalPopup";
import TooltipSuccess from "../components/TooltipSuccess";
import styles from "./FormRegister.module.css";
import { testDigitCode, testId, testName, testPhoneNumber, testPw } from "../common/RegExp";
import { checkDigitCode as checkDigitCodeFunc, canUseId, canUsePhoneNumber, sendDigitCode, UserGrade, isLogin } from "../common/function";
import axios from "axios";
import PopupRegisterSuccess from "../components/PopupRegisterSuccess";

const FormRegister: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isPopupRegisterSuccessOpen, setPopupRegisterSuccessOpen] =
    useState(false);
  const iconErrorRef = useRef<HTMLDivElement>(null);
  const [isTooltipErrorPopupOpen, setTooltipErrorPopupOpen] = useState(false);
  const iconSuccessRef = useRef<HTMLDivElement>(null);
  const [isTooltipSuccessPopupOpen, setTooltipSuccessPopupOpen] =
    useState(false);

  const onLoginClick = useCallback(() => {
    navigate("/form-login");
  }, [navigate]);

  const onFindIDClick = useCallback(() => {
    navigate("/form-findid");
  }, [navigate]);

  const openPopupRegisterSuccess = useCallback(() => {
    setPopupRegisterSuccessOpen(true);
  }, []);

  const closePopupRegisterSuccess = useCallback(() => {
    setPopupRegisterSuccessOpen(false);
  }, []);

  const openTooltipErrorPopup = useCallback(() => {
    setTooltipErrorPopupOpen(true);
  }, []);

  const closeTooltipErrorPopup = useCallback(() => {
    setTooltipErrorPopupOpen(false);
  }, []);

  const openTooltipSuccessPopup = useCallback(() => {
    setTooltipSuccessPopupOpen(true);
  }, []);

  const closeTooltipSuccessPopup = useCallback(() => {
    setTooltipSuccessPopupOpen(false);
  }, []);

  const onTextButtonCorverContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const [tooltipErrorMessage, setTooltipErrorMessage] = useState("");
  const [tooltipSuccessMessage, setTooltipSuccessMessage] = useState("");

  const sendSms: MouseEventHandler = async(e) => {
    e.preventDefault();
    let text = e.target as HTMLDivElement;
    if(text.hasAttribute("type")) {
      text = text.firstChild as HTMLDivElement;
    }
    const inputPhoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
    const phoneNumber = inputPhoneNumber.value;
    if(!await checkPhoneNumber(phoneNumber)) {
      appendTooltip(inputPhoneNumber, "error");
      return;
    }

    const inputDigitCode = document.getElementById("digitCode") as HTMLInputElement;
    const type = "REGISTER";
    if(await sendDigitCode(phoneNumber, type)) {
      text.textContent = "인증번호 재전송";
      setTooltipSuccessMessage("인증번호가 전송되었습니다. 3분 이내 입력해주세요.");
      appendTooltip(inputDigitCode, "success");
      openTooltipSuccessPopup();
    }
    else {
      setTooltipErrorMessage("인증번호 전송에 실패하였습니다.");
      appendTooltip(inputDigitCode, "error");
    }
  }

  const setUserGrade: MouseEventHandler = (e) => {
    let button = e.target as HTMLButtonElement;
    let anotherButton = button;
    if(!button.hasAttribute("type")) {
      button = button.parentElement as HTMLButtonElement;
    }
    button.setAttribute("style", "background-color: var(--blue-6); border: 1px solid var(--blue-6); box-sizing: border-box;");
    (button.firstChild as HTMLDivElement).setAttribute("style", "color: var(--color-white)");

    const text = button.textContent;
    const userGrade = document.getElementById("userGrade") as HTMLInputElement
    if(text == "제작자") {
      userGrade.value = "PRODUCER";
      anotherButton = button.parentElement?.childNodes[1] as HTMLButtonElement;
    }
    else if(text == "아티스트") {
      userGrade.value = "ARTIST";
      anotherButton = button.parentElement?.childNodes[0] as HTMLButtonElement;
    }
    anotherButton.setAttribute("style", "");
    (anotherButton.firstChild as HTMLDivElement).setAttribute("style", "");
    setTooltipSuccessMessage(text+"");
    appendTooltip(document.getElementById("userGrade") as HTMLInputElement, "success");
  };

  const checkId = async(userID: string) => {
    let checkResult = false;
    if(testId(userID)) {
      if(await canUseId(userID)) {
        setTooltipSuccessMessage("사용 가능한 아이디입니다.");
        checkResult = true;
      }
      else {
        setTooltipErrorMessage("이미 사용중인 아이디입니다.");
        checkResult = false;
      }
    }
    else {
      setTooltipErrorMessage("5~20자의 영문 소문자, 숫자만 가능합니다.");
      checkResult = false;
    }
    return checkResult;
  }

  const checkPw = (userPW: string) => {
    let checkResult = false;
    if(testPw(userPW)) {
      setTooltipSuccessMessage("사용 가능한 비밀번호입니다.");
      checkResult = true;
    }
    else {
      setTooltipErrorMessage("5~30자의 영문, 숫자, 특수문자(*~`!^-_+<>@#$%&)만 가능합니다.");
      checkResult = false;
    }
    return checkResult;
  }

  const isPwEqual = (userPWCheck: string) => {
    const userPW = (document.getElementById("userPW") as HTMLInputElement).value;
    let checkResult = false;
    checkResult = checkPw(userPW);
    if(checkResult) {
      if(userPW == userPWCheck) {
        setTooltipSuccessMessage("비밀번호 일치");
        checkResult = true;
      }
      else {
        setTooltipErrorMessage("비밀번호가 일치하지 않습니다.");
        checkResult = false;
      }
    }
    else {
      setTooltipErrorMessage("비밀번호를 먼저 입력해주세요.");
      checkResult = false;
    }
    return checkResult;
  }

  const checkPhoneNumber = async(phoneNumber: string) => {
    let checkResult = false;
    if(testPhoneNumber(phoneNumber)) {
      if(await canUsePhoneNumber(phoneNumber)) {
        setTooltipSuccessMessage("가입 가능한 전화번호입니다.");
        checkResult = true;
      }
      else {
        setTooltipErrorMessage("가입 불가능한 전화번호입니다.");
        checkResult = false;
      }
    }
    else {
      setTooltipErrorMessage("- (하이픈)을 제외한 전화번호를 입력해주세요. (9~11자리)");
      checkResult = false;
    }
    return checkResult;
  }

  const checkName = (userName: string) => {
    let checkResult = false;
    if(testName(userName)) {
      setTooltipSuccessMessage("올바른 형식의 이름입니다.");
      checkResult = true;
    }
    else {
      setTooltipErrorMessage("실명 또는 회사명을 입력해주세요. (2~30자리 한글,영문,숫자)");
      checkResult = false;
    }
    return checkResult;
  }

  const checkDigitCode = async(digitCode: string) => {
    const phoneNumber = (document.getElementById("phoneNumber") as HTMLInputElement).value;
    let checkResult = false;
    checkResult = await checkPhoneNumber(phoneNumber);
    if(checkResult) {
      if(testDigitCode(digitCode)) {
        if(await checkDigitCodeFunc(phoneNumber, digitCode, "REGISTER")) {
          setTooltipSuccessMessage("인증 완료");
          checkResult = true;
        }
        else {
          setTooltipErrorMessage("인증번호를 정확히 입력해주세요.");
          checkResult = false;
        }
      }
      else {
        setTooltipErrorMessage("인증번호는 6자리의 숫자입니다.");
        checkResult = false;
      }
    }
    return checkResult;
  }

  const appendTooltip = (input:HTMLInputElement, tooltip: "error" | "success") => {
    const tooltipError = document.getElementById("tooltip_error") as HTMLDivElement;
    const tooltipSuccess = document.getElementById("tooltip_success") as HTMLDivElement;
    const description = input.parentElement?.parentElement?.firstChild as HTMLDivElement;
    closeTooltipErrorPopup();
    closeTooltipSuccessPopup();
    if(tooltip == "success") {
      description.appendChild(tooltipSuccess);
      tooltipSuccess.setAttribute("style", "display:inline-block");
      tooltipError.setAttribute("style", "display:none");
    }
    else if(tooltip == "error") {
      description.appendChild(tooltipError);
      tooltipError.setAttribute("style", "display:inline-block");
      tooltipSuccess.setAttribute("style", "display:none");
      openTooltipErrorPopup();
    }
  }

  const onBlur: FocusEventHandler = async(e) => {
    const input = e.target as HTMLInputElement;
    const inputId = input.id;
    const inputValue = input.value;
    let checkResult = false;
    closeTooltipErrorPopup();
    closeTooltipSuccessPopup();

    if(inputId == "userID") {
      checkResult = await checkId(inputValue);
    }
    else if(inputId == "userPW") {
      checkResult = await checkPw(inputValue);
    }
    else if(inputId == "userPWCheck") {
      checkResult = await isPwEqual(inputValue);
    }
    else if(inputId == "phoneNumber") {
      checkResult = await checkPhoneNumber(inputValue);
    }
    else if(inputId == "userName") {
      checkResult = await checkName(inputValue);
    }

    if(checkResult) {
      appendTooltip(input, "success");
    }
    else {
      appendTooltip(input, "error");
    }
  }

  const onFormSubmit: FormEventHandler = async(e) => {
    e.preventDefault();

    const inputUserID = document.getElementById("userID") as HTMLInputElement;
    const userID = inputUserID.value;
    const inputUserGrade = document.getElementById("userGrade") as HTMLInputElement;
    const userGrade = inputUserGrade.value as UserGrade;
    const inputUserPW = document.getElementById("userPW") as HTMLInputElement;
    const userPW = inputUserPW.value;
    const inputUserPWCheck = document.getElementById("userPWCheck") as HTMLInputElement;
    const userPWCheck = inputUserPWCheck.value;
    const inputPhoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
    const phoneNumber = inputPhoneNumber.value;
    const inputUserName = document.getElementById("userName") as HTMLInputElement;
    const userName = inputUserName.value;
    const inputDigitCode = document.getElementById("digitCode") as HTMLInputElement;
    const digitCode = inputDigitCode.value;

    if(!await checkId(userID)) {
      appendTooltip(inputUserID, "error");
      return;
    }
    if(userGrade.length == 0) {
      setTooltipErrorMessage("회원 등급을 선택해주세요.");
      appendTooltip(inputUserGrade, "error");
      return;
    }
    if(!await checkPw(userPW)) {
      appendTooltip(inputUserPW, "error");
      return;
    }
    if(!await isPwEqual(userPWCheck)) {
      appendTooltip(inputUserPWCheck, "error");
      return;
    }
    if(!await checkPhoneNumber(phoneNumber)) {
      appendTooltip(inputPhoneNumber, "error");
      return;
    }
    if(!await checkName(userName)) {
      appendTooltip(inputUserName, "error");
      return;
    }
    if(!await checkDigitCode(digitCode)) {
      appendTooltip(inputDigitCode, "error");
      return;
    }
    
    await axios.post('/api/user/register', null, { params: {
        userID, userGrade, userPW, phoneNumber, userName, digitCode
      }
    }).then((response) => {
      if(response.data) {
        openPopupRegisterSuccess();
      }
      else {
        setTooltipErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
        appendTooltip(inputDigitCode, "error");
      }
    });
  }

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.formRegister}>
        <div className={styles.right}>
          <div className={styles.title}>
            <b className={styles.title1} data-animate-on-scroll>
              회원가입
            </b>
            <div className={styles.subtitle1}>
              <div className={styles.textFormHelp}>
                <b className={styles.text} data-animate-on-scroll>
                  이미 회원이신가요?
                </b>
              </div>
              <div className={styles.textbuttonFormHelp}>
                <b
                  className={styles.login}
                  onClick={onLoginClick}
                  data-animate-on-scroll
                >
                  로그인
                </b>
              </div>
            </div>
            <div className={styles.subtitle2}>
              <div className={styles.textFormHelp}>
                <b
                  className={styles.login}
                  onClick={onFindIDClick}
                  data-animate-on-scroll
                >
                  아이디/비밀번호
                </b>
              </div>
              <div className={styles.textFormHelp1}>
                <b className={styles.text} data-animate-on-scroll>
                  를 잊으셨나요?
                </b>
              </div>
            </div>
          </div>
          <form className={styles.form} onSubmit={onFormSubmit}>
            <div className={styles.row}>
              <div className={styles.inputUserid}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="userID"
                    data-animate-on-scroll
                  >
                    아이디
                  </label>
                </div>
                <div className={styles.board}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="5~20자의 영문 소문자, 숫자"
                    maxLength={20}
                    id="userID"
                    tabIndex={1}
                    name="userID"
                    onBlur={onBlur}
                    data-animate-on-scroll
                  />
                </div>
              </div>
              <div className={styles.buttonSelectMultiple}>
                <div className={styles.description}>
                  <b className={styles.text2} data-animate-on-scroll>
                    회원 등급
                  </b>
                </div>
                <div className={styles.button}>
                  <button
                    className={styles.buttonProducer}
                    type="button"
                    onClick={setUserGrade}
                  >
                    <div className={styles.text3} data-animate-on-scroll>
                      제작자
                    </div>
                  </button>
                  <button
                    className={styles.buttonArtist}
                    type="button"
                    onClick={setUserGrade}
                  >
                    <div className={styles.text3} data-animate-on-scroll>
                      아티스트
                    </div>
                  </button>
                  <input
                    className={styles.inputHiddenUsergrade}
                    type="text"
                    id="userGrade"
                    name="userGrade"
                    data-animate-on-scroll
                  />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputUserpw}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="userPW"
                    data-animate-on-scroll
                  >
                    비밀번호
                  </label>
                </div>
                <div className={styles.board1}>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="5~30자의 영문, 숫자, 특수문자"
                    maxLength={20}
                    id="userPW"
                    tabIndex={2}
                    name="userPW"
                    onBlur={onBlur}
                    data-animate-on-scroll
                  />
                </div>
              </div>
              <div className={styles.inputUserpwcheck}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="userPWCheck"
                    data-animate-on-scroll
                  >
                    비밀번호 확인
                  </label>
                </div>
                <div className={styles.board1}>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="비밀번호 재입력"
                    maxLength={20}
                    id="userPWCheck"
                    tabIndex={3}
                    name="userPWCheck"
                    onBlur={onBlur}
                    data-animate-on-scroll
                  />
                </div>
              </div>
            </div>
            <div className={styles.row2}>
              <div className={styles.inputUserpw}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="phoneNumber"
                    data-animate-on-scroll
                  >
                    전화번호 (+82)
                  </label>
                </div>
                <div className={styles.board1}>
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="- (하이픈) 제외 입력"
                    maxLength={20}
                    id="phoneNumber"
                    tabIndex={4}
                    name="phoneNumber"
                    onBlur={onBlur}
                    data-animate-on-scroll
                  />
                </div>
              </div>
              <button
                className={styles.buttonSendSms}
                type="button"
                onClick={sendSms}
              >
                <div className={styles.text5}>인증번호 받기</div>
              </button>
            </div>
            <div className={styles.row2}>
              <div className={styles.inputUserpw}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="userName"
                    data-animate-on-scroll
                  >
                    이름
                  </label>
                </div>
                <div className={styles.board1}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="실명 또는 회사명 입력"
                    maxLength={30}
                    id="userName"
                    tabIndex={5}
                    name="userName"
                    onBlur={onBlur}
                    data-animate-on-scroll
                  />
                </div>
              </div>
              <div className={styles.inputDigitcode}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="digitCode"
                    data-animate-on-scroll
                  >
                    인증번호
                  </label>
                </div>
                <div className={styles.board1}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="인증번호 입력"
                    maxLength={6}
                    id="digitCode"
                    tabIndex={6}
                    name="digitCode"
                    data-animate-on-scroll
                  />
                </div>
              </div>
            </div>
            <button
              className={styles.buttonRegister}
            >
              <b className={styles.text6}>회원가입</b>
            </button>
          </form>
          <div
            className={styles.iconError}
            id="tooltip_error"
            onMouseEnter={openTooltipErrorPopup}
            ref={iconErrorRef}
            onClick={openTooltipErrorPopup}
          >
            <img
              className={styles.iconError1}
              alt=""
              src="../icon-error1.svg"
            />
          </div>
          <div
            className={styles.iconError}
            id="tooltip_success"
            onMouseEnter={openTooltipSuccessPopup}
            ref={iconSuccessRef}
            onClick={openTooltipSuccessPopup}
          >
            <img
              className={styles.iconError1}
              alt=""
              src="../icon-success1.svg"
            />
          </div>
        </div>
        <img
          className={styles.registerFormImage1Icon}
          alt=""
          src="../register-form-image-1@2x.png"
        />
        <div
          className={styles.textbuttonCorver}
          onClick={onTextButtonCorverContainerClick}
        >
          <b className={styles.cover}>
            <p className={styles.p}>
              <span className={styles.span}>모</span>
              <span>두의 오디</span>
              <span className={styles.span}>션</span>
              <span>,</span>
            </p>
            <p className={styles.p1}>
              <span>모션</span>
            </p>
          </b>
        </div>
      </div>
      {isPopupRegisterSuccessOpen && (
        <PortalPopup overlayColor="rgba(0, 0, 0, 0.3)" placement="Centered">
          <PopupRegisterSuccess onClose={closePopupRegisterSuccess} />
        </PortalPopup>
      )}
      {isTooltipErrorPopupOpen && (
        <PortalPopup
          placement="Top left"
          top={2}
          left={-10}
          relativeLayerRef={iconErrorRef}
          onOutsideClick={closeTooltipErrorPopup}
        >
          <TooltipError onClose={closeTooltipErrorPopup} message={tooltipErrorMessage}/>
        </PortalPopup>
      )}
      {isTooltipSuccessPopupOpen && (
        <PortalPopup
          placement="Top left"
          top={2}
          left={-10}
          relativeLayerRef={iconSuccessRef}
          onOutsideClick={closeTooltipSuccessPopup}
        >
          <TooltipSuccess onClose={closeTooltipSuccessPopup} message={tooltipSuccessMessage}/>
        </PortalPopup>
      )}
    </>
  );
};

export default FormRegister;
