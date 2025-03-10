package edu.icet.ecom.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="OrderDetail")
public class OrderDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderDetailId;

    @ManyToOne
    @JoinColumn(name = "orderId", referencedColumnName = "id", nullable = false)
    private OrderEntity order;

    @ManyToOne
    @JoinColumn(name = "itemId", referencedColumnName = "id", nullable = false)
    private ItemEntity item;

    private Integer qty;
    private Double total;
}
