import { SVGProps } from "./types";

export function ArrowDownIcon({
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
        d="m22.741 14.469c0.2999 0.3 0.4684 0.7069 0.4684 1.1312 0 0.4242-0.1685 0.8311-0.4684 1.1312l-9.6 9.6c-0.3001 0.2999-0.707 0.4684-1.1312 0.4684-0.4243 0-0.8312-0.1685-1.1312-0.4684l-9.6-9.6c-0.15282-0.1476-0.27471-0.3242-0.35857-0.5194-0.08385-0.1952-0.12799-0.4052-0.12984-0.6176-0.0018-0.2125 0.03864-0.4231 0.11909-0.6198 0.08045-0.1966 0.19926-0.3753 0.34948-0.5255 0.15023-0.1502 0.32888-0.269 0.52551-0.3495 0.19663-0.0804 0.40732-0.1209 0.61977-0.1191 0.21245 0.0019 0.4224 0.046 0.6176 0.1299 0.19521 0.0838 0.37176 0.2057 0.51936 0.3586l6.8688 6.8688v-18.538c0-0.42435 0.1685-0.83131 0.4686-1.1314 0.3-0.30006 0.707-0.46863 1.1314-0.46863 0.4243 0 0.8313 0.16857 1.1313 0.46863 0.3001 0.30006 0.4687 0.70702 0.4687 1.1314v18.538l6.8688-6.8688c0.3-0.3 0.7069-0.4685 1.1312-0.4685 0.4242 0 0.8311 0.1685 1.1312 0.4685z"
        clipRule="evenodd"
        fill={fill}
        fillRule="evenodd"
      ></path>
    </svg>
  );
}
