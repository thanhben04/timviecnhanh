export const RightArrowIcon = (props) => {
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
                d="M14.4297 6.56445L20.4997 12.6345L14.4297 18.7045"
                stroke={stroke}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M3.5 12.6348H20.33"
                stroke={stroke}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
