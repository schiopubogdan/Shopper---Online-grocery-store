package com.example.backend.service;

import com.example.backend.entity.Product;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutionException;

@Component
public interface ProductService {

    Product save (Product product) throws ExecutionException, InterruptedException;
}
