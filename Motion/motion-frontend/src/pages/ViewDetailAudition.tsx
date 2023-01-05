import { FunctionComponent, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PopupProfile from "../components/PopupProfile";
import PortalPopup from "../components/PortalPopup";
import styles from "./ViewDetailAudition.module.css";

const ViewDetailAudition: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isPopupProfileOpen, setPopupProfileOpen] = useState(false);

  const onGotoAuditionTableButtonClick = useCallback(() => {
    navigate("/table-audition");
  }, [navigate]);

  const openPopupProfile = useCallback(() => {
    setPopupProfileOpen(true);
  }, []);

  const closePopupProfile = useCallback(() => {
    setPopupProfileOpen(false);
  }, []);

  const onButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div className={styles.viewDetailAudition}>
        <div className={styles.div}>
          <div className={styles.board} />
          <input
            className={styles.input}
            type="text"
            placeholder="내용입력"
            maxLength={10000}
          />
          <div className={styles.div1}>내용</div>
        </div>
        <div className={styles.api}>
          지도 API 오디션장 위치 위도/경도 @확인/수정/삭제 버튼
        </div>
        <div className={styles.line} />
        <div className={styles.div2}>오디션장 위치 안내</div>
        <div className={styles.url}>* 자기소개/지원 동영상 URL 필수</div>
        <div className={styles.div3}>
          <div className={styles.board1} />
          <input
            className={styles.input1}
            type="text"
            placeholder="제목 입력"
            maxLength={100}
          />
          <div className={styles.div4}>공고 마감일</div>
        </div>
        <div className={styles.div5}>
          <div className={styles.board2} />
          <input
            className={styles.input2}
            type="text"
            placeholder="제목 입력"
            maxLength={100}
          />
          <div className={styles.div6}>제목</div>
        </div>
        <div className={styles.div7}>
          <div className={styles.board3} />
          <input
            className={styles.cm1921kgContainer}
            type="text"
            placeholder="제목 입력"
            maxLength={100}
          >
            <p className={styles.p}>나이: 5~8살</p>
            <p className={styles.p}>성별: 여자</p>
            <p className={styles.p}>국적: 대한민국</p>
            <p className={styles.p}>신장: 110~120cm</p>
            <p className={styles.kg}>체중: 19~21kg</p>
          </input>
          <div className={styles.div8}>공고 대상</div>
        </div>
        <div className={styles.div9}>
          <img
            className={styles.mediaStrip02Icon}
            alt=""
            src="../mediastrip02.svg"
          />
          <div className={styles.div10}>분야</div>
        </div>
        <div className={styles.line1} />
        <button className={styles.backButton}>
          <div className={styles.div11}>뒤로</div>
        </button>
        <button
          className={styles.gotoAuditionTableButton}
          onClick={onGotoAuditionTableButtonClick}
        >
          <div className={styles.div11}>목록</div>
        </button>
        <button className={styles.nextButton}>
          <div className={styles.div11}>다음 글</div>
        </button>
        <button className={styles.prevButton}>
          <div className={styles.div11}>이전 글</div>
        </button>
        <button className={styles.applyButton} onClick={openPopupProfile}>
          <div className={styles.div11}>지원하기</div>
        </button>
        <button className={styles.button} onClick={onButtonClick}>
          <p className={styles.p}>
            <span className={styles.span}>모</span>
            <span className={styles.span1}>두의 오디</span>
            <span className={styles.span}>션</span>
            <span className={styles.span1}>,</span>
          </p>
          <p className={styles.kg}>
            <span className={styles.span1}>모션</span>
          </p>
        </button>
      </div>
      {isPopupProfileOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupProfile}
        >
          <PopupProfile onClose={closePopupProfile} />
        </PortalPopup>
      )}
    </>
  );
};

export default ViewDetailAudition;
