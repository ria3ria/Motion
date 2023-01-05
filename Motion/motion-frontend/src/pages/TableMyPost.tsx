import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupUploadProfilePhoto from "../components/PopupUploadProfilePhoto";
import PortalPopup from "../components/PortalPopup";
import styles from "./TableMyPost.module.css";

const TableMyPost: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isPopupUploadProfilePhotoOpen, setPopupUploadProfilePhotoOpen] =
    useState(false);
  const [isPopupUploadProfilePhoto1Open, setPopupUploadProfilePhoto1Open] =
    useState(false);

  const onButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onGotoTableArtistButtonClick = useCallback(() => {
    navigate("/table-artist");
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
      <div className={styles.tableMyPost} data-animate-on-scroll>
        <div className={styles.contents}>
          <div className={styles.navigation}>
            <div className={styles.title}>
              <button className={styles.button} onClick={onButtonClick}>
                <p className={styles.p}>
                  <span className={styles.span}>모</span>
                  <span className={styles.span1}>두의 오디</span>
                  <span className={styles.span}>션</span>
                  <span className={styles.span1}>,</span>
                </p>
                <p className={styles.p1}>
                  <span className={styles.span1}>모션</span>
                </p>
              </button>
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
              <button
                className={styles.gotoTableArtistButton}
                onClick={onGotoTableArtistButtonClick}
              >
                <div className={styles.div}>지원자 관리</div>
              </button>
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
                    <div className={styles.captionText}>지원자</div>
                    <img className={styles.icon} alt="" src="../icon3.svg" />
                  </div>
                </div>
                <div className={styles.column2}>
                  <div className={styles.select1}>
                    <div className={styles.captionText}>제목</div>
                    <img className={styles.icon} alt="" src="../icon3.svg" />
                  </div>
                </div>
                <div className={styles.column3}>
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
                    <div className={styles.bodyText1}>22/12/15</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText2}>999 명</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText3}
                      onClick={openPopupUploadProfilePhoto}
                    >
                      사극 드라마 “홍길동” 에서 5~8살 여자 아역 배우를
                      구합니다!! (조연)
                    </div>
                  </div>
                  <div className={styles.column9}>
                    <div className={styles.bodyText2}>
                      성별: 여자, 나이: 5~8살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText5}>22/12/25</div>
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
              <div className={styles.rows}>
                <div className={styles.row}>
                  <div className={styles.column6}>
                    <div className={styles.bodyText1}>22/12/15</div>
                  </div>
                  <div className={styles.column7}>
                    <div className={styles.bodyText2}>0 명</div>
                  </div>
                  <div className={styles.column8}>
                    <div
                      className={styles.bodyText3}
                      onClick={openPopupUploadProfilePhoto1}
                    >
                      코미디 드라마에 출연하실 배우를 구합니다 (행인1~행인3)
                    </div>
                  </div>
                  <div className={styles.column9}>
                    <div className={styles.bodyText2}>
                      성별: 무관, 나이: 19~29살
                    </div>
                  </div>
                  <div className={styles.column10}>
                    <div className={styles.bodyText5}>22/12/25</div>
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
    </>
  );
};

export default TableMyPost;
