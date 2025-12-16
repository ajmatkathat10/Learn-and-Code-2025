def findArmstrongSum(numberToCheck):
    # Initializing Sum and Number of Digits
    digitsPowerSum = 0
    totalDigitCount = 0

    # Calculating Number of individual digits
    tempNumber = numberToCheck
    while tempNumber > 0:
        totalDigitCount = totalDigitCount + 1
        tempNumber = tempNumber // 10

    # Finding Armstrong Number
    tempNumber = numberToCheck
    for digit in range(1, tempNumber + 1):
        remainder = tempNumber % 10
        digitsPowerSum = digitsPowerSum + (remainder ** totalDigitCount)
        tempNumber //= 10
    return digitsPowerSum


# End of Function

# User Input
numberToCheck = int(input("\nPlease Enter the Number to Check for Armstrong: "))

if (numberToCheck == findArmstrongSum(numberToCheck)):
    print("\n %d is Armstrong Number.\n" % numberToCheck)
else:
    print("\n %d is Not a Armstrong Number.\n" % numberToCheck)
