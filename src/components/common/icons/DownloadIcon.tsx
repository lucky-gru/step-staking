import { SVGProps } from "./types";

export function DownloadIcon({
  fill = "currentColor",
  filled,
  size = 32,
  height,
  width,
  ...props
}: SVGProps) {
  return (
    <svg
      width={width || size}
      height={height || size}
      viewBox={`0 0 ${size} ${size}`}
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H13C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15ZM3.293 7.293C3.48053 7.10553 3.73484 7.00021 4 7.00021C4.26516 7.00021 4.51947 7.10553 4.707 7.293L6 8.586V1C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0C7.26522 0 7.51957 0.105357 7.70711 0.292893C7.89464 0.48043 8 0.734784 8 1V8.586L9.293 7.293C9.38525 7.19749 9.49559 7.12131 9.6176 7.0689C9.7396 7.01649 9.87082 6.9889 10.0036 6.98775C10.1364 6.9866 10.2681 7.0119 10.391 7.06218C10.5139 7.11246 10.6255 7.18671 10.7194 7.28061C10.8133 7.3745 10.8875 7.48615 10.9378 7.60905C10.9881 7.73194 11.0134 7.86362 11.0123 7.9964C11.0111 8.12918 10.9835 8.2604 10.9311 8.3824C10.8787 8.50441 10.8025 8.61475 10.707 8.707L7.707 11.707C7.51947 11.8945 7.26516 11.9998 7 11.9998C6.73484 11.9998 6.48053 11.8945 6.293 11.707L3.293 8.707C3.10553 8.51947 3.00021 8.26516 3.00021 8C3.00021 7.73484 3.10553 7.48053 3.293 7.293Z"
        fill={fill}
      ></path>
    </svg>
  );
}
