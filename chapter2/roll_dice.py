import random

def roll_dice(totalSides):
    currentRollValue = random.randint(1, totalSides)
    return currentRollValue


def main():
    totalSides = 6
    isRolling = True

    while isRolling:
        userChoice = input("Ready to roll? Enter Q to Quit: ")

        if userChoice.lower() != "q":
            currentRollValue = rollDice(totalSides)
            print("You have rolled a", currentRollValue)
        else:
            isRolling = False


main()
