package edu.icet.ecom.repository;

import edu.icet.ecom.entity.OrderDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailDao extends JpaRepository<OrderDetailEntity,Integer> {
}
