import {
  FunctionComponent,
  useState,
  useRef,
  useCallback,
  useEffect,
  FormEventHandler,
  FocusEventHandler,
  MouseEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";
import { findId, sendDigitCode } from "../common/function";
import { testPhoneNumber } from "../common/RegExp";
import PopupResultFindID from "../components/PopupResultFindID";
import PortalPopup from "../components/PortalPopup";
import TooltipError from "../components/TooltipError";
import TooltipSuccess from "../components/TooltipSuccess";
import styles from "./FormFindID.module.css";

const FormFindID: FunctionComponent = () => {
  const navigate = useNavigate();
  const buttonFindIDRef = useRef<HTMLButtonElement>(null);
  const [isPopupResultFindIDOpen, setPopupResultFindIDOpen] = useState(false);
  const iconErrorRef = useRef<HTMLDivElement>(null);
  const [isTooltipErrorPopupOpen, setTooltipErrorPopupOpen] = useState(false);
  const iconSuccessRef = useRef<HTMLDivElement>(null);
  const [isTooltipSuccessPopupOpen, setTooltipSuccessPopupOpen] =
    useState(false);

  const onRegisterClick = useCallback(() => {
    navigate("/form-register");
  }, [navigate]);

  const onLoginClick = useCallback(() => {
    navigate("/form-login");
  }, [navigate]);

  const openPopupResultFindID = useCallback(() => {
    setPopupResultFindIDOpen(true);
  }, []);

  const closePopupResultFindID = useCallback((isChanged?: boolean) => {
    if(isChanged != undefined) {
      const btnFindId = document.getElementById("btnFindId") as HTMLButtonElement;
      if(isChanged) {
        (btnFindId.firstChild as HTMLSpanElement).textContent = "로그인";
        btnFindId.type = "button";
        btnFindId.onclick = () => { navigate("/form-login") };
      }
    }
    setPopupResultFindIDOpen(false);
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [digitCode, setDigitCode] = useState("");
  const [userID, setUserID] = useState("");
  
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
  
  const sendSms: MouseEventHandler = async(e) => {
    e.preventDefault();
    let text = e.target as HTMLDivElement;
    if(text.hasAttribute("type")) {
      text = text.firstChild as HTMLDivElement;
    }
    const inputPhoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
    const phoneNumber = inputPhoneNumber.value;
    if(!testPhoneNumber(phoneNumber)) {
      setTooltipErrorMessage("- (하이픈)을 제외한 전화번호를 입력해주세요. (9~11자리)");
      appendTooltip(inputPhoneNumber, "error");
      return;
    }

    const inputDigitCode = document.getElementById("digitCode") as HTMLInputElement;
    const type = "FINDID";
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
  
  const onBlur: FocusEventHandler = async(e) => {
    const input = e.target as HTMLInputElement;
    const inputId = input.id;
    const inputValue = input.value;
    closeTooltipErrorPopup();
    closeTooltipSuccessPopup();

    if(inputId == "phoneNumber") {
      if(!testPhoneNumber(inputValue)) {
        setTooltipErrorMessage("- (하이픈)을 제외한 전화번호를 입력해주세요. (9~11자리)");
        appendTooltip(input, "error");
      }
      else {
        setTooltipSuccessMessage("올바른 형식의 전화번호입니다.");
        appendTooltip(input, "success");
      }
    }
  }
  
  const onFormSubmit: FormEventHandler = async(e) => {
    e.preventDefault();

    const inputPhoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
    const phoneNumber = inputPhoneNumber.value;
    const inputDigitCode = document.getElementById("digitCode") as HTMLInputElement;
    const digitCode = inputDigitCode.value;

    if(!testPhoneNumber(phoneNumber)) {
      setTooltipErrorMessage("- (하이픈)을 제외한 전화번호를 입력해주세요. (9~11자리)");
      appendTooltip(inputPhoneNumber, "error");
      return;
    }
    else {
      setTooltipSuccessMessage("올바른 형식의 전화번호입니다.");
      appendTooltip(inputPhoneNumber, "success");
    }

    const userID = await findId(phoneNumber, digitCode);
    if(userID == undefined || userID == null || userID == "") {
      setTooltipErrorMessage("전화번호 또는 인증번호를 잘못 입력했습니다.");
      appendTooltip(inputPhoneNumber, "error");
    }
    else {
      setPhoneNumber(phoneNumber);
      setDigitCode(digitCode);
      setUserID(userID);
      closeTooltipErrorPopup();
      closeTooltipSuccessPopup();
      openPopupResultFindID();
    }
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
      <div className={styles.formFindId}>
        <div className={styles.right}>
          <div className={styles.title}>
            <b className={styles.title1} data-animate-on-scroll>
              아이디/비밀번호 찾기
            </b>
            <div className={styles.subtitle1}>
              <div className={styles.textFormHelp}>
                <b className={styles.text} data-animate-on-scroll>
                  아이디가 없으신가요?
                </b>
              </div>
              <div className={styles.textbuttonFormHelp}>
                <b
                  className={styles.register}
                  onClick={onRegisterClick}
                  data-animate-on-scroll
                >
                  회원가입
                </b>
              </div>
            </div>
            <div className={styles.subtitle2}>
              <div className={styles.textFormHelp}>
                <b className={styles.text} data-animate-on-scroll>
                  이미 회원이신가요?
                </b>
              </div>
              <div className={styles.textbuttonFormHelp}>
                <b
                  className={styles.register}
                  onClick={onLoginClick}
                  data-animate-on-scroll
                >
                  로그인
                </b>
              </div>
            </div>
          </div>
          <form className={styles.form} onSubmit={onFormSubmit}>
            <div className={styles.row}>
              <div className={styles.inputPhonenumber}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="phoneNumber"
                    data-animate-on-scroll
                  >
                    전화번호 (+82)
                  </label>
                </div>
                <div className={styles.board}>
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="- (하이픈) 제외 입력"
                    maxLength={20}
                    id="phoneNumber"
                    tabIndex={1}
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
                <div className={styles.text2}>인증번호 받기</div>
              </button>
            </div>
            <div className={styles.row1}>
              <div className={styles.inputPhonenumber}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="digitCode"
                    data-animate-on-scroll
                  >
                    인증번호
                  </label>
                </div>
                <div className={styles.board}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="인증번호 입력"
                    maxLength={6}
                    id="digitCode"
                    tabIndex={2}
                    name="digitCode"
                    data-animate-on-scroll
                  />
                </div>
              </div>
            </div>
            <button
              className={styles.buttonFindId}
              id="btnFindId"
              ref={buttonFindIDRef}
            >
              <b className={styles.text3}>찾기</b>
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
          className={styles.findIdFormImage1Icon}
          alt=""
          src="../find-id-form-image-1@2x.png"
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
      {isPopupResultFindIDOpen && (
        <PortalPopup
          placement="Top left"
          top={-75}
          relativeLayerRef={buttonFindIDRef}
        >
          <PopupResultFindID onClose={closePopupResultFindID} userID={userID} appendTooltip={appendTooltip} setTooltipErrorMessage={setTooltipErrorMessage}/>
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

export default FormFindID;
