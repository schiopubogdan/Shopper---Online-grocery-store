package com.example.backend.service;

import com.example.backend.models.StorageList;
import com.example.backend.models.StorageProduct;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface StorageListService {
    StorageList save(StorageList dto) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    List<StorageList> findAll() throws ExecutionException, InterruptedException;
    StorageList updateById(StorageList dto) throws ExecutionException, InterruptedException;
    String addProduct(String cartProductId, String userId) throws ExecutionException, InterruptedException;
    String removeProduct(String storageProductId, String userId ) throws ExecutionException, InterruptedException;
    List<StorageProduct> findById(String id) throws ExecutionException, InterruptedException;
}
