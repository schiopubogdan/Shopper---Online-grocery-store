package com.example.backend.service;

import com.example.backend.models.StorageProduct;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface StorageProductService {
    StorageProduct save (StorageProduct product) throws ExecutionException, InterruptedException;
    StorageProduct findById (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    StorageProduct updateById(StorageProduct dto) throws ExecutionException, InterruptedException;
    List<StorageProduct> findAll() throws ExecutionException, InterruptedException;
}
