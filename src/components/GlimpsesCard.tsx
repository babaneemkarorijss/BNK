import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  items: string[];
  buttonText: string;
  buttonLink: string;
}

export default function GlimpsesCard({ title, description, items, buttonText, buttonLink }: Props) {
  return (
    <div className="glimpses-card">
      <div className="glimpses-card__border"></div>
      <div className="glimpses-card_title__container">
        <span className="glimpses-card_title">{title}</span>
        <p className="glimpses-card_paragraph">{description}</p>
      </div>
      <hr className="glimpses-line" />
      <ul className="glimpses-card__list">
        {items.map((item, i) => (
          <li key={i} className="glimpses-card__list_item">
            <span className="glimpses-check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="glimpses-check_svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="glimpses-list_text">{item}</span>
          </li>
        ))}
      </ul>
      <Link href={buttonLink} className="glimpses-button text-center">
        {buttonText}
      </Link>
    </div>
  );
}
