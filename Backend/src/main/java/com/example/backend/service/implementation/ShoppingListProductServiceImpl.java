package com.example.backend.service.implementation;

import com.example.backend.entity.Product;
import com.example.backend.entity.ShoppingListProduct;
import com.example.backend.repository.ShoppingListProductRepository;
import com.example.backend.service.ShoppingListProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ShoppingListProductServiceImpl implements ShoppingListProductService {
    @Autowired
    private ShoppingListProductRepository shoppingListProductRepository;
    @Override
    public ShoppingListProduct save(ShoppingListProduct product) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.save(product);
    }

    @Override
    public ShoppingListProduct findById(String id) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.findById(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.deleteById(id);
    }

    @Override
    public ShoppingListProduct updateById(ShoppingListProduct dto) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.updateById(dto);
    }

    @Override
    public List<ShoppingListProduct> findAll() throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.findAll();
    }
}
