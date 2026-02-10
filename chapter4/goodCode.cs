public class OrderProcessor 
{ 
    private readonly IPaymentGateway _paymentGateway; 
    private readonly IInventoryService _inventoryService; 
    private readonly INotificationService _notificationService; 
 
    public OrderProcessor(
        IPaymentGateway paymentGateway, 
        IInventoryService inventoryService, 
        INotificationService notificationService) 
    { 
        _paymentGateway = paymentGateway; 
        _inventoryService = inventoryService; 
        _notificationService = notificationService; 
    } 
 
    public async Task<OrderResult> ProcessOrder(Order order) 
    { 
        CheckForNullOrder(order);

        if (!IsValidOrder(order)) 
        { 
            return OrderResult.Invalid("Order validation failed"); 
        } 
 
        if (!await CheckInventoryAvailability(order)) 
        { 
            return OrderResult.Failed("Insufficient inventory"); 
        } 
 
        await _inventoryService.ReserveItems(order.Items); 
 
        try 
        { 
            var paymentResult = await ProcessOrderPayment(order);
 
            if (paymentResult.IsSuccessful) 
            { 
                await FinalizeSuccessfulOrder(order);
                return OrderResult.Success(paymentResult.TransactionId); 
            } 
            else 
            { 
                await HandleFailedPayment(order);
                return OrderResult.Failed($"Payment failed: {paymentResult.ErrorMessage}"); 
            } 
        } 
        catch (Exception ex) 
        { 
            await RollbackInventoryReservation(order);
            LogError(ex);
            throw; 
        } 
    } 

    private void CheckForNullOrder(Order order)
    {
        if (order == null) 
        { 
            throw new ArgumentNullException(nameof(order)); 
        }
    }

    private async Task<bool> CheckInventoryAvailability(Order order)
    {
        return await _inventoryService.CheckAvailability(order.Items);
    }

    private async Task<PaymentResult> ProcessOrderPayment(Order order)
    {
        return await _paymentGateway.ProcessPayment(
            order.CustomerId, 
            order.TotalAmount, 
            order.PaymentMethod);
    }

    private async Task FinalizeSuccessfulOrder(Order order)
    {
        await _inventoryService.CommitReservation(order.Items);
        await _notificationService.SendOrderConfirmation(order);
    }

    private async Task HandleFailedPayment(Order order)
    {
        await _inventoryService.ReleaseReservation(order.Items);
    }

    private async Task RollbackInventoryReservation(Order order)
    {
        await _inventoryService.ReleaseReservation(order.Items);
    }

    private void LogError(Exception ex)
    {
        Console.WriteLine($"Error processing order: {ex.Message}");
    }
 
    private bool IsValidOrder(Order order) 
    { 
        return order.Items?.Count > 0 
            && order.TotalAmount > 0
            && order.CustomerId != null
            && order.PaymentMethod != null;
    } 
 
    public async Task CancelOrder(string orderId) 
    { 
        var order = await GetOrderById(orderId); 
 
        if (order.Status == OrderStatus.Paid) 
        { 
            await RefundPaidOrder(order);
        } 
 
        await MarkOrderAsCancelled(order);
    } 

    private async Task RefundPaidOrder(Order order)
    {
        await _paymentGateway.RefundPayment(order.TransactionId);
        await _inventoryService.RestoreInventory(order.Items);
    }

    private async Task MarkOrderAsCancelled(Order order)
    {
        order.Status = OrderStatus.Cancelled;
        await SaveOrder(order);
    }
 
    private async Task<Order> GetOrderById(string orderId) 
    { 
        return await Task.FromResult(new Order()); 
    } 
 
    private async Task SaveOrder(Order order) 
    { 
        await Task.CompletedTask; 
    } 
}


/* 
    from this comment assignment, I learned that we should be very careful 
    about comments that we are writing in our code. We should write variable, function 
    and class names in a way that it removes the need of comments. We should use comments
    if it is something that is very important and the future developers need to 
    know about that. Our code structure should be clean and simple to understand to remove 
    the need of comments.
*/