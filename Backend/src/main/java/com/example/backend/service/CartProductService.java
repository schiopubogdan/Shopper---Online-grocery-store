package com.example.backend.service;

import com.example.backend.entity.CartProduct;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface CartProductService {
    CartProduct save (CartProduct product) throws ExecutionException, InterruptedException;
    CartProduct findById (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    CartProduct updateById(CartProduct dto) throws ExecutionException, InterruptedException;
    List<CartProduct> findAll() throws ExecutionException, InterruptedException;

}
