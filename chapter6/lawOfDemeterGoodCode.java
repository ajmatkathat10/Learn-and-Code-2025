public class Paperboy {
    public void collectPayment(Customer customer, double paymentAmount) {
        boolean paymentStatus = customer.getPayment(paymentAmount);
        if (paymentStatus) {
            System.out.println("Payment collected successfully");
        } else {
            System.out.println("Payment not collected");
        }
    }
}

public class Customer {
    private String firstName;
    private String lastName;
    private Wallet myWallet;
    
    public String getFirstName() { 
        return firstName; 
    }
    
    public String getLastName() { 
        return lastName; 
    }
    
    public Boolean getPayment(double amount) {
        if (myWallet.getTotalMoney() > amount) {
            myWallet.subtractMoney(amount);
            return true;
        } 
        else {
            return false;
        }
    }
}

public class Wallet {
    private float value;
    public float getTotalMoney() { 
        return value; 
    }
    
    public void setTotalMoney(float newValue) { 
        value = newValue; 
    }
    
    public void subtractMoney(float debit) { 
        value -= debit; 
    }
}


/*
    In this refactored code, I have removed the logic where Paperboy class was able to
    access Wallet class internals through customer object. I have implemented a getPayment
    method in Customer class, which does not show Wallet class internals and hence does not 
    violets demeter law. 
*/