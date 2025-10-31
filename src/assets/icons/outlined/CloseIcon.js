export const CloseIcon = (props) => {
    const { width = '20', height = '20', stroke = '#171717' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.16797 4.16663L15.8339 15.8325"
                stroke={stroke}
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M4.16615 15.8325L15.832 4.16663"
                stroke={stroke}
                stroke-width="1.875"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
