import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopupRegisterSuccess.module.css";

type PopupRegisterSuccessType = {
  onClose?: () => void;
};

const PopupRegisterSuccess: FunctionComponent<PopupRegisterSuccessType> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const onFrameContainerClick = useCallback(() => {
    navigate("/form-login");
  }, [navigate]);

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
    <div className={styles.popupRegisterSuccess}>
      <img
        className={styles.registerSuccessImage1Icon}
        alt=""
        src="../registersuccess-image-1@2x.png"
      />
      <div className={styles.titleWrapper} onClick={onFrameContainerClick}>
        <b className={styles.title} data-animate-on-scroll>
          환영합니다
        </b>
      </div>
    </div>
  );
};

export default PopupRegisterSuccess;
