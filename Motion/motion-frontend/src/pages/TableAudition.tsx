import {
  FunctionComponent,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import PopupUploadProfilePhoto from "../components/PopupUploadProfilePhoto";
import PortalPopup from "../components/PortalPopup";
import PopupMenu from "../components/PopupMenu";
import styles from "./TableAudition.module.css";

const TableAudition: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isPopupUploadProfilePhotoOpen, setPopupUploadProfilePhotoOpen] =
    useState(false);
  const [isPopupUploadProfilePhoto1Open, setPopupUploadProfilePhoto1Open] =
    useState(false);
  const [isPopupUploadProfilePhoto2Open, setPopupUploadProfilePhoto2Open] =
    useState(false);
  const [isPopupUploadProfilePhoto3Open, setPopupUploadProfilePhoto3Open] =
    useState(false);
  const [isPopupUploadProfilePhoto4Open, setPopupUploadProfilePhoto4Open] =
    useState(false);
  const [isPopupUploadProfilePhoto5Open, setPopupUploadProfilePhoto5Open] =
    useState(false);
  const [isPopupUploadProfilePhoto6Open, setPopupUploadProfilePhoto6Open] =
    useState(false);
  const [isPopupUploadProfilePhoto7Open, setPopupUploadProfilePhoto7Open] =
    useState(false);
  const [isPopupUploadProfilePhoto8Open, setPopupUploadProfilePhoto8Open] =
    useState(false);
  const [isPopupUploadProfilePhoto9Open, setPopupUploadProfilePhoto9Open] =
    useState(false);
  const iconMenu01Ref = useRef<HTMLButtonElement>(null);
  const [isPopupMenuOpen, setPopupMenuOpen] = useState(false);

  const onTextButtonCorverContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

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

  const openPopupUploadProfilePhoto4 = useCallback(() => {
    setPopupUploadProfilePhoto4Open(true);
  }, []);

  const closePopupUploadProfilePhoto4 = useCallback(() => {
    setPopupUploadProfilePhoto4Open(false);
  }, []);

  const openPopupUploadProfilePhoto5 = useCallback(() => {
    setPopupUploadProfilePhoto5Open(true);
  }, []);

  const closePopupUploadProfilePhoto5 = useCallback(() => {
    setPopupUploadProfilePhoto5Open(false);
  }, []);

  const openPopupUploadProfilePhoto6 = useCallback(() => {
    setPopupUploadProfilePhoto6Open(true);
  }, []);

  const closePopupUploadProfilePhoto6 = useCallback(() => {
    setPopupUploadProfilePhoto6Open(false);
  }, []);

  const openPopupUploadProfilePhoto7 = useCallback(() => {
    setPopupUploadProfilePhoto7Open(true);
  }, []);

  const closePopupUploadProfilePhoto7 = useCallback(() => {
    setPopupUploadProfilePhoto7Open(false);
  }, []);

  const openPopupUploadProfilePhoto8 = useCallback(() => {
    setPopupUploadProfilePhoto8Open(true);
  }, []);

  const closePopupUploadProfilePhoto8 = useCallback(() => {
    setPopupUploadProfilePhoto8Open(false);
  }, []);

  const openPopupUploadProfilePhoto9 = useCallback(() => {
    setPopupUploadProfilePhoto9Open(true);
  }, []);

  const closePopupUploadProfilePhoto9 = useCallback(() => {
    setPopupUploadProfilePhoto9Open(false);
  }, []);

  const openPopupMenu = useCallback(() => {
    setPopupMenuOpen(true);
  }, []);

  const closePopupMenu = useCallback(() => {
    setPopupMenuOpen(false);
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
      <div className={styles.tableAudition} data-animate-on-scroll>
        <div className={styles.contents}>
          <div className={styles.navigation}>
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
            </div>
            <div className={styles.tabs}>
              <div className={styles.line} />
              <div className={styles.buttons}>
                <div className={styles.tabButton}>
                  <div className={styles.contents1}>
                    <div className={styles.label}>전체</div>
                  </div>
                  <div className={styles.line1} />
                </div>
                <div className={styles.tabButton}>
                  <div className={styles.contents1}>
                    <div className={styles.label}>배우</div>
                  </div>
                </div>
                <div className={styles.tabButton}>
                  <div className={styles.contents1}>
                    <div className={styles.label}>가수</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.space}>
            <div className={styles.options}>
              <button className={styles.actionButton}>
                <img className={styles.icon} alt="" src="../icon.svg" />
                <div className={styles.label3}>검색</div>
              </button>
              <div className={styles.search}>
                <div className={styles.contents4}>
                  <img
                    className={styles.checkBoxActive}
                    alt=""
                    src="../icon1.svg"
                  />
                  <input
                    className={styles.fieldText}
                    type="text"
                    placeholder="Search"
                    maxLength={50}
                  />
                </div>
                <div className={styles.line2} />
              </div>
              <div className={styles.checkBox}>
                <div className={styles.checkBoxActive}>
                  <button className={styles.rectangle} />
                  <img
                    className={styles.vectorIcon}
                    alt=""
                    src="../vector.svg"
                  />
                </div>
                <div className={styles.bodyText}>마감된 공고 숨기기</div>
              </div>
              <div className={styles.checkBox}>
                <div className={styles.checkBoxActive1}>
                  <button className={styles.rectangle} />
                  <img
                    className={styles.vectorIcon1}
                    alt=""
                    src="../vector1.svg"
                  />
                </div>
                <div className={styles.bodyText}>내 조건에 맞는 공고만</div>
              </div>
            </div>
            <div className={styles.table}>
              <div className={styles.headers}>
                <div className={styles.column}>
                  <div className={styles.sort}>
                    <img className={styles.icon} alt="" src="../icon2.svg" />
                    <div className={styles.select}>
                      <div className={styles.captionText}>작성일</div>
                      <img className={styles.icon} alt="" src="../icon3.svg" />
                    </div>
                  </div>
                </div>
                <div className={styles.column1}>
                  <div className={styles.select1}>
                    <div className={styles.captionText}>작성자</div>
                    <img className={styles.icon} alt="" src="../icon3.svg" />
                  </div>
                </div>
                <div className={styles.column2}>
                  <div className={styles.select1}>
                    <div className={styles.captionText}>제목</div>
                    <img className={styles.icon} alt="" src="../icon3.svg" />
                  </div>
                </div>
                <div className={styles.column1}>
                  <div className={styles.select1}>
                    <div className={styles.captionText}>공고대상</div>
                    <img className={styles.icon} alt="" src="../icon3.svg" />
                  </div>
                </div>
                <div className={styles.column4}>
                  <div className={styles.select1}>
                    <div className={styles.captionText}>마감일</div>
                    <img className={styles.icon} alt="" src="../icon3.svg" />
                  </div>
                </div>
                <div className={styles.column5} />
              </div>
              <div className={styles.rows}>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/15</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>OO 제작사</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto}
                    >
                      사극 드라마 “홍길동” 에서 5~8살 여자 아역 배우를
                      구합니다!! (조연)
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 여자, 나이: 5~8살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>22/12/25</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto1}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto2}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto3}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto4}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto5}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto6}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto7}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto8}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText2}>22/12/18</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>김아무개</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText4}
                      onClick={openPopupUploadProfilePhoto9}
                    >
                      ㅁㅁ대학교 졸업작품 단편 영화에 출연하실 20대 남성 배우를
                      구합니다
                    </div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText3}>
                      성별: 남자, 나이: 24~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText3}>23/02/02</div>
                  </div>
                  <div className={styles.column11}>
                    <img
                      className={styles.iconButton}
                      alt=""
                      src="../icon-button.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.pagination}>
                <div className={styles.field}>
                  <div className={styles.select5}>
                    <div className={styles.subhead}>10줄</div>
                    <img className={styles.icon} alt="" src="../icon8.svg" />
                  </div>
                </div>
                <div className={styles.buttons1}>
                  <div className={styles.link}>
                    <div className={styles.subhead}>1</div>
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.subhead}>2</div>
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.subhead}>3</div>
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.subhead}>4</div>
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.subhead}>5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={styles.iconMenu01}
          ref={iconMenu01Ref}
          onClick={openPopupMenu}
        >
          <img className={styles.iconMenu011} alt="" src="../icon-menu01.svg" />
        </button>
      </div>
      {isPopupUploadProfilePhotoOpen && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto1Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto1}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto1} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto2Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto2}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto2} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto3Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto3}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto3} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto4Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto4}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto4} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto5Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto5}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto5} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto6Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto6}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto6} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto7Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto7}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto7} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto8Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto8}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto8} />
        </PortalPopup>
      )}
      {isPopupUploadProfilePhoto9Open && (
        <PortalPopup
          placement="Centered"
          onOutsideClick={closePopupUploadProfilePhoto9}
        >
          <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto9} />
        </PortalPopup>
      )}
      {isPopupMenuOpen && (
        <PortalPopup
          placement="Bottom right"
          right={5}
          bottom={25}
          relativeLayerRef={iconMenu01Ref}
          onOutsideClick={closePopupMenu}
        >
          <PopupMenu onClose={closePopupMenu} />
        </PortalPopup>
      )}
    </>
  );
};

export default TableAudition;
