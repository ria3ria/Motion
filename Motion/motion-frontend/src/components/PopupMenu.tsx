import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopupMenu.module.css";

type PopupMenuType = {
  onClose?: () => void;
};

const PopupMenu: FunctionComponent<PopupMenuType> = ({ onClose }) => {
  const navigate = useNavigate();

  const onIconUserProfile03ContainerClick = useCallback(() => {
    navigate("/form-userinfo");
  }, [navigate]);

  const onIconEdit02ContainerClick = useCallback(() => {
    navigate("/form-writeaudition");
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
    <div className={styles.popupMenu} data-animate-on-scroll>
      <div
        className={styles.iconUserProfile03}
        onClick={onIconUserProfile03ContainerClick}
      >
        <img
          className={styles.iconUserProfile031}
          alt=""
          src="../icon-userprofile03.svg"
        />
      </div>
      <div
        className={styles.iconUserProfile03}
        onClick={onIconEdit02ContainerClick}
      >
        <img
          className={styles.iconUserProfile031}
          alt=""
          src="../icon-edit02.svg"
        />
      </div>
    </div>
  );
};

export default PopupMenu;
