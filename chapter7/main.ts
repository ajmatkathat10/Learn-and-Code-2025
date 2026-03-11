class ATMDeviceController {

    withdraw(accountId: string, amount: number): void {
        const handle = this.getHandle("DEV1"); // pre-given method
        this.validateDeviceHandle(handle);

        const record = this.retrieveDeviceRecord(handle);
        this.validateDeviceStatus(record);
        this.validateNetworkConnection(record);
        this.validateSufficientFunds(accountId, amount);

        this.dispenseCash(amount);
    }

    private validateDeviceHandle(handle: DeviceHandle): void {
        if (!handle.isValid) {
            throw new Error("Device handle is invalid");
        }
    }

    private validateDeviceStatus(record: DeviceRecord): void {
        if (record.status === DeviceStatus.SUSPENDED) {
            throw new DeviceLockedException(record.deviceId);
        }
    }

    private validateNetworkConnection(record: DeviceRecord): void {
        if (record.wifiConnection !== WifiStatus.CONNECTED) {
            throw new NetworkConnectionException(record.deviceId);
        }
    }

    private validateSufficientFunds(accountId: string, amount: number): void {
        const balance = this.getBalance(accountId);
        if (balance < amount) {
            throw new InsufficientFundsException(amount, balance);
        }
    }

    private getHandle(deviceId: string): DeviceHandle {
        return { id: deviceId, isValid: true }; 
    }

    private retrieveDeviceRecord(handle: DeviceHandle): DeviceRecord {
        return {
            deviceId: handle.id,
            status: DeviceStatus.ACTIVE,
            wifiConnection: WifiStatus.CONNECTED,
        };
    }

    private getBalance(accountId: string): number {
        return 500;
    }

    private dispenseCash(amount: number): void {
        console.log(`Dispensing $${amount}`);
    }
}

/*
    In this refactored assignment, I have used exception instead of return values to handle errors.
    This is a better approach as it makes the code more readable and easier to maintain. 
    Also I have removed multiple if else condition to check for errors and have made the withdraw method more readable.
*/
