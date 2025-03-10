package edu.icet.ecom.repository;

import edu.icet.ecom.entity.LoginEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserDao extends JpaRepository<LoginEntity,Integer> {
    List<LoginEntity> findByUser(String name);
}
