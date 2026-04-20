import styles from './EyeIcon.module.css';

export default function EyeIcon({ size = 24, color = "black" }) {
    return (
        <svg 
            style={{ width: size, height: size }}
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="2.8235" fill={color} />
            <path 
                d="M21.6 11.07C15.215 20.43 8.78497 20.43 2.39997 11.07C5.43736 7.78 9.05864 6 12.096 6C15.3293 6 18.5626 7.78 21.6 11.07Z"
                strokeWidth="1.5"
                strokeLinejoin="round"
                stroke={color}
            />
        </svg>
    );
}
