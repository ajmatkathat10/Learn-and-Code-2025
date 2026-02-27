public class ATMDeviceController {

    private static final int SUCCESS = 1;
    private static final int DEVICE_SUSPENDED = -1;
    private static final int INSUFFICIENT_FUNDS = -2;
    private static final int CONNECTION_ERROR = -3;

    public int withdraw(String accountId, double amount) {
        DeviceHandle handle = getHandle(DEV1);

        if (handle != DeviceHandle.INVALID) {
            DeviceRecord record = retrieveDeviceRecord(handle);

            if (record.getStatus() != DEVICE_SUSPENDED) {
                if (record.getWifiConnection() == WIFI_CONNECTED) {
                    if (getBalance(accountId) >= amount) {
                        dispenseCash(handle, amount);
                        return SUCCESS;
                    } else {
                        return INSUFFICIENT_FUNDS;
                    }
                } else {
                    return CONNECTION_ERROR;
                }
            } else {
                return DEVICE_SUSPENDED;
            }
        }

        throw new RuntimeException("Unknown Error");
    }
}
