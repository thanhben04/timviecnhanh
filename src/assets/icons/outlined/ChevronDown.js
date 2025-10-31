export const ChevronDown = (props) => {
    const { width = '16', height = '16', stroke = 'white' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.935 5.96667L9.58833 10.3133C9.075 10.8267 8.235 10.8267 7.72167 10.3133L3.375 5.96667"
                stroke={stroke}
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
