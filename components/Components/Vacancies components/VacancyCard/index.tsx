import "./style.scss";
import { BsFillBagFill, BsBookmark } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "../../../../i18n";
import Spinner from "../../Spinner";

export interface VacancyCardProps {
  title: string;
  companyName: string;
  salary?: number;
  city?: string;
  logoUrl?: string;
  companyID: string;
  id: string;
  shortDescr?: string;
  benefits?: Array<string>;
}
const VacancyCard: React.FC<VacancyCardProps> = ({
  title,
  companyName,
  salary,
  city = null,
  logoUrl = null,
  companyID,
  id,
  shortDescr = null,
  benefits = null,
}) => {
  return (
    <article className="vacancy__card">
      <Link href="#">
        <a>
          <div className="vacancy__card__body">
            <button type="button" className="btn__save btn__click">
              <BsBookmark />
            </button>
            <div className="card__body__top">
              <h2 className="vacancy__title">{title}</h2>
            </div>
            <div className="main__content">
              <div className="info">
                <h3 className="company__name card__p">
                  <BsFillBagFill className="vacancy__icon" />
                  <span>{companyName}</span>
                </h3>
                <p className="salary card__p">
                  <FaMoneyBill className="vacancy__icon" />
                  <span>{salary} грн</span>
                </p>
                <p className="location card__p">
                  <MdLocationOn className="vacancy__icon" />
                  <span>{city}</span>
                </p>
              </div>
              <div className="copmany__logo">
                <Link href="#">
                  <a title={companyName}>
                    <LazyLoadImage
                      alt={companyName}
                      src={logoUrl}
                      effect="blur"
                      placeholderSrc="https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-6.jpg"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="short__description">
              <p>
                {shortDescr}
                <span className="dots">...</span>
              </p>
            </div>
            <div className="benefits">
              {benefits?.map((item) => (
                <span key={Math.random()} className="benefit__item">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
};
export default VacancyCard;
