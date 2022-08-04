package com.example.backend.service;

import com.example.backend.entity.Order;
import com.example.backend.entity.Product;
import com.example.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface OrderService {
    Order save (Order order) throws ExecutionException, InterruptedException;
    Order findById (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    Order updateById(Order dto) throws ExecutionException, InterruptedException;
    List<Order> findAll() throws ExecutionException, InterruptedException;
}
