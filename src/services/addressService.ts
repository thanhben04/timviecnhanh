export interface Province {
    id: string;
    province_code: string;
    name: string;
    short_name: string;
    code: string;
    place_type: string;
    country: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface Ward {
    id: string;
    ward_code: string;
    name: string;
    province_code: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface AddressOption {
    label: string;
    value: string;
}

class AddressService {
    private provinces: Province[] = [];
    private wards: Ward[] = [];
    private isDataLoaded = false;

    async loadAddressData(): Promise<void> {
        if (this.isDataLoaded) return;

        try {
            const response = await fetch(
                'https://unpkg.com/vietnam-address-database@1.0.0/address.json'
            );
            const data = await response.json();

            // Find provinces table
            const provincesTable = data.find(
                (item: any) => item.name === 'provinces'
            );
            if (provincesTable) {
                this.provinces = provincesTable.data;
            }

            // Find wards table
            const wardsTable = data.find((item: any) => item.name === 'wards');
            if (wardsTable) {
                this.wards = wardsTable.data;
            }

            this.isDataLoaded = true;
        } catch (error) {
            console.error('Failed to load address data:', error);
            throw error;
        }
    }

    async getProvinceOptions(): Promise<AddressOption[]> {
        await this.loadAddressData();
        return this.provinces.map((province) => ({
            label: province.name,
            value: province.province_code,
        }));
    }

    async getWardOptionsByProvince(
        provinceCode: string
    ): Promise<AddressOption[]> {
        await this.loadAddressData();
        const provinceWards = this.wards.filter(
            (ward) => ward.province_code === provinceCode
        );
        return provinceWards.map((ward) => ({
            label: ward.name,
            value: ward.ward_code,
        }));
    }

    getProvinceByCode(code: string): Province | undefined {
        return this.provinces.find(
            (province) => province.province_code === code
        );
    }

    getWardByCode(code: string): Ward | undefined {
        return this.wards.find((ward) => ward.ward_code === code);
    }
}

export const addressService = new AddressService();
