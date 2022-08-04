package com.example.backend.service;

import com.example.backend.entity.Product;
import com.example.backend.entity.ShoppingListProduct;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface ShoppingListProductService {
    ShoppingListProduct save (ShoppingListProduct product) throws ExecutionException, InterruptedException;
    ShoppingListProduct findById (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    ShoppingListProduct updateById(ShoppingListProduct dto) throws ExecutionException, InterruptedException;
    List<ShoppingListProduct> findAll() throws ExecutionException, InterruptedException;

}
