import * as readline from 'readline';
import { loadConfig } from './configLoader';
import { GeocodingService, GeocodeResult } from './geocodingService';

async function main() {
    try {
        const config = loadConfig();
        const geocodingService = new GeocodingService(config.GOOGLE_API_KEY);

        const readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        displayWelcomeMessage();
        promptUser(readlineInterface, geocodingService);

    } catch (error: unknown) {
        console.error(`\n Initialization Error`);
        process.exit(1);
    }
}

function displayWelcomeMessage(): void {
    console.log("=========================================");
    console.log("   Google Geocoding Console Application  ");
    console.log("=========================================");
}

function promptUser(rl: readline.Interface, geocodingService: GeocodingService): void {
    rl.question('\nEnter a location name (or type "exit" to quit): ', async (answer) => {
        const input = answer.trim();

        if (handleExit(input, rl)) return;
        if (handleEmptyInput(input, rl, geocodingService)) return;

        await processLocation(input, geocodingService);

        promptUser(rl, geocodingService);
    });
}

function handleExit(input: string, rl: readline.Interface): boolean {
    if (input.toLowerCase() === 'exit') {
        console.log('Exiting...');
        rl.close();
        return true;
    }
    return false;
}

function handleEmptyInput(input: string, rl: readline.Interface, geocodingService: GeocodingService): boolean {
    if (!input) {
        console.log('Location name cannot be empty. Please try again.');
        promptUser(rl, geocodingService);
        return true;
    }
    return false;
}

async function processLocation(input: string, geocodingService: GeocodingService): Promise<void> {
    console.log(`\nFetching coordinates for: "${input}"...`);
    try {
        const results = await geocodingService.getCoordinates(input);
        displayResults(input, results);
    } catch (error: any) {
        console.error(`\n Error fetching data: ${error.message}`);
    }
}

function displayResults(input: string, results: GeocodeResult[]): void {
    if (results.length === 0) {
        console.log(`No results found for "${input}". Please check your spelling or try a more specific location.`);
        return;
    }

    console.log(`\nFound ${results.length} result(s):`);
    results.forEach((result, index) => {
        console.log(`\n--- Result ${index + 1} ---`);
        console.log(`Address  : ${result.formattedAddress}`);
        console.log(`Latitude : ${result.location.lat}`);
        console.log(`Longitude: ${result.location.lng}`);
    });
}

main();
