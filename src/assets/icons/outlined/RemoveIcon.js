export const RemoveIcon = (props) => {
    const { width = '24', height = '24', stroke = '#D00000' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 6.47998C17.67 6.14998 14.32 5.97998 10.98 5.97998C9 5.97998 7.02 6.07998 5.04 6.27998L3 6.47998"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.5 5.47L8.72 4.16C8.88 3.21 9 2.5 10.69 2.5L13.31 2.5C15 2.5 15.13 3.25 15.28 4.17L15.5 5.47"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M18.8499 9.64014L18.1999 19.7101C18.0899 21.2801 17.9999 22.5001 15.2099 22.5001H8.7899C5.9999 22.5001 5.9099 21.2801 5.7999 19.7101L5.1499 9.64014"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10.3301 17H13.6601"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.5 13H14.5"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
