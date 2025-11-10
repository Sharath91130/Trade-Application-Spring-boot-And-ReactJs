package com.modus.stock.repository;

import com.modus.stock.entity.SellOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellOrderRepository extends JpaRepository<SellOrderEntity, Long> {
    List<SellOrderEntity> findByStatus(String status);
}
