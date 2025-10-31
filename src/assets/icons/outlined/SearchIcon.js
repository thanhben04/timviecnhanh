export const SearchIcon = (props) => {
    const { width = '20', height = '20' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.58268 17.5C13.9549 17.5 17.4993 13.9555 17.4993 9.58329C17.4993 5.21104 13.9549 1.66663 9.58268 1.66663C5.21043 1.66663 1.66602 5.21104 1.66602 9.58329C1.66602 13.9555 5.21043 17.5 9.58268 17.5Z"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M18.3327 18.3333L16.666 16.6666"
                stroke="currentColor"
                stroke-width="1.875"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
