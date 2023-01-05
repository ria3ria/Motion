import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopupSendSMS.module.css";

type PopupSendSMSType = {
  onClose?: () => void;
};

const PopupSendSMS: FunctionComponent<PopupSendSMSType> = ({ onClose }) => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.popupSendSms}>
      <button className={styles.sendSmsButton}>
        <div className={styles.div}>메시지 전송</div>
      </button>
      <div className={styles.div1}>
        <div className={styles.board} />
        <input
          className={styles.input}
          type="text"
          placeholder="내용입력"
          maxLength={10000}
        />
        <div className={styles.div2}>불합격 문구</div>
      </div>
      <div className={styles.div3}>
        <div className={styles.board} />
        <input
          className={styles.input}
          type="text"
          placeholder="내용입력"
          maxLength={10000}
        />
        <div className={styles.div2}>합격 문구</div>
      </div>
      <div className={styles.div5}>%이름% 은 지원자 이름으로 치환됩니다.</div>
      <div className={styles.line} />
      <button className={styles.backButton}>
        <div className={styles.div}>뒤로</div>
      </button>
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
  );
};

export default PopupSendSMS;
