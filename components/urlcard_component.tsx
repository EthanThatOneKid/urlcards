import type { URLCard } from "#/services/urlcards/mod.ts";

export interface URLCardComponentProps {
  data: URLCard;
}

export function URLCardComponent(props: URLCardComponentProps) {
  return (
    <div className="urlcard">
      <a
        href={props.data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="urlcard-url"
      >
        <img
          src={props.data.pictureSrc}
          alt={props.data.title}
          className="urlcard-img"
        />
        <h2 className="urlcard-title">{props.data.title}</h2>
      </a>
    </div>
  );
}
