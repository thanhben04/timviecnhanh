export const ChevronUp = (props) => {
    const { width = '24', height = '24', stroke = 'white' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.07992 15.5233L10.5999 9.00331C11.3699 8.23331 12.6299 8.23331 13.3999 9.00331L19.9199 15.5233"
                stroke={stroke}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
