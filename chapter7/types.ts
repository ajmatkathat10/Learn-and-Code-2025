enum DeviceStatus {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
}

enum WifiStatus {
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
}

interface DeviceHandle {
    id: string;
    isValid: boolean;
}

interface DeviceRecord {
    deviceId: string;
    status: DeviceStatus;
    wifiConnection: WifiStatus;
}
