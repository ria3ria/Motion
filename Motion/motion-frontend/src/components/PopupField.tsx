import { FunctionComponent, useEffect } from "react";
import styles from "./PopupField.module.css";

type PopupFieldType = {
  onClose?: () => void;
};

const PopupField: FunctionComponent<PopupFieldType> = ({ onClose }) => {
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
    <div className={styles.popupField} data-animate-on-scroll>
      <div className={styles.div}>
        <button className={styles.mediaStrip02} onClick={onClose}>
          <img className={styles.icon} alt="" src="../icon9.svg" />
        </button>
        <div className={styles.div1}>배우</div>
      </div>
      <div className={styles.div2}>
        <button className={styles.microphone02} onClick={onClose}>
          <img className={styles.icon1} alt="" src="../icon10.svg" />
        </button>
        <div className={styles.div1}>가수</div>
      </div>
    </div>
  );
};

export default PopupField;
