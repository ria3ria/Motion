import {
  FunctionComponent,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import PopupProducerArtist from "../components/PopupProducerArtist";
import PortalPopup from "../components/PortalPopup";
import TooltipError from "../components/TooltipError";
import TooltipSuccess from "../components/TooltipSuccess";
import styles from "./Components.module.css";

const Components: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isPopupProducerArtistOpen, setPopupProducerArtistOpen] =
    useState(false);
  const iconErrorRef = useRef<HTMLDivElement>(null);
  const [isTooltipErrorPopupOpen, setTooltipErrorPopupOpen] = useState(false);
  const iconSuccessRef = useRef<HTMLDivElement>(null);
  const [isTooltipSuccessPopupOpen, setTooltipSuccessPopupOpen] =
    useState(false);

  const onTextButtonCorverContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const openPopupProducerArtist = useCallback(() => {
    setPopupProducerArtistOpen(true);
  }, []);

  const closePopupProducerArtist = useCallback(() => {
    setPopupProducerArtistOpen(false);
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
      <div className={styles.components}>
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
        <div className={styles.textFormHelp}>
          <b className={styles.text} data-animate-on-scroll>
            이미 회원이신가요?
          </b>
        </div>
        <div className={styles.textbuttonFormHelp}>
          <b className={styles.text1} data-animate-on-scroll>
            로그인
          </b>
        </div>
        <button
          className={styles.button1}
          type="button"
          onClick={openPopupProducerArtist}
        >
          <b className={styles.text2}>시작하기</b>
        </button>
        <button className={styles.button2} type="button">
          <div className={styles.text3} data-animate-on-scroll>
            제작자
          </div>
        </button>
        <button className={styles.button3}>
          <div className={styles.text4}>인증번호 받기</div>
        </button>
        <div className={styles.buttonSelect}>
          <b className={styles.text} data-animate-on-scroll>
            국적
          </b>
          <input
            className={styles.inputHiddenCountry}
            type="text"
            name="country"
            data-animate-on-scroll
          />
          <button className={styles.buttonCountry} type="button">
            <div className={styles.text6} data-animate-on-scroll>
              국적
            </div>
          </button>
        </div>
        <div className={styles.buttonSelectMultiple}>
          <div className={styles.description}>
            <b className={styles.text} data-animate-on-scroll>
              회원 등급
            </b>
          </div>
          <div className={styles.button}>
            <button className={styles.button21} type="button">
              <div className={styles.text6} data-animate-on-scroll>
                제작자
              </div>
            </button>
            <button className={styles.button22} type="button">
              <div className={styles.text6} data-animate-on-scroll>
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
        <div className={styles.input}>
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
              className={styles.input1}
              type="text"
              placeholder="5~20자의 영문 소문자, 숫자"
              maxLength={20}
              id="userID"
              tabIndex={0}
              name="userID"
              data-animate-on-scroll
            />
          </div>
        </div>
        <div className={styles.inputRange}>
          <label
            className={styles.label1}
            htmlFor="ageMin"
            data-animate-on-scroll
          >
            만 나이 (선택)
          </label>
          <div className={styles.board1}>
            <div className={styles.column}>
              <input
                className={styles.input2}
                type="text"
                placeholder="19"
                maxLength={2}
                id="ageMin"
                tabIndex={0}
                name="ageMin"
                data-animate-on-scroll
              />
            </div>
            <b className={styles.text10}>~</b>
            <div className={styles.column}>
              <input
                className={styles.input2}
                type="text"
                placeholder="29"
                maxLength={2}
                id="ageMax"
                tabIndex={0}
                name="ageMax"
                data-animate-on-scroll
              />
            </div>
          </div>
        </div>
        <div className={styles.textBoard}>
          <b className={styles.text} data-animate-on-scroll>
            아이디
          </b>
          <div className={styles.board2}>
            <b className={styles.text12} data-animate-on-scroll>
              5~20자의 영문 소문자, 숫자
            </b>
          </div>
        </div>
        <div className={styles.buttonUploadFile} data-animate-on-scroll>
          <img
            className={styles.iconImageAdd}
            alt=""
            src="../icon-imageadd.svg"
          />
        </div>
        <button className={styles.iconInformation}>
          <img
            className={styles.iconInformation1}
            alt=""
            src="../icon-information.svg"
          />
        </button>
        <div
          className={styles.iconError}
          id="tooltip_error"
          onMouseEnter={openTooltipErrorPopup}
          ref={iconErrorRef}
          onClick={openTooltipErrorPopup}
        >
          <img
            className={styles.iconInformation1}
            alt=""
            src="../icon-error.svg"
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
            className={styles.iconInformation1}
            alt=""
            src="../icon-success.svg"
          />
        </div>
      </div>
      {isPopupProducerArtistOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupProducerArtist}
        >
          <PopupProducerArtist onClose={closePopupProducerArtist} />
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
          <TooltipError onClose={closeTooltipErrorPopup} />
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
          <TooltipSuccess onClose={closeTooltipSuccessPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Components;
