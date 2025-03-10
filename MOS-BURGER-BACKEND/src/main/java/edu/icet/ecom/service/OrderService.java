package edu.icet.ecom.service;


import edu.icet.ecom.dto.Order;

import java.util.List;

public interface OrderService {
    void placeOrder(Order order);
    List<Order> getAllOrders();
    Long getCount();
    List<Order> getFiveOrders();
}
