package edu.icet.ecom.service.Impl;

import edu.icet.ecom.dto.Item;
import edu.icet.ecom.dto.Order;
import edu.icet.ecom.dto.OrderDetail;
import edu.icet.ecom.entity.ItemEntity;
import edu.icet.ecom.entity.OrderDetailEntity;
import edu.icet.ecom.entity.OrderEntity;
import edu.icet.ecom.repository.OrderDao;
import edu.icet.ecom.repository.OrderDetailDao;
import edu.icet.ecom.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {


    final OrderDao orderDao;
    final OrderDetailDao orderDetailDao;
    final ModelMapper modelMapper;

    @Transactional
    @Override
    public void placeOrder(Order order) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setCustomerName(order.getCustomerName());
        orderEntity.setTotalAmount(order.getTotalAmount());
        orderEntity.setReceivedAmount(order.getReceivedAmount());
        orderEntity.setChangeAmount(order.getChangeAmount());

        OrderEntity saveOrder = orderDao.save(orderEntity);

        List<OrderDetailEntity> orderItemEntities = order.getOrderDetails().stream().map(item -> {
            OrderDetailEntity orderDetailEntity = new OrderDetailEntity();
            orderDetailEntity.setOrder(saveOrder); // Link order entity
            orderDetailEntity.setItem(modelMapper.map(item.getItem(), ItemEntity.class)); // Use getItemId() instead of getOrderId()
            orderDetailEntity.setQty(item.getQty());
            orderDetailEntity.setTotal(item.getTotal());
            return orderDetailEntity;
        }).collect(Collectors.toList());

        orderDetailDao.saveAll(orderItemEntities);
        saveOrder.setOrderDetails(orderItemEntities);

    }

    @Override
    public List<Order> getAllOrders() {
        List<OrderEntity> orderEntities = orderDao.findAll();
        List<Order> orderList = new ArrayList<>();
        orderEntities.forEach(orderEntity -> {
            orderList.add(modelMapper.map(orderEntity, Order.class));
        });
        System.out.println(orderList);
        return orderList;
    }

    @Override
    public Long getCount() {
        return orderDao.count();
    }

    @Override
    public List<Order> getFiveOrders() {
        Pageable pageable = PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"));
        List<OrderEntity> orderEntities = orderDao.findAll(pageable).getContent();
        List<Order> orderList = new ArrayList<>();
        int count=0;
        for(OrderEntity orderEntity:orderEntities) {
            orderList.add(modelMapper.map(orderEntity, Order.class));
        }
        return orderList;
    }
}
