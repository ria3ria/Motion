import { FunctionComponent } from "react";
import styles from "./TooltipSuccess.module.css";

type TooltipSuccessType = {
  onClose?: () => void;
  message?: string;
};

const TooltipSuccess: FunctionComponent<TooltipSuccessType> = ({ onClose, message="init message" }) => {
  return (
    <div className={styles.tooltipSuccess}>
      <div className={styles.content}>
        <div className={styles.text}>{message}</div>
      </div>
      <div className={styles.arrow}>
        <img className={styles.arrowChild} alt="" src="../vector-11.svg" />
      </div>
    </div>
  );
};

export default TooltipSuccess;
