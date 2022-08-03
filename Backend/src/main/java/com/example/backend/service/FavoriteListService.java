package com.example.backend.service;

import com.example.backend.entity.FavoriteList;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface FavoriteListService {
     FavoriteList save(FavoriteList dto) throws ExecutionException, InterruptedException;
     FavoriteList findById(String id) throws ExecutionException, InterruptedException;
     String deleteById(String id) throws ExecutionException, InterruptedException;
     List<FavoriteList> findAll() throws ExecutionException, InterruptedException;

}
