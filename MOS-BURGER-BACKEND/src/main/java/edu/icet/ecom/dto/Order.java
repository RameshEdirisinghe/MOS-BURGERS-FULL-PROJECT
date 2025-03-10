package edu.icet.ecom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private Integer id;
    private String customerName;
    private Double totalAmount;
    private Double receivedAmount;
    private Double changeAmount;
    private List<OrderDetail> orderDetails;
}
