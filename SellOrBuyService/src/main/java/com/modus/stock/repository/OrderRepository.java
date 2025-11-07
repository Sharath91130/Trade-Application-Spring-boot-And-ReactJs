package com.modus.stock.repository;

import com.modus.stock.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
    List<OrderEntity> findByStatusAndPriceAndOrderType(String status,double price,String orderType);
    List<OrderEntity> findByStatusAndIsAmoAndPriceAndOrderType(String status,boolean isAmo,double price,String orderType);
}
