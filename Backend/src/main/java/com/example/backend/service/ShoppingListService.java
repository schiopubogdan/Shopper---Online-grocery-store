package com.example.backend.service;

import com.example.backend.dto.CouponDTO;
import com.example.backend.models.ShoppingList;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface ShoppingListService {
    ShoppingList save(ShoppingList dto) throws ExecutionException, InterruptedException;
    ShoppingList findById(String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    List<ShoppingList> findAll() throws ExecutionException, InterruptedException;
    ShoppingList updateById(ShoppingList dto) throws ExecutionException, InterruptedException;
    String addProduct(String productId, String userId, int quantity) throws ExecutionException, InterruptedException;
    String removeProduct(String productId, String userId) throws ExecutionException, InterruptedException;
    String updateProductQuantity(String productId, String userId, int quantity) throws ExecutionException, InterruptedException;
    String clear(String userId) throws ExecutionException, InterruptedException;
    String finalizeOrder(String userId) throws ExecutionException, InterruptedException;
    ShoppingList applyCoupon(CouponDTO dto) throws ExecutionException, InterruptedException;


}
