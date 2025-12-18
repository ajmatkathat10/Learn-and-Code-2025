import * as readline from 'readline';
 
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
let inputArraySize: number, totalQueries: number;
let inputArray: number[] = [];
let queriesArray: [number, number][] = [];
 
const findPrefixSum = () : number[] => {
    let prefixSum: number[] = new Array(inputArraySize).fill(0);
    prefixSum[0] = inputArray[0];
    for (let i = 1; i < inputArraySize; i++) {
        prefixSum[i] = prefixSum[i - 1] + inputArray[i];
    }
    return prefixSum;
}
 
const processQueries = () => {
    let result: number[] = [];
    const prefixSum = findPrefixSum();
 
    queriesArray.forEach(([leftIndex, rightIndex]) => {
        const sum = prefixSum[rightIndex - 1] - ( leftIndex > 1 ? prefixSum[leftIndex - 2] : 0);
        const mean = Math.floor(sum / (rightIndex - leftIndex + 1));
        result.push(mean);
    });
 
    result.forEach((currentMean) => console.log(currentMean))
    readLine.close();
};
 
const askForArraySizeAndQueries = () => {
    readLine.question('Enter size of array (N) and number of queries (Q): ', (answer) => {
        [inputArraySize, totalQueries] = answer.split(' ').map(Number);
        askForArray();
    });
};
 
const askForArray = () => {
    readLine.question(`Enter ${inputArraySize} space-separated array elements: `, (answer) => {
        inputArray = answer.split(' ').map(Number);
        askForQueries();
    });
};
 
const askForQueries = () => {
    let queryCount = 0;
    const askQuery = () => {
        if (queryCount < totalQueries) {
            readLine.question(`Enter ${queryCount + 1} query (L R): `, (leftAndRightQueryParameters) => {
                const [leftIndex, rightIndex] = leftAndRightQueryParameters.split(' ').map(Number);
                queriesArray.push([leftIndex, rightIndex]);
                queryCount++;
                askQuery();  
            });
        }
        else processQueries();  
    };
    askQuery();
};
 
askForArraySizeAndQueries();
 
 