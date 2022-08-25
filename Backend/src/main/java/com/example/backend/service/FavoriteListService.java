package com.example.backend.service;

import com.example.backend.models.FavoriteList;
import com.example.backend.models.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface FavoriteListService {
     FavoriteList save(FavoriteList dto) throws ExecutionException, InterruptedException;
     List<Product> findById(String id) throws ExecutionException, InterruptedException;
     String deleteById(String id) throws ExecutionException, InterruptedException;
     List<FavoriteList> findAll() throws ExecutionException, InterruptedException;
     FavoriteList updateById(FavoriteList dto) throws ExecutionException, InterruptedException;
     String addProduct(String productId, String userId) throws ExecutionException, InterruptedException;
     String removeProduct(String productId, String userId) throws ExecutionException, InterruptedException;
     Boolean checkProduct(String productId, String userId) throws ExecutionException, InterruptedException;

}
