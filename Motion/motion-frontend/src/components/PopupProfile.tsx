import { FunctionComponent, useState, useCallback, useEffect } from "react";
import PopupUploadProfilePhoto from "../components/PopupUploadProfilePhoto";
import PortalPopup from "../components/PortalPopup";
import styles from "./PopupProfile.module.css";

type PopupProfileType = {
  onClose?: () => void;
};

const PopupProfile: FunctionComponent<PopupProfileType> = ({ onClose }) => {
  const [isPopupUploadProfilePhotoOpen, setPopupUploadProfilePhotoOpen] =
    useState(false);
  const [isPopupUploadProfilePhoto1Open, setPopupUploadProfilePhoto1Open] =
    useState(false);
  const [isPopupUploadProfilePhoto2Open, setPopupUploadProfilePhoto2Open] =
    useState(false);
  const [isPopupUploadProfilePhoto3Open, setPopupUploadProfilePhoto3Open] =
    useState(false);

  const openPopupUploadProfilePhoto = useCallback(() => {
    setPopupUploadProfilePhotoOpen(true);
  }, []);

  const closePopupUploadProfilePhoto = useCallback(() => {
    setPopupUploadProfilePhotoOpen(false);
  }, []);

  const openPopupUploadProfilePhoto1 = useCallback(() => {
    setPopupUploadProfilePhoto1Open(true);
  }, []);

  const closePopupUploadProfilePhoto1 = useCallback(() => {
    setPopupUploadProfilePhoto1Open(false);
  }, []);

  const openPopupUploadProfilePhoto2 = useCallback(() => {
    setPopupUploadProfilePhoto2Open(true);
  }, []);

  const closePopupUploadProfilePhoto2 = useCallback(() => {
    setPopupUploadProfilePhoto2Open(false);
  }, []);

  const openPopupUploadProfilePhoto3 = useCallback(() => {
    setPopupUploadProfilePhoto3Open(true);
  }, []);

  const closePopupUploadProfilePhoto3 = useCallback(() => {
    setPopupUploadProfilePhoto3Open(false);
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
      <div className={styles.popupProfile}>
        <button className={styles.gotoAuditionTableButton} onClick={onClose}>
          <div className={styles.div}>완료</div>
        </button>
        <button
          className={styles.uploadPhotoButton}
          onClick={openPopupUploadProfilePhoto}
        >
          <div className={styles.div1}>사진 첨부</div>
        </button>
        <div className={styles.url}>
          <div className={styles.board} />
          <input
            className={styles.url1}
            type="tel"
            placeholder="자기소개/지원 동영상 URL 입력 (선택)"
            maxLength={100}
            data-animate-on-scroll
          />
          <b className={styles.b} data-animate-on-scroll>
            동영상 URL (선택)
          </b>
        </div>
        <button
          className={styles.countryButton}
          onClick={openPopupUploadProfilePhoto1}
        >
          <div className={styles.div1}>대한민국</div>
        </button>
        <div className={styles.sns}>
          <div className={styles.board1} />
          <input
            className={styles.sns1}
            type="tel"
            placeholder="SNS 아이디/주소 입력 (선택)"
            maxLength={100}
            data-animate-on-scroll
          />
          <b className={styles.b} data-animate-on-scroll>
            SNS 아이디 (선택)
          </b>
        </div>
        <div className={styles.div3}>
          <button
            className={styles.femaleButton}
            onClick={openPopupUploadProfilePhoto2}
          >
            <div className={styles.div4}>여</div>
          </button>
          <button
            className={styles.maleButton}
            onClick={openPopupUploadProfilePhoto3}
          >
            <div className={styles.div4}>남</div>
          </button>
          <b className={styles.b} data-animate-on-scroll>
            성별
          </b>
        </div>
        <div className={styles.div6}>
          <div className={styles.board2} />
          <input
            className={styles.ex80}
            type="tel"
            placeholder="ex) 80kg"
            maxLength={5}
            data-animate-on-scroll
          />
          <b className={styles.b} data-animate-on-scroll>
            체중 (kg)
          </b>
        </div>
        <div className={styles.div7}>
          <div className={styles.board3} />
          <input
            className={styles.ex179}
            type="tel"
            placeholder="ex) 179cm"
            maxLength={5}
            data-animate-on-scroll
          />
          <b className={styles.b} data-animate-on-scroll>
            신장 (cm)
          </b>
        </div>
        <div className={styles.div8}>
          <div className={styles.board4} />
          <input
            className={styles.input}
            type="tel"
            placeholder="ex) 2003년"
            maxLength={5}
            data-animate-on-scroll
          />
          <b className={styles.b} data-animate-on-scroll>
            생년
          </b>
        </div>
        <div className={styles.div9}>
          <div className={styles.board5} />
          <input
            className={styles.input1}
            type="text"
            placeholder="인증번호 입력"
            maxLength={6}
            data-animate-on-scroll
          />
          <b className={styles.b} data-animate-on-scroll>
            인증번호
          </b>
          <button className={styles.sendVerifyButton}>
            <div className={styles.div1}>인증번호 받기</div>
          </button>
        </div>
        <div className={styles.div11}>
          <div className={styles.board6} />
          <input
            className={styles.input2}
            type="tel"
            placeholder="- (하이픈) 제외 입력"
            maxLength={20}
            data-animate-on-scroll
          />
          <b className={styles.b} data-animate-on-scroll>
            전화번호 (+82)
          </b>
        </div>
        <b className={styles.b4} data-animate-on-scroll>
          지원 프로필
        </b>
      </div>
      {isPopupUploadProfilePhotoOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto1Open && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto1}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto1} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto2Open && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto2}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto2} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto3Open && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto3}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto3} />
        </PortalPopup>
      )}
    </>
  );
};

export default PopupProfile;
