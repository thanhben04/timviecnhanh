export const Buy2hand = (props) => {
    const { width = '20', height = '20', stroke = '#d00000' } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.5835 8.3125L10.0002 10.8708L14.3835 8.32916"
                stroke={stroke}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 15.404V10.8623"
                stroke={stroke}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.96688 5.83758L6.3002 7.32091C5.7002 7.65424 5.2002 8.49591 5.2002 9.18757V12.0126C5.2002 12.7042 5.69187 13.5459 6.3002 13.8792L8.96688 15.3626C9.53354 15.6792 10.4669 15.6792 11.0419 15.3626L13.7085 13.8792C14.3085 13.5459 14.8085 12.7042 14.8085 12.0126V9.17924C14.8085 8.48758 14.3169 7.64591 13.7085 7.31257L11.0419 5.82924C10.4669 5.51257 9.53354 5.51258 8.96688 5.83758Z"
                stroke={stroke}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M18.3333 13.0957C18.3333 16.3207 15.725 18.929 12.5 18.929L13.375 17.4707"
                stroke={stroke}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M1.6665 8.09603C1.6665 4.87103 4.27484 2.2627 7.49984 2.2627L6.62485 3.72103"
                stroke={stroke}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
