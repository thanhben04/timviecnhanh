export const BurgerIcon = (props) => {
    const { width = '20', height = '20', stroke = 'white' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.5 5.83344H17.5"
                stroke={stroke}
                stroke-width="1.25"
                stroke-linecap="round"
            />
            <path
                d="M2.5 10H17.5"
                stroke={stroke}
                stroke-width="1.875"
                stroke-linecap="round"
            />
            <path
                d="M2.5 14.1666H17.5"
                stroke={stroke}
                stroke-width="1.875"
                stroke-linecap="round"
            />
        </svg>
    );
};
