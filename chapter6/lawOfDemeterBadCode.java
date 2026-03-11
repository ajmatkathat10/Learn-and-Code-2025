public class Paperboy {
public void collectPayment(Customer customer, double paymentAmount) {
Wallet wallet = customer.getWallet();
if (wallet.getTotalMoney() >= paymentAmount) {
wallet.subtractMoney(paymentAmount);
} else {
// come back later
}
}
}
public class Customer {
private String firstName;
private String lastName;
private Wallet myWallet;
public String getFirstName(){ return firstName; }
public String getLastName(){ return lastName; }
public Wallet getWallet(){ return myWallet; }
}
public class Wallet {
private float value;
public float getTotalMoney() { return value; }
public void setTotalMoney(float newValue) { value = newValue; }
public void subtractMoney(float debit) { value -= debit; }
}