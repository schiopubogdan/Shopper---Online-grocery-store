package com.example.backend.service.implementation;

import com.example.backend.entity.StorageProduct;
import com.example.backend.repository.StorageProductRepository;
import com.example.backend.service.StorageProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class StorageProductServiceImpl implements StorageProductService {
    @Autowired
    private StorageProductRepository storageProductRepository;
    @Override
    public StorageProduct save(StorageProduct product) throws ExecutionException, InterruptedException {
        return storageProductRepository.save(product);
    }

    @Override
    public StorageProduct findById(String id) throws ExecutionException, InterruptedException {
        return storageProductRepository.findById(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return storageProductRepository.deleteById(id);
    }

    @Override
    public StorageProduct updateById(StorageProduct dto) throws ExecutionException, InterruptedException {
        return storageProductRepository.updateById(dto);
    }

    @Override
    public List<StorageProduct> findAll() throws ExecutionException, InterruptedException {
        return storageProductRepository.findAll();
    }
}
