class Employee {
  id: number;
  name: string;
  department: string;
  working: boolean;

  public isWorking(): boolean {
    return false;
  }
}

class EmployeeSaver {
  public saveEmployeeToDatabase(): void {}
}

class EmployeeReportGenerator {
  public printEmployeeDetailReportXML(): void {}
  
  public printEmployeeDetailReportCSV(): void {}
}

class EmployeeManagement {
  public terminateEmployee(): void {}
}