package com.example.backend.service;

import com.example.backend.entity.FavoriteList;
import com.example.backend.entity.Product;
import com.example.backend.entity.ShoppingList;
import com.example.backend.entity.ShoppingListProduct;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface ShoppingListService {
    ShoppingList save(ShoppingList dto) throws ExecutionException, InterruptedException;
    List<ShoppingListProduct> findById(String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    List<ShoppingList> findAll() throws ExecutionException, InterruptedException;
    ShoppingList updateById(ShoppingList dto) throws ExecutionException, InterruptedException;
    String addProduct(String productId, String userId) throws ExecutionException, InterruptedException;
    String removeProduct(String productId, String userId) throws ExecutionException, InterruptedException;
    String updateProductQuantity(String productId, String userId, int quantity) throws ExecutionException, InterruptedException;
    String clear(String userId) throws ExecutionException, InterruptedException;


}
