import {
  FunctionComponent,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import PopupField from "../components/PopupField";
import PortalPopup from "../components/PortalPopup";
import styles from "./FormWriteAudition.module.css";

const FormWriteAudition: FunctionComponent = () => {
  const navigate = useNavigate();
  const iconGrid01Ref = useRef<HTMLButtonElement>(null);
  const [isPopupFieldOpen, setPopupFieldOpen] = useState(false);

  const onTextButtonCorverContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButtonAuditionClick = useCallback(() => {
    navigate("/table-audition");
  }, [navigate]);

  const openPopupField = useCallback(() => {
    setPopupFieldOpen(true);
  }, []);

  const closePopupField = useCallback(() => {
    setPopupFieldOpen(false);
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
      <div className={styles.formWriteAudition}>
        <div className={styles.title}>
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
          <div className={styles.space} />
          <button
            className={styles.buttonAudition}
            onClick={onButtonAuditionClick}
          >
            <div className={styles.text}>목록</div>
          </button>
          <button className={styles.buttonAudition}>
            <div className={styles.text}>뒤로</div>
          </button>
        </div>
        <div className={styles.line} />
        <div className={styles.row}>
          <div className={styles.field}>
            <div className={styles.title1}>분야</div>
            <button
              className={styles.iconGrid01}
              ref={iconGrid01Ref}
              onClick={openPopupField}
            >
              <img
                className={styles.iconGrid011}
                alt=""
                src="../icon-grid01.svg"
              />
            </button>
          </div>
          <div className={styles.inputRange}>
            <label
              className={styles.label}
              htmlFor="ageMin"
              data-animate-on-scroll
            >
              만 나이 (선택)
            </label>
            <div className={styles.board}>
              <div className={styles.column}>
                <input
                  className={styles.inputAgemin}
                  type="text"
                  placeholder="19"
                  maxLength={2}
                  id="ageMin"
                  tabIndex={0}
                  name="ageMin"
                  data-animate-on-scroll
                />
              </div>
              <b className={styles.text2}>~</b>
              <div className={styles.column}>
                <input
                  className={styles.inputAgemin}
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
          <div className={styles.inputRange}>
            <div className={styles.description}>
              <div className={styles.text3} data-animate-on-scroll>
                성별 (선택)
              </div>
            </div>
            <div className={styles.button}>
              <button className={styles.buttonMale} type="button">
                <div className={styles.text4} data-animate-on-scroll>
                  남
                </div>
              </button>
              <button className={styles.buttonMale} type="button">
                <div className={styles.text4} data-animate-on-scroll>
                  여
                </div>
              </button>
              <input
                className={styles.inputHiddenGender}
                type="text"
                name="gender"
                data-animate-on-scroll
              />
            </div>
          </div>
          <div className={styles.inputRange}>
            <div className={styles.text3} data-animate-on-scroll>
              국적 (선택)
            </div>
            <input
              className={styles.inputHiddenCountry}
              type="text"
              name="country"
              data-animate-on-scroll
            />
            <button className={styles.buttonMale} type="button">
              <div className={styles.text4} data-animate-on-scroll>
                국적
              </div>
            </button>
          </div>
          <div className={styles.input}>
            <div className={styles.description}>
              <label
                className={styles.label}
                htmlFor="title"
                data-animate-on-scroll
              >
                제목
              </label>
            </div>
            <div className={styles.board1}>
              <input
                className={styles.inputTitle}
                type="text"
                placeholder="제목 입력"
                maxLength={50}
                id="title"
                tabIndex={3}
                name="title"
                data-animate-on-scroll
              />
            </div>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.inputRange}>
            <label
              className={styles.label}
              htmlFor="heightMin"
              data-animate-on-scroll
            >
              신장 (선택)
            </label>
            <div className={styles.board}>
              <div className={styles.column2}>
                <input
                  className={styles.inputHeightmin}
                  type="text"
                  placeholder="160"
                  maxLength={3}
                  id="heightMin"
                  tabIndex={4}
                  name="heightMin"
                  data-animate-on-scroll
                />
              </div>
              <b className={styles.text2}>~</b>
              <div className={styles.column2}>
                <input
                  className={styles.inputHeightmin}
                  type="text"
                  placeholder="190"
                  maxLength={3}
                  id="heightMax"
                  tabIndex={5}
                  name="heightMax"
                  data-animate-on-scroll
                />
              </div>
            </div>
          </div>
          <div className={styles.inputRange}>
            <label
              className={styles.label}
              htmlFor="weightMin"
              data-animate-on-scroll
            >
              체중 (선택)
            </label>
            <div className={styles.board}>
              <div className={styles.column2}>
                <input
                  className={styles.inputHeightmin}
                  type="text"
                  placeholder="160"
                  maxLength={2}
                  id="heightMin"
                  tabIndex={4}
                  name="heightMin"
                  data-animate-on-scroll
                />
              </div>
              <b className={styles.text2}>~</b>
              <div className={styles.column2}>
                <input
                  className={styles.inputHeightmin}
                  type="text"
                  placeholder="190"
                  maxLength={3}
                  id="heightMax"
                  tabIndex={5}
                  name="heightMax"
                  data-animate-on-scroll
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.checkBox}>
          <div className={styles.checkBoxActive}>
            <div className={styles.rectangle} />
            <img className={styles.vectorIcon} alt="" src="../vector.svg" />
          </div>
          <div className={styles.url}>자기소개/지원 동영상 URL 필수</div>
        </div>
      </div>
      {isPopupFieldOpen && (
        <PortalPopup
          placement="Bottom left"
          left={-2.5}
          bottom={10}
          relativeLayerRef={iconGrid01Ref}
          onOutsideClick={closePopupField}
        >
          <PopupField onClose={closePopupField} />
        </PortalPopup>
      )}
    </>
  );
};

export default FormWriteAudition;
