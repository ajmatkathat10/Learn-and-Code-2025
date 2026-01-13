import * as readline from 'readline';
import { codeToCountryNames } from './countryCodesToNames';

function getFullCountryName(countryCode: string): void {
  const code = countryCode.toUpperCase();
  const countryName = codeToCountryNames[code];
  if (!countryName) console.log(`Country code "${countryCode}" does not exist.`);
  else console.log(`Country with (${code}) code is ${countryName}`);
}

function main(): void {
    const readLineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
  
    function promptUserForCountryCode(): void {
        readLineInterface.question('Enter a country code like IN, US to get full country name or "quit" to quit: ', (input) => {
            const trimmedUserInput = input.trim();
            if (trimmedUserInput.toLowerCase() === 'quit') {
                console.log('Game Over\n');
                readLineInterface.close();
                return;
            }
            
            if (trimmedUserInput) getFullCountryName(trimmedUserInput);
            else console.log('Please enter valid country code!')
            console.log('');
            promptUserForCountryCode();
        });
    }
  
    promptUserForCountryCode();
}

main();