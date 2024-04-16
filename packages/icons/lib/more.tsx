import type { FC } from "react";

interface Props {
  color: string;
  size: number;
}

export const More: FC<Props> = ({ color, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>more icon</title>
      <g clipPath="url(#clip0_109_64)">
        <path
          d="M2 0C2.39782 0 2.77936 0.158035 3.06066 0.43934C3.34196 0.720644 3.5 1.10218 3.5 1.5C3.5 1.89782 3.34196 2.27936 3.06066 2.56066C2.77936 2.84196 2.39782 3 2 3C1.60218 3 1.22064 2.84196 0.93934 2.56066C0.658035 2.27936 0.5 1.89782 0.5 1.5C0.5 1.10218 0.658035 0.720644 0.93934 0.43934C1.22064 0.158035 1.60218 0 2 0ZM8.041 0C8.43883 0 8.82036 0.158035 9.10166 0.43934C9.38296 0.720644 9.541 1.10218 9.541 1.5C9.541 1.89782 9.38296 2.27936 9.10166 2.56066C8.82036 2.84196 8.43883 3 8.041 3C7.64318 3 7.26164 2.84196 6.98034 2.56066C6.69904 2.27936 6.541 1.89782 6.541 1.5C6.541 1.10218 6.69904 0.720644 6.98034 0.43934C7.26164 0.158035 7.64318 0 8.041 0ZM14 0C14.3978 0 14.7794 0.158035 15.0607 0.43934C15.342 0.720644 15.5 1.10218 15.5 1.5C15.5 1.89782 15.342 2.27936 15.0607 2.56066C14.7794 2.84196 14.3978 3 14 3C13.6022 3 13.2206 2.84196 12.9393 2.56066C12.658 2.27936 12.5 1.89782 12.5 1.5C12.5 1.10218 12.658 0.720644 12.9393 0.43934C13.2206 0.158035 13.6022 0 14 0Z"
          fill={color}
        />
      </g>
      <g clipPath="url(#clip1_109_64)">
        <path
          d="M2 6C2.39782 6 2.77936 6.15804 3.06066 6.43934C3.34196 6.72064 3.5 7.10218 3.5 7.5C3.5 7.89782 3.34196 8.27936 3.06066 8.56066C2.77936 8.84196 2.39782 9 2 9C1.60218 9 1.22064 8.84196 0.93934 8.56066C0.658035 8.27936 0.5 7.89782 0.5 7.5C0.5 7.10218 0.658035 6.72064 0.93934 6.43934C1.22064 6.15804 1.60218 6 2 6ZM8.041 6C8.43883 6 8.82036 6.15804 9.10166 6.43934C9.38296 6.72064 9.541 7.10218 9.541 7.5C9.541 7.89782 9.38296 8.27936 9.10166 8.56066C8.82036 8.84196 8.43883 9 8.041 9C7.64318 9 7.26164 8.84196 6.98034 8.56066C6.69904 8.27936 6.541 7.89782 6.541 7.5C6.541 7.10218 6.69904 6.72064 6.98034 6.43934C7.26164 6.15804 7.64318 6 8.041 6ZM14 6C14.3978 6 14.7794 6.15804 15.0607 6.43934C15.342 6.72064 15.5 7.10218 15.5 7.5C15.5 7.89782 15.342 8.27936 15.0607 8.56066C14.7794 8.84196 14.3978 9 14 9C13.6022 9 13.2206 8.84196 12.9393 8.56066C12.658 8.27936 12.5 7.89782 12.5 7.5C12.5 7.10218 12.658 6.72064 12.9393 6.43934C13.2206 6.15804 13.6022 6 14 6Z"
          fill={color}
        />
      </g>
      <g clipPath="url(#clip2_109_64)">
        <path
          d="M2 12C2.39782 12 2.77936 12.158 3.06066 12.4393C3.34196 12.7206 3.5 13.1022 3.5 13.5C3.5 13.8978 3.34196 14.2794 3.06066 14.5607C2.77936 14.842 2.39782 15 2 15C1.60218 15 1.22064 14.842 0.93934 14.5607C0.658035 14.2794 0.5 13.8978 0.5 13.5C0.5 13.1022 0.658035 12.7206 0.93934 12.4393C1.22064 12.158 1.60218 12 2 12ZM8.041 12C8.43883 12 8.82036 12.158 9.10166 12.4393C9.38296 12.7206 9.541 13.1022 9.541 13.5C9.541 13.8978 9.38296 14.2794 9.10166 14.5607C8.82036 14.842 8.43883 15 8.041 15C7.64318 15 7.26164 14.842 6.98034 14.5607C6.69904 14.2794 6.541 13.8978 6.541 13.5C6.541 13.1022 6.69904 12.7206 6.98034 12.4393C7.26164 12.158 7.64318 12 8.041 12ZM14 12C14.3978 12 14.7794 12.158 15.0607 12.4393C15.342 12.7206 15.5 13.1022 15.5 13.5C15.5 13.8978 15.342 14.2794 15.0607 14.5607C14.7794 14.842 14.3978 15 14 15C13.6022 15 13.2206 14.842 12.9393 14.5607C12.658 14.2794 12.5 13.8978 12.5 13.5C12.5 13.1022 12.658 12.7206 12.9393 12.4393C13.2206 12.158 13.6022 12 14 12Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_109_64">
          <rect width="16" height="3" fill={color} />
        </clipPath>
        <clipPath id="clip1_109_64">
          <rect width="16" height="3" fill={color} transform="translate(0 6)" />
        </clipPath>
        <clipPath id="clip2_109_64">
          <rect
            width="16"
            height="3"
            fill={color}
            transform="translate(0 12)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
