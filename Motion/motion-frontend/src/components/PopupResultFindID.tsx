import { FormEventHandler, FunctionComponent, useEffect } from "react";
import { changePw } from "../common/function";
import { testPw } from "../common/RegExp";
import styles from "./PopupResultFindID.module.css";

type PopupResultFindIDType = {
  onClose: (isChanged?: boolean) => void;
  userID: string;
  appendTooltip: (input: HTMLInputElement, tooltip: "error" | "success") => void;
  setTooltipErrorMessage: any;
};

const PopupResultFindID: FunctionComponent<PopupResultFindIDType> = ({
  onClose, userID, appendTooltip, setTooltipErrorMessage
}) => {
  const onFormSubmit: FormEventHandler = async(e) => {
    e.preventDefault();

    const inputPhoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
    const phoneNumber = inputPhoneNumber.value;
    const inputDigitCode = document.getElementById("digitCode") as HTMLInputElement;
    const digitCode = inputDigitCode.value;
    const inputUserPW = document.getElementById("userPW") as HTMLInputElement;
    const userPW = inputUserPW.value;
    const inputUserPWCheck = document.getElementById("userPWCheck") as HTMLInputElement;
    const userPWCheck = inputUserPWCheck.value;

    if(testPw(userPW)) {
      if(userPW == userPWCheck) {
        if(await changePw(phoneNumber, userPW, digitCode)) {
          onClose(true);
        }
        else {
          setTooltipErrorMessage("인증번호 유효시간이 지났습니다. 다시 발급하여 시도해주세요.");
          appendTooltip(inputDigitCode, "error");
          onClose();
        }
      }
      else {
        setTooltipErrorMessage("비밀번호가 일치하지 않습니다.");
        appendTooltip(inputUserPWCheck, "error");
      }
    }
    else {
      setTooltipErrorMessage("5~30자의 영문, 숫자, 특수문자(*~`!^-_+<>@#$%&)만 가능합니다.");
      appendTooltip(inputUserPW, "error");
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
    <div className={styles.popupResultFindId} data-animate-on-scroll>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <div className={styles.row}>
          <div className={styles.textBoard}>
            <b className={styles.text} data-animate-on-scroll>
              아이디
            </b>
            <div className={styles.board}>
              <b className={styles.text1} data-animate-on-scroll>
                {userID}
              </b>
            </div>
          </div>
        </div>
        <div className={styles.row1}>
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
            <div className={styles.board}>
              <input
                className={styles.input}
                type="password"
                placeholder="5~30자의 영문 소문자, 숫자, 특수문자"
                maxLength={30}
                id="userPW"
                tabIndex={3}
                name="userPW"
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
            <div className={styles.board}>
              <input
                className={styles.input}
                type="password"
                placeholder="비밀번호 재입력"
                maxLength={30}
                id="userPWCheck"
                tabIndex={4}
                name="userPWCheck"
                data-animate-on-scroll
              />
            </div>
          </div>
        </div>
        <div className={styles.row1}>
          <button
            className={styles.buttonChangepw}
            id="changeButton"
            name="changeButton"
          >
            <b className={styles.text2}>비밀번호 변경</b>
          </button>
          <button
            className={styles.buttonCancle}
            type="button"
            onClick={() => onClose()}
          >
            <b className={styles.text2}>취소</b>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupResultFindID;
