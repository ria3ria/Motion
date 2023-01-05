import { FunctionComponent, useState, useRef, useCallback } from "react";
import { TextField, Icon } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PopupField from "../components/PopupField";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import PopupUploadProfilePhoto from "../components/PopupUploadProfilePhoto";
import styles from "./FormUpdateAudition.module.css";

const FormUpdateAudition: FunctionComponent = () => {
  const [datePickerDateTimePickerValue, setDatePickerDateTimePickerValue] =
    useState<string | null>(null);
  const mediaStrip02Ref = useRef<HTMLButtonElement>(null);
  const [isPopupFieldOpen, setPopupFieldOpen] = useState(false);
  const navigate = useNavigate();
  const [isPopupUploadProfilePhotoOpen, setPopupUploadProfilePhotoOpen] =
    useState(false);
  const [isPopupUploadProfilePhoto1Open, setPopupUploadProfilePhoto1Open] =
    useState(false);
  const [isPopupUploadProfilePhoto2Open, setPopupUploadProfilePhoto2Open] =
    useState(false);

  const openPopupField = useCallback(() => {
    setPopupFieldOpen(true);
  }, []);

  const closePopupField = useCallback(() => {
    setPopupFieldOpen(false);
  }, []);

  const onGotoAuditionTableButtonClick = useCallback(() => {
    navigate("/table-audition");
  }, [navigate]);

  const onButtonClick = useCallback(() => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        <div className={styles.formUpdateAudition}>
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
            지도 API 오디션장 위치 위도/경도 @수정완료버튼
          </div>
          <div className={styles.line} />
          <div className={styles.div2}>오디션장 위치 (선택)</div>
          <div className={styles.checkBox}>
            <div className={styles.checkBoxActive}>
              <div className={styles.rectangle} />
              <img className={styles.vectorIcon} alt="" src="../vector.svg" />
            </div>
            <div className={styles.url}>자기소개/지원 동영상 URL 필수</div>
          </div>
          <div className={styles.datePicker}>
            <DatePicker
              label="공고 마감일"
              value={datePickerDateTimePickerValue}
              onChange={(newValue: any) => {
                setDatePickerDateTimePickerValue(newValue);
              }}
              components={{
                OpenPickerIcon: () => <Icon>calendar_today_sharp</Icon>,
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  color="primary"
                  variant="outlined"
                  size="medium"
                  renderInput={{ placeholder: "17/12/2022" }}
                  helperText=""
                />
              )}
            />
          </div>
          <div className={styles.div3}>
            <div className={styles.board1} />
            <input
              className={styles.input1}
              type="text"
              placeholder="나이 입력"
              maxLength={30}
            />
            <b className={styles.b}>~</b>
            <div className={styles.board2} />
            <input
              className={styles.input2}
              type="text"
              placeholder="나이 입력"
              maxLength={30}
            />
            <div className={styles.div4}>체중 (선택)</div>
          </div>
          <div className={styles.div5}>
            <div className={styles.board1} />
            <input
              className={styles.input1}
              type="text"
              placeholder="나이 입력"
              maxLength={30}
            />
            <b className={styles.b}>~</b>
            <div className={styles.board2} />
            <input
              className={styles.input2}
              type="text"
              placeholder="나이 입력"
              maxLength={30}
            />
            <div className={styles.div4}>신장 (선택)</div>
          </div>
          <div className={styles.div7}>
            <div className={styles.board5} />
            <input
              className={styles.input5}
              type="text"
              placeholder="제목 입력"
              maxLength={100}
            />
            <div className={styles.div8}>제목</div>
          </div>
          <div className={styles.div9}>
            <button
              className={styles.mediaStrip02}
              ref={mediaStrip02Ref}
              onClick={openPopupField}
            >
              <img className={styles.icon} alt="" src="../icon11.svg" />
            </button>
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
          <div className={styles.div13}>
            <button
              className={styles.femaleButton}
              onClick={openPopupUploadProfilePhoto}
            >
              <div className={styles.div11}>여</div>
            </button>
            <button
              className={styles.maleButton}
              onClick={openPopupUploadProfilePhoto1}
            >
              <div className={styles.div15}>남</div>
            </button>
            <div className={styles.div4}>성별 (선택)</div>
          </div>
          <div className={styles.div17}>
            <div className={styles.board6} />
            <input
              className={styles.input6}
              type="text"
              placeholder="나이 입력"
              maxLength={30}
            />
            <b className={styles.b2}>~</b>
            <div className={styles.board7} />
            <input
              className={styles.input7}
              type="text"
              placeholder="나이 입력"
              maxLength={30}
            />
            <div className={styles.div4}>만 나이 (선택)</div>
          </div>
          <div className={styles.div19}>
            <button
              className={styles.countryButton}
              onClick={openPopupUploadProfilePhoto2}
            >
              <div className={styles.div11}>대한민국</div>
            </button>
            <div className={styles.div21}>국적 (선택)</div>
          </div>
        </div>
        {isPopupFieldOpen && (
          <PortalPopup
            placement="Bottom left"
            left={-5}
            bottom={15}
            relativeLayerRef={mediaStrip02Ref}
            onOutsideClick={closePopupField}
          >
            <PopupField onClose={closePopupField} />
          </PortalPopup>
        )}
        {isPopupUploadProfilePhotoOpen && (
          <PortalPopup
            overlayColor="rgba(0, 0, 0, 0.3)"
            placement="Centered"
            onOutsideClick={closePopupUploadProfilePhoto}
          >
            <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto} />
          </PortalPopup>
        )}
        {isPopupUploadProfilePhoto1Open && (
          <PortalPopup
            overlayColor="rgba(0, 0, 0, 0.3)"
            placement="Centered"
            onOutsideClick={closePopupUploadProfilePhoto1}
          >
            <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto1} />
          </PortalPopup>
        )}
        {isPopupUploadProfilePhoto2Open && (
          <PortalPopup
            overlayColor="rgba(0, 0, 0, 0.3)"
            placement="Centered"
            onOutsideClick={closePopupUploadProfilePhoto2}
          >
            <PopupUploadProfilePhoto onClose={closePopupUploadProfilePhoto2} />
          </PortalPopup>
        )}
      </>
    </LocalizationProvider>
  );
};

export default FormUpdateAudition;
