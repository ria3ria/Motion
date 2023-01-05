import {
  FunctionComponent,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import TooltipError from "../components/TooltipError";
import PortalPopup from "../components/PortalPopup";
import TooltipSuccess from "../components/TooltipSuccess";
import styles from "./FormUserInfo.module.css";
import { testName } from "../common/RegExp";
import { getUserInfo, isLogin, changeName as changeNameFunc } from "../common/function";

const FormUserInfo: FunctionComponent = () => {
  const navigate = useNavigate();
  const iconErrorRef = useRef<HTMLDivElement>(null);
  const [isTooltipErrorPopupOpen, setTooltipErrorPopupOpen] = useState(false);
  const iconSuccessRef = useRef<HTMLDivElement>(null);
  const [isTooltipSuccessPopupOpen, setTooltipSuccessPopupOpen] =
    useState(false);

  const onFindIDClick = useCallback(() => {
    navigate("/form-findid");
  }, [navigate]);

  const onMyPostClick = useCallback(() => {
    navigate("/table-mypost");
  }, [navigate]);

  const onArtistProfileClick = useCallback(() => {
    navigate("/form-artistprofile");
  }, [navigate]);

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

  const onButtonAuditionClick = useCallback(() => {
    navigate("/table-audition");
  }, [navigate]);

  const onTextButtonCorverContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const [tooltipErrorMessage, setTooltipErrorMessage] = useState("");
  const [tooltipSuccessMessage, setTooltipSuccessMessage] = useState("");
  const [viewUserName, setViewUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [userGrade, setUserGrade] = useState("");

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

  const changeName = async() => {
    const inputUserName = document.getElementById("userName") as HTMLInputElement;
    const userName = inputUserName.value;
    if(testName(userName)) {
      setTooltipSuccessMessage("올바른 형식의 이름입니다.");
      appendTooltip(inputUserName, "success");
      if(await changeNameFunc(phoneNumber, userName)) {
        window.location.reload();
      }
      else {
        setTooltipErrorMessage("이름 변경에 실패하였습니다. 다시 시도해주세요.");
        appendTooltip(inputUserName, "error");
      }
    }
    else {
      setTooltipErrorMessage("실명 또는 회사명을 입력해주세요. (2~30자리 한글,영문,숫자)");
      appendTooltip(inputUserName, "error");
    }
  }

  async function getInfo() {
    if(await isLogin()) {
      const userDto = await getUserInfo();
      setViewUserName(userDto!["userName"]);
      setPhoneNumber(userDto!["phoneNumber"]);
      setRegisteredDate(new Date(userDto!["registeredDate"]).toLocaleString());
      setUserGrade(userDto!["userGrade"]);
      
      if(userDto!["userGrade"] == "제작자") {
        const myPost = document.getElementById("myPost") as HTMLSpanElement;
        myPost.parentElement?.setAttribute("class", styles["textbuttonFormHelp"]);
      }
      else if(userDto!["userGrade"] == "아티스트") {
        const artistProfile = document.getElementById("artistProfile") as HTMLSpanElement;
        artistProfile.parentElement?.setAttribute("class", styles["textbuttonFormHelp"]);
      }
    }
    else {
      navigate("/form-login");
    }
  }

  useEffect(() => {
    getInfo();

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
      <div className={styles.formUserInfo}>
        <div className={styles.right}>
          <div className={styles.title}>
            <b className={styles.title1} data-animate-on-scroll>
              회원정보
            </b>
            <div className={styles.subtitle1}>
              <div className={styles.textbuttonFormHelp}>
                <b
                  className={styles.findid}
                  onClick={onFindIDClick}
                  data-animate-on-scroll
                >
                  비밀번호 변경
                </b>
              </div>
            </div>
            <div className={styles.subtitle2}>
              <div className={styles.textbuttonFormHelp1}>
                <b
                  className={styles.findid}
                  id="myPost"
                  onClick={onMyPostClick}
                  data-animate-on-scroll
                >
                  공고 글 관리
                </b>
              </div>
              <div className={styles.textbuttonFormHelp1}>
                <b
                  className={styles.findid}
                  id="artistProfile"
                  onClick={onArtistProfileClick}
                  data-animate-on-scroll
                >
                  아티스트 프로필 작성
                </b>
              </div>
            </div>
          </div>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.textBoard}>
                <b className={styles.text} data-animate-on-scroll>
                  이름
                </b>
                <div className={styles.board}>
                  <b
                    className={styles.text1}
                    id="viewUserName"
                    data-animate-on-scroll
                  >
                    {viewUserName}
                  </b>
                </div>
              </div>
              <div className={styles.textBoard1}>
                <b className={styles.text} data-animate-on-scroll>
                  전화번호 (+82)
                </b>
                <div className={styles.board}>
                  <b
                    className={styles.text1}
                    id="phoneNumber"
                    data-animate-on-scroll
                  >
                    {phoneNumber}
                  </b>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.textBoard}>
                <div className={styles.description}>
                  <label
                    className={styles.label}
                    htmlFor="userName"
                    data-animate-on-scroll
                  >
                    이름 변경
                  </label>
                </div>
                <div className={styles.board}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="실명 또는 회사명 입력"
                    maxLength={30}
                    id="userName"
                    tabIndex={1}
                    name="userName"
                    data-animate-on-scroll
                  />
                </div>
              </div>
              <button
                className={styles.buttonChangename}
                type="button"
                onClick={changeName}
              >
                <div className={styles.text4}>이름 변경</div>
              </button>
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
            <div className={styles.row2}>
              <div className={styles.textBoard}>
                <b className={styles.text} data-animate-on-scroll>
                  가입일
                </b>
                <div className={styles.board}>
                  <b
                    className={styles.text1}
                    id="registeredDate"
                    data-animate-on-scroll
                  >
                    {registeredDate}
                  </b>
                </div>
              </div>
              <div className={styles.textBoard1}>
                <b className={styles.text} data-animate-on-scroll>
                  회원 등급
                </b>
                <div className={styles.board}>
                  <b
                    className={styles.text1}
                    id="userGrade"
                    data-animate-on-scroll
                  >
                    {userGrade}
                  </b>
                </div>
              </div>
            </div>
            <button
              className={styles.buttonAudition}
              onClick={onButtonAuditionClick}
            >
              <b className={styles.text9}>확인</b>
            </button>
          </form>
        </div>
        <img
          className={styles.userinfoFormImage1Icon}
          alt=""
          src="../userinfo-form-image-1@2x.png"
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

export default FormUserInfo;
