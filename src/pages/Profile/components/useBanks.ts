import { useState, useEffect } from 'react';

interface Bank {
    id: number;
    name: string;
    code: string;
    bin: string;
    shortName: string;
    logo: string;
    transferSupported: number;
    lookupSupported: number;
    short_name: string;
    support: number;
    isTransfer: number;
    swift_code: string;
}

export const useBanks = () => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
    const [bankSearchTerm, setBankSearchTerm] = useState('');
    const [isLoadingBanks, setIsLoadingBanks] = useState(false);

    // Fetch banks from VietQR API
    useEffect(() => {
        const fetchBanks = async () => {
            setIsLoadingBanks(true);
            try {
                const response = await fetch('https://api.vietqr.io/v2/banks');
                const data = await response.json();
                if (data.code === '00' && data.data) {
                    setBanks(data.data);
                    setFilteredBanks(data.data);
                }
            } catch (error) {
                console.error('Error fetching banks:', error);
                // Fallback to mock data if API fails
                const fallbackBanks = [
                    {
                        id: 1,
                        name: 'Agribank',
                        code: 'agribank',
                        bin: '',
                        shortName: 'Agribank',
                        logo: '',
                        transferSupported: 1,
                        lookupSupported: 1,
                        short_name: 'Agribank',
                        support: 1,
                        isTransfer: 1,
                        swift_code: '',
                    },
                    {
                        id: 2,
                        name: 'BIDV',
                        code: 'bidv',
                        bin: '',
                        shortName: 'BIDV',
                        logo: '',
                        transferSupported: 1,
                        lookupSupported: 1,
                        short_name: 'BIDV',
                        support: 1,
                        isTransfer: 1,
                        swift_code: '',
                    },
                    {
                        id: 3,
                        name: 'Vietcombank',
                        code: 'vcb',
                        bin: '',
                        shortName: 'VCB',
                        logo: '',
                        transferSupported: 1,
                        lookupSupported: 1,
                        short_name: 'VCB',
                        support: 1,
                        isTransfer: 1,
                        swift_code: '',
                    },
                    {
                        id: 4,
                        name: 'Vietinbank',
                        code: 'vietinbank',
                        bin: '',
                        shortName: 'Vietinbank',
                        logo: '',
                        transferSupported: 1,
                        lookupSupported: 1,
                        short_name: 'Vietinbank',
                        support: 1,
                        isTransfer: 1,
                        swift_code: '',
                    },
                ];
                setBanks(fallbackBanks);
                setFilteredBanks(fallbackBanks);
            } finally {
                setIsLoadingBanks(false);
            }
        };

        fetchBanks();
    }, []);

    // Filter banks based on search term
    useEffect(() => {
        if (bankSearchTerm.trim() === '') {
            setFilteredBanks(banks);
        } else {
            const filtered = banks.filter(
                (bank) =>
                    bank.name
                        .toLowerCase()
                        .includes(bankSearchTerm.toLowerCase()) ||
                    bank.shortName
                        .toLowerCase()
                        .includes(bankSearchTerm.toLowerCase()) ||
                    bank.short_name
                        .toLowerCase()
                        .includes(bankSearchTerm.toLowerCase())
            );
            setFilteredBanks(filtered);
        }
    }, [bankSearchTerm, banks]);

    return {
        banks,
        filteredBanks,
        bankSearchTerm,
        setBankSearchTerm,
        isLoadingBanks,
    };
};

export type { Bank };
