package com.modus.stock.service;

import com.modus.stock.entity.OrderEntity;
import com.modus.stock.model.OrderRequest;
import com.modus.stock.model.OrderResponse;
import com.modus.stock.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public OrderResponse placeOrder(OrderRequest request) {

        LocalTime now = LocalTime.now();
        LocalTime start = LocalTime.of(9, 30); // 9:30 AM
        LocalTime end = LocalTime.of(15, 0);   // 3:00 PM

        boolean isMarketOpen = !now.isBefore(start) && !now.isAfter(end);
        // Simulate slicing
        int sliceCount = request.isSlice() ? (request.getQuantity() / 1000) + 1 : 1;
        List<String> orderIds = new ArrayList<>();
        long baseId = System.currentTimeMillis();

        for (int i = 0; i < sliceCount; i++) {
            orderIds.add(String.valueOf(baseId + i));
        }

        // Save minimal info locally
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setInstrumentToken(request.getInstrumentToken());
        orderEntity.setTransactionType(request.getTransactionType());
        orderEntity.setOrderType(request.getOrderType());
        orderEntity.setPrice(request.getPrice());
        orderEntity.setQuantity(request.getQuantity());
        orderEntity.setTag(request.getTag());
        orderEntity.setAmo(!isMarketOpen);
        if(!isMarketOpen){
            orderEntity.setStatus("PENDING");
        }else{
            orderEntity.setStatus("SUCCESS");
        }

        orderRepository.save(orderEntity);

        // Prepare response
        OrderResponse response = new OrderResponse();
        OrderResponse.DataField data = new OrderResponse.DataField();
        data.setOrderIds(orderIds);

        OrderResponse.Metadata metadata = new OrderResponse.Metadata();
        metadata.setLatency((int)(Math.random() * 100)); // simulate latency

        response.setStatus("SUCCESS");
        response.setData(data);
        response.setMetadata(metadata);

        return response;
    }

    @Scheduled(cron = "0 30 09 * * *")
    public void updatePendingOrders() {
        List<OrderEntity> pendingOrders = orderRepository.findByStatus("PENDING");

        if (pendingOrders.isEmpty()) {
            System.out.println("✅ No pending orders found.");
            return;
        }

        for (OrderEntity order : pendingOrders) {
            order.setStatus("SUCCESS");
        }

        orderRepository.saveAll(pendingOrders);
        System.out.println("✅ Updated " + pendingOrders.size() + " pending orders to SUCCESS.");
    }
}
