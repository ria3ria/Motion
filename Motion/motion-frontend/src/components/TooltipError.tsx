import { FunctionComponent } from "react";
import styles from "./TooltipError.module.css";

type TooltipErrorType = {
  onClose?: () => void;
  message?: string;
};

const TooltipError: FunctionComponent<TooltipErrorType> = ({ onClose, message="init message" }) => {
  return (
    <div className={styles.tooltipError}>
      <div className={styles.content}>
        <div className={styles.text}>{message}</div>
      </div>
      <div className={styles.arrow}>
        <img className={styles.arrowChild} alt="" src="../vector-1.svg" />
      </div>
    </div>
  );
};

export default TooltipError;
