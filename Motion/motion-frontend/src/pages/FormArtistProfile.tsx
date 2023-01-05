import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FormArtistProfile.module.css";

const FormArtistProfile: FunctionComponent = () => {
  const navigate = useNavigate();

  const onGuideProfileClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButtonAuditionClick = useCallback(() => {
    navigate("/table-audition");
  }, [navigate]);

  const onTextButtonCorverContainerClick = useCallback(() => {
    navigate("/");
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
    <div className={styles.formArtistProfile}>
      <div className={styles.right}>
        <div className={styles.title}>
          <b className={styles.title1} data-animate-on-scroll>
            아티스트 프로필
          </b>
          <div className={styles.subtitle1}>
            <div className={styles.textbuttonFormHelp}>
              <b className={styles.resetProfile} data-animate-on-scroll>
                프로필 초기화
              </b>
            </div>
          </div>
          <div className={styles.subtitle2}>
            <div className={styles.textbuttonFormHelp}>
              <b
                className={styles.guideProfile}
                onClick={onGuideProfileClick}
                data-animate-on-scroll
              >
                아티스트 프로필이란?
              </b>
            </div>
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputPhonenumber}>
              <div className={styles.description}>
                <label
                  className={styles.label}
                  htmlFor="phoneNumber"
                  data-animate-on-scroll
                >
                  전화번호 (+82)
                </label>
              </div>
              <div className={styles.board}>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="- (하이픈) 제외 입력"
                  maxLength={20}
                  id="phoneNumber"
                  tabIndex={1}
                  name="phoneNumber"
                  data-animate-on-scroll
                />
              </div>
            </div>
            <div className={styles.inputDigitcode}>
              <div className={styles.description}>
                <label
                  className={styles.label}
                  htmlFor="digitCode"
                  data-animate-on-scroll
                >
                  인증번호
                </label>
              </div>
              <div className={styles.board}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="인증번호 입력"
                  maxLength={6}
                  id="digitCode"
                  tabIndex={2}
                  name="digitCode"
                  data-animate-on-scroll
                />
              </div>
            </div>
            <button className={styles.buttonSendSms}>
              <div className={styles.text}>인증번호 받기</div>
            </button>
          </div>
          <div className={styles.row1}>
            <div className={styles.inputBirthyear}>
              <div className={styles.description}>
                <label
                  className={styles.label}
                  htmlFor="birthYear"
                  data-animate-on-scroll
                >
                  생년
                </label>
              </div>
              <div className={styles.board2}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="ex) 2003"
                  maxLength={20}
                  id="birthYear"
                  tabIndex={3}
                  name="birthYear"
                  data-animate-on-scroll
                />
              </div>
            </div>
            <div className={styles.inputBirthyear}>
              <div className={styles.description}>
                <label
                  className={styles.label}
                  htmlFor="height"
                  data-animate-on-scroll
                >
                  신장 (cm)
                </label>
              </div>
              <div className={styles.board2}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="ex) 179"
                  maxLength={20}
                  id="height"
                  tabIndex={4}
                  name="height"
                  data-animate-on-scroll
                />
              </div>
            </div>
            <div className={styles.inputBirthyear}>
              <div className={styles.description}>
                <label
                  className={styles.label}
                  htmlFor="weight"
                  data-animate-on-scroll
                >
                  체중 (kg)
                </label>
              </div>
              <div className={styles.board2}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="ex) 80"
                  maxLength={20}
                  id="weight"
                  tabIndex={5}
                  name="weight"
                  data-animate-on-scroll
                />
              </div>
            </div>
            <div className={styles.buttonSelectMultiple}>
              <div className={styles.description}>
                <b className={styles.text1} data-animate-on-scroll>
                  성별
                </b>
              </div>
              <div className={styles.button}>
                <button className={styles.buttonMale}>
                  <div className={styles.text2} data-animate-on-scroll>
                    남
                  </div>
                </button>
                <button className={styles.buttonFemale}>
                  <div className={styles.text2} data-animate-on-scroll>
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
          </div>
          <div className={styles.row}>
            <div className={styles.inputSns}>
              <div className={styles.description}>
                <label
                  className={styles.label}
                  htmlFor="sns"
                  data-animate-on-scroll
                >
                  SNS (선택)
                </label>
              </div>
              <div className={styles.board2}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="SNS 아이디/주소 입력 (선택)"
                  maxLength={50}
                  id="sns"
                  tabIndex={6}
                  name="sns"
                  data-animate-on-scroll
                />
              </div>
            </div>
            <div className={styles.buttonSelect}>
              <b className={styles.text1} data-animate-on-scroll>
                국적
              </b>
              <input
                className={styles.inputHiddenCountry}
                type="text"
                name="country"
                data-animate-on-scroll
              />
              <button className={styles.buttonCountry} type="button">
                <div className={styles.text2} data-animate-on-scroll>
                  국적
                </div>
              </button>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputUrl}>
              <div className={styles.description}>
                <label
                  className={styles.label}
                  htmlFor="url"
                  data-animate-on-scroll
                >
                  동영상 URL (선택)
                </label>
              </div>
              <div className={styles.board}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="자기소개/지원 동영상 URL 입력 (선택)"
                  maxLength={50}
                  id="url"
                  tabIndex={7}
                  name="url"
                  data-animate-on-scroll
                />
              </div>
            </div>
            <button className={styles.buttonSendSms}>
              <div className={styles.text}>사진 첨부</div>
            </button>
          </div>
          <button
            className={styles.buttonAudition}
            onClick={onButtonAuditionClick}
          >
            <b className={styles.text7}>완료</b>
          </button>
        </form>
      </div>
      <img
        className={styles.artistprofileFormImage1Icon}
        alt=""
        src="../artistprofile-form-image-1@2x.png"
      />
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
  );
};

export default FormArtistProfile;
