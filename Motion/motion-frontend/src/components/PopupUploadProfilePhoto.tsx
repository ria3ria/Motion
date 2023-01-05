import { FunctionComponent, useEffect } from "react";
import styles from "./PopupUploadProfilePhoto.module.css";

type PopupUploadProfilePhotoType = {
  onClose?: () => void;
};

const PopupUploadProfilePhoto: FunctionComponent<
  PopupUploadProfilePhotoType
> = ({ onClose }) => {
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
    <div className={styles.popupUploadProfilePhoto}>
      <div className={styles.title}>
        <div className={styles.title1} data-animate-on-scroll>
          프로필 사진 등록
        </div>
        <div className={styles.iconImageAvatar}>
          <img
            className={styles.iconImageAvatar1}
            alt=""
            src="../icon-imageavatar.svg"
          />
        </div>
      </div>
      <div className={styles.subtitle} data-animate-on-scroll>
        크기 1MB 이하, 길이 2000px 이하의 이미지 파일
      </div>
      <div className={styles.files}>
        <div className={styles.buttonUploadFile} data-animate-on-scroll>
          <img
            className={styles.iconImageAdd}
            alt=""
            src="../icon-imageadd.svg"
          />
        </div>
        <div className={styles.buttonUploadFile} data-animate-on-scroll>
          <img
            className={styles.iconImageAdd}
            alt=""
            src="../icon-imageadd.svg"
          />
        </div>
        <div className={styles.buttonUploadFile} data-animate-on-scroll>
          <img
            className={styles.iconImageAdd}
            alt=""
            src="../icon-imageadd.svg"
          />
        </div>
      </div>
      <button
        className={styles.buttonArtistProfile}
        type="button"
        onClick={onClose}
      >
        <b className={styles.text}>완료</b>
      </button>
    </div>
  );
};

export default PopupUploadProfilePhoto;
