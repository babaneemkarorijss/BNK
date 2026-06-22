import Link from 'next/link';

interface Props {
  slug: string;
  title: string;
  description: string;
}

export default function LeelaCard({ slug, title, description }: Props) {
  return (
    <div className="leela-parent">
      <div className="leela-card">
        {/* Logo with circles */}
        <div className="leela-logo">
          <span className="leela-circle leela-circle1"></span>
          <span className="leela-circle leela-circle2"></span>
          <span className="leela-circle leela-circle3"></span>
          <span className="leela-circle leela-circle4"></span>
          <span className="leela-circle leela-circle5">
            {/* Simple OM symbol in SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69" className="leela-svg">
              <path
                id="Path_6"
                data-name="Path 6"
                d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
                transform="translate(0 0)"
              />
              <path
                id="Path_7"
                data-name="Path 7"
                d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
                transform="translate(-45.91 0)"
              />
              <path
                id="Path_8"
                data-name="Path 8"
                d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
                transform="translate(0 -51.963)"
              />
            </svg>
          </span>
        </div>

        {/* Glass effect */}
        <div className="leela-glass"></div>

        {/* Content */}
        <div className="leela-content">
          <span className="leela-title">{title}</span>
          <span className="leela-text">{description}</span>
        </div>

        {/* Bottom: social buttons + view more */}
        <div className="leela-bottom">
          <div className="leela-social-buttons-container">
            <button className="leela-social-button" aria-label="Share">
              <svg viewBox="0 0 24 24" className="leela-svg">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
              </svg>
            </button>
            <button className="leela-social-button" aria-label="Like">
              <svg viewBox="0 0 24 24" className="leela-svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <button className="leela-social-button" aria-label="Bookmark">
              <svg viewBox="0 0 24 24" className="leela-svg">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </button>
          </div>
          <div className="leela-view-more">
            <Link href={`/stories/${slug}`} className="leela-view-more-button">
              View more
            </Link>
            <svg className="leela-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
