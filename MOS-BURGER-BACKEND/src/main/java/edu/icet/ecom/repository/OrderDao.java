package edu.icet.ecom.repository;

import edu.icet.ecom.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDao extends JpaRepository<OrderEntity,Integer> {
}
