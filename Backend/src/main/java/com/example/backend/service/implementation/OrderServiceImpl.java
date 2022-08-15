package com.example.backend.service.implementation;

import com.example.backend.entity.Order;
import com.example.backend.entity.Status;
import com.example.backend.repository.OrderRepository;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order save(Order order) throws ExecutionException, InterruptedException {
        return orderRepository.save(order);
    }

    @Override
    public Order findById(String id) throws ExecutionException, InterruptedException {
        return orderRepository.findById(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return orderRepository.deleteById(id);
    }

    @Override
    public Order updateById(Order dto) throws ExecutionException, InterruptedException {
        return orderRepository.updateById(dto);
    }

    @Override
    public List<Order> findAll() throws ExecutionException, InterruptedException {
        return orderRepository.findAll();
    }

    @Override
    public String promote(String id,String workerId, String driverId) throws ExecutionException, InterruptedException {
        Order order = orderRepository.findById(id);
        if(order.getStatus().equals(Status.PAID)) {
            order.setStatus(Status.IN_PROGRESS);
            order.setWorkerId(workerId);
            orderRepository.updateById(order);
            return "Order promoted to IN_PROGRESS";
        }
        if(order.getStatus().equals(Status.IN_PROGRESS)) {
            order.setStatus(Status.READY);
            orderRepository.updateById(order);
            return "Order promoted to READY";
        }
        if(order.getStatus().equals(Status.READY) ) {
            order.setStatus(Status.DELIVERED);
            order.setDriverId(driverId);
            orderRepository.updateById(order);
            return "Order promoted to DELIVERED";
        }
        return "";
    }

    @Override
    public List<Order> findByStatus(String status) throws ExecutionException, InterruptedException {
       return orderRepository.findByStatus(status);
    }
}
