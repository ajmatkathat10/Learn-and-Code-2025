import random

def is_valid_guess(userGuessValue):
    if userGuessValue.isdigit() and 1 <= int(userGuessValue) <= 100:
        return True
    else:
        return False


def main():
    secretNumberToGuess = random.randint(1, 100)
    isGuessedCorrectly = False
    userGuessValue = input("Guess a number between 1 and 100:")
    totalGuessCount = 0

    while not isGuessedCorrectly:
        if not is_valid_guess(userGuessValue):
            userGuessValue = input("I wont count this one Please enter a number between 1 to 100")
            continue
        else:
            totalGuessCount += 1
            userGuessValue = int(userGuessValue)

        if userGuessValue < secretNumberToGuess:
            userGuessValue = input("Too low. Guess again")
        elif userGuessValue > secretNumberToGuess:
            userGuessValue = input("Too High. Guess again")
        else:
            print("You guessed it in", totalGuessCount, "guesses!")
            isGuessedCorrectly = True


main()
