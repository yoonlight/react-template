import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const BackHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__back">
          <div className="header__link">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="header__icon"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BackHeader;
