class DeviceLockedException extends Error {
    constructor(deviceId: string) {
        super(`Device is suspended: ${deviceId}`);
        this.name = "DeviceLockedException";
    }
}

class InsufficientFundsException extends Error {
    constructor(requested: number, available: number) {
        super(`Requested: ${requested}, Available: ${available}`);
        this.name = "InsufficientFundsException";
    }
}

class NetworkConnectionException extends Error {
    constructor(deviceId: string) {
        super(`No WiFi connection for device: ${deviceId}`);
        this.name = "NetworkConnectionException";
    }
}
