package com.modus.stock.service;

import com.modus.stock.entity.OrderEntity;
import com.modus.stock.entity.SellOrderEntity;
import com.modus.stock.model.OrderRequest;
import com.modus.stock.model.OrderResponse;
import com.modus.stock.repository.OrderRepository;
import com.modus.stock.repository.SellOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SellOrderRepository sellOrderRepository;

    @Autowired
    private  MarketPriceService marketPriceService;

    public OrderResponse placeOrder(OrderRequest request) {


        LocalTime now = LocalTime.now();
        LocalTime start = LocalTime.of(9, 30); // 9:30 AM
        LocalTime end = LocalTime.of(15, 30);   // 3:00 PM

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
        orderEntity.setUser_id(request.getUser_id());
        if(isMarketOpen && request.getOrderType().equals("MARKET") && request.getPrice()==0.0){
            orderEntity.setStatus("SUCCESS");
        }else{

            orderEntity.setStatus("PENDING");
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
        List<OrderEntity> pendingOrders = orderRepository.findByStatusAndIsAmoAndPriceAndOrderType("PENDING",true,0.0,"MARKET");

        MarketPriceService marketPriceService=new MarketPriceService();
        double currentPrice = marketPriceService.getCurrentPrice();

        for(OrderEntity order:pendingOrders){
            order.setPrice(currentPrice);
            order.setStatus("SUCCESS");
            orderRepository.save(order);
        }
    }

    @Scheduled(fixedRate = 60000) // 60000 ms = 1 minute
    public void updateLimitedOrders() {
        double currentPrice = marketPriceService.getCurrentPrice();
        List<OrderEntity> orders = orderRepository.findByStatusAndPriceAndOrderType("PENDING", currentPrice, "LIMIT");
        for (OrderEntity order : orders) {
            order.setStatus("SUCCESS");
            orderRepository.save(order);
        }
    }

    public OrderResponse sellOrder(OrderRequest request) {

        System.out.println("sellOrder entered");

        long startTime = System.currentTimeMillis();

        LocalTime now = LocalTime.now();
        LocalTime start = LocalTime.of(9, 30);
        LocalTime end = LocalTime.of(15, 30);
        boolean isMarketOpen = !now.isBefore(start) && !now.isAfter(end);

        // Always enforce SELL
        request.setTransactionType("SELL");

        // 🔹 Simulate slicing logic
        int sliceCount = request.isSlice() ? (request.getQuantity() / 1000) + 1 : 1;
        List<String> orderIds = new ArrayList<>();
        long baseId = System.currentTimeMillis();
        for (int i = 0; i < sliceCount; i++) {
            orderIds.add(String.valueOf(baseId + i));
        }

        // 🔹 Save SELL order in separate table
        SellOrderEntity sellOrder = new SellOrderEntity();
        sellOrder.setUser_id(request.getUser_id());
        sellOrder.setInstrumentToken(request.getInstrumentToken());
        sellOrder.setTransactionType("SELL");
        sellOrder.setOrderType(request.getOrderType());
        sellOrder.setPrice(request.getPrice());
        sellOrder.setQuantity(request.getQuantity());
        sellOrder.setTag(request.getTag());
        sellOrder.setProduct(request.getProduct());
        sellOrder.setValidity(request.getValidity());
        sellOrder.setDisclosedQuantity(request.getDisclosedQuantity());
        sellOrder.setTriggerPrice(request.getTriggerPrice());
        sellOrder.setSlice(request.isSlice());
        sellOrder.setAmo(!isMarketOpen);
        sellOrder.setStatus(isMarketOpen ? "SUCCESS" : "PENDING");

        sellOrderRepository.save(sellOrder);

        // 🔹 Calculate latency
        long endTime = System.currentTimeMillis();
        int latency = (int) (endTime - startTime);

        // 🔹 Prepare response
        OrderResponse response = new OrderResponse();
        OrderResponse.DataField data = new OrderResponse.DataField();
        data.setOrderIds(orderIds);

        OrderResponse.Metadata metadata = new OrderResponse.Metadata();
        metadata.setLatency(latency);

        response.setStatus("SUCCESS");
        response.setData(data);
        response.setMetadata(metadata);

        return response;
    }

}
