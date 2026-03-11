import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

export interface AppConfig {
    GOOGLE_API_KEY: string;
}

export function loadConfig(): AppConfig {
    const envPath = path.resolve(__dirname, '.env');
    
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
    } else {
        dotenv.config();
    }

    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
        throw new Error("GOOGLE_API_KEY is missing or empty. Please add your Google Maps API key to the .env file.");
    }

    return {
        GOOGLE_API_KEY: apiKey.trim()
    };
}
