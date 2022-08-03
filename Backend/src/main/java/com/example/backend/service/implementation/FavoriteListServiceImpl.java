package com.example.backend.service.implementation;

import com.example.backend.entity.FavoriteList;
import com.example.backend.repository.FavoriteListRepository;
import com.example.backend.service.FavoriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FavoriteListServiceImpl implements FavoriteListService {
    @Autowired
    private FavoriteListRepository favoriteListRepository;
    @Override
    public FavoriteList save(FavoriteList dto) throws ExecutionException, InterruptedException {
        return favoriteListRepository.save(dto);
    }

    @Override
    public FavoriteList findById(String id) throws ExecutionException, InterruptedException {
        return favoriteListRepository.findById(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return favoriteListRepository.deleteById(id);
    }

    @Override
    public List<FavoriteList> findAll() throws ExecutionException, InterruptedException {
        return favoriteListRepository.findAll();
    }
}
