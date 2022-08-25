package com.example.backend.service.implementation;

import com.example.backend.models.CartProduct;
import com.example.backend.repository.CartProductRepository;
import com.example.backend.service.CartProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class CartProductServiceImpl implements CartProductService {
    @Autowired
    private CartProductRepository shoppingListProductRepository;
    @Override
    public CartProduct save(CartProduct product) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.save(product);
    }

    @Override
    public CartProduct findById(String id) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.findById(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.deleteById(id);
    }

    @Override
    public CartProduct updateById(CartProduct dto) throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.updateById(dto);
    }

    @Override
    public List<CartProduct> findAll() throws ExecutionException, InterruptedException {
        return shoppingListProductRepository.findAll();
    }
}
