package edu.icet.ecom.repository;

import edu.icet.ecom.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDao extends JpaRepository<ItemEntity,Integer> {
    ItemEntity findByItemName(String name);
}
