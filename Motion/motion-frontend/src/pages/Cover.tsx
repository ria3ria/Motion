import { FunctionComponent, useState, useCallback, useEffect } from "react";
import PopupProducerArtist from "../components/PopupProducerArtist";
import PortalPopup from "../components/PortalPopup";
import styles from "./Cover.module.css";

const Cover: FunctionComponent = () => {
  const [isPopupProducerArtistOpen, setPopupProducerArtistOpen] =
    useState(false);

  const openPopupProducerArtist = useCallback(() => {
    setPopupProducerArtistOpen(true);
  }, []);

  const closePopupProducerArtist = useCallback(() => {
    setPopupProducerArtistOpen(false);
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
      <div className={styles.cover}>
        <div className={styles.main}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.title}>
                <b className={styles.title1} data-animate-on-scroll>
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
                <b className={styles.subtitle} data-animate-on-scroll>
                  꿈을 위해 움직이세요.
                </b>
              </div>
              <button
                className={styles.buttonStart}
                type="button"
                onClick={openPopupProducerArtist}
              >
                <b className={styles.text}>시작하기</b>
              </button>
            </div>
            <img
              className={styles.coverImage1Icon}
              alt=""
              src="../cover-image-1@1x.png"
            />
          </div>
          <button
            className={styles.iconDown}
            type="button"
            data-animate-on-scroll
          >
            <img
              className={styles.iconDown1}
              alt=""
              src="../icon-down@1x.png"
            />
          </button>
        </div>
      </div>
      {isPopupProducerArtistOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupProducerArtist}
        >
          <PopupProducerArtist onClose={closePopupProducerArtist} />
        </PortalPopup>
      )}
    </>
  );
};

export default Cover;
