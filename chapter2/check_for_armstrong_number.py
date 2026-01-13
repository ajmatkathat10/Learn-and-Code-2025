def find_armstrong_sum(number_to_check):
    # Initializing Sum and Number of Digits
    digits_power_sum = 0
    total_digit_count = 0

    # Calculating Number of individual digits
    temp_number = number_to_check
    while temp_number > 0:
        total_digit_count = total_digit_count + 1
        temp_number = temp_number // 10

    # Finding Armstrong Number
    temp_number = number_to_check
    for digit in range(1, temp_number + 1):
        remainder = temp_number % 10
        digits_power_sum = digits_power_sum + (remainder ** total_digit_count)
        temp_number //= 10
    return digits_power_sum


# End of Function

# User Input
number_to_check = int(input("\nPlease Enter the Number to Check for Armstrong: "))

if (number_to_check == find_armstrong_sum(number_to_check)):
    print("\n %d is Armstrong Number.\n" % number_to_check)
else:
    print("\n %d is Not a Armstrong Number.\n" % number_to_check)
