export interface GeocodeResult {
    formattedAddress: string;
    location: {
        lat: number;
        lng: number;
    };
}

export class GeocodingService {
    private apiKey: string;
    private baseUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getCoordinates(address: string): Promise<GeocodeResult[]> {
        const url = this.buildUrl(address);
        
        try {
            const data = await this.fetchData(url);
            return this.parseResponse(data);
        } catch (error: any) {
            throw new Error(`Failed to fetch geocoding data: ${error.message}`);
        }
    }

    private buildUrl(address: string): string {
        return `${this.baseUrl}?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    }

    private async fetchData(url: string): Promise<any> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    private parseResponse(data: any): GeocodeResult[] {
        if (data.status === 'OK') {
            return data.results.map((result: any) => ({
                formattedAddress: result.formatted_address,
                location: result.geometry.location
            }));
        } 
        else if (data.status === 'ZERO_RESULTS') {
            return [];
        } 
        else {
            throw new Error(`Geocoding API error`);
        }
    }
}
