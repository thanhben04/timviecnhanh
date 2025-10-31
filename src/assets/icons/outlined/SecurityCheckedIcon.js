export const SecurityCheckedIcon = (props) => {
    const { width = '24', height = '24', stroke = '#0ba928' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.4902 2.72957L5.50016 4.60957C4.35016 5.03957 3.41016 6.39957 3.41016 7.61957V15.0496C3.41016 16.2296 4.19016 17.7796 5.14016 18.4896L9.44016 21.6996C10.8502 22.7596 13.1702 22.7596 14.5802 21.6996L18.8802 18.4896C19.8302 17.7796 20.6102 16.2296 20.6102 15.0496V7.61957C20.6102 6.38957 19.6702 5.02957 18.5202 4.59957L13.5302 2.72957C12.6802 2.41957 11.3202 2.41957 10.4902 2.72957Z"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.0498 12.3697L10.6598 13.9797L14.9598 9.67969"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
