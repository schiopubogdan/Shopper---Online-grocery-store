package com.example.backend.service;

import com.example.backend.dto.AdminAnalyticsDTO;
import com.example.backend.models.Order;
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
    String promote(String id, String workerId, String driverId) throws ExecutionException, InterruptedException;
    List<Order> findByStatus(String status) throws ExecutionException, InterruptedException;
    List<Order> findByUserId(String id) throws ExecutionException, InterruptedException;
    AdminAnalyticsDTO getAnalytics() throws ExecutionException, InterruptedException;
}
