import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopupProducerArtist.module.css";

type PopupProducerArtistType = {
  onClose?: () => void;
};

const PopupProducerArtist: FunctionComponent<PopupProducerArtistType> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const onButtonStartProducerClick = useCallback(() => {
    navigate("/form-register");
  }, [navigate]);

  const onButtonStartArtistClick = useCallback(() => {
    navigate("/table-audition");
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
    <div className={styles.popupProducerArtist} data-animate-on-scroll>
      <div className={styles.producer}>
        <div className={styles.title}>
          <b className={styles.text} data-animate-on-scroll>
            제작자
          </b>
          <div className={styles.iconCamera01}>
            <img
              className={styles.iconCamera011}
              alt=""
              src="../icon-camera01@1x.png"
            />
          </div>
        </div>
        <b className={styles.subtitle} data-animate-on-scroll>
          <span className={styles.subtitleTxt}>
            <p className={styles.p}>
              <span className={styles.span}>아티스트</span>
              <span>를 찾고있는</span>
            </p>
            <p className={styles.p1}>
              <span>제작자/제작사/기획사</span>
            </p>
          </span>
        </b>
        <button
          className={styles.buttonStartProducer}
          type="button"
          onClick={onButtonStartProducerClick}
        >
          <b className={styles.text1}>시작하기</b>
        </button>
      </div>
      <div className={styles.artist}>
        <div className={styles.title}>
          <b className={styles.text} data-animate-on-scroll>
            아티스트
          </b>
          <div className={styles.iconUserProfile02}>
            <img
              className={styles.iconUserProfile021}
              alt=""
              src="../icon-userprofile02@1x.png"
            />
          </div>
        </div>
        <b className={styles.subtitle1} data-animate-on-scroll>
          <p className={styles.p}>
            <span className={styles.span}>오디션</span>
            <span>을 찾고있는</span>
          </p>
          <p className={styles.p1}>
            <span>아티스트</span>
          </p>
        </b>
        <button
          className={styles.buttonStartProducer}
          type="button"
          onClick={onButtonStartArtistClick}
        >
          <b className={styles.text1}>시작하기</b>
        </button>
      </div>
    </div>
  );
};

export default PopupProducerArtist;
