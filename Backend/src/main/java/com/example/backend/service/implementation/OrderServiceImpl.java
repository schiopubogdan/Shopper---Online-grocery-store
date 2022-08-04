package com.example.backend.service.implementation;

import com.example.backend.entity.Order;
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
}
