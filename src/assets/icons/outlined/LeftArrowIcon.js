export const LeftArrowIcon = (props) => {
    const { width = '24', height = '24', stroke = '#737373' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.07 5.92975L4 11.9997L10.07 18.0697"
                stroke={stroke}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M21.0019 11.9998H4.17188"
                stroke={stroke}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
