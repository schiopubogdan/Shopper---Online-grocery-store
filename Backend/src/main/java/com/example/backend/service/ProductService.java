package com.example.backend.service;

import com.example.backend.models.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface ProductService {
    Product save (Product product) throws ExecutionException, InterruptedException;
    Product findById (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    Product updateById(Product dto) throws ExecutionException, InterruptedException;
    List<Product> findAll() throws ExecutionException, InterruptedException;
    List<Product> findByCategory(String category) throws ExecutionException, InterruptedException;
    List<String> findCategoryBrands(String category) throws ExecutionException, InterruptedException;
}
