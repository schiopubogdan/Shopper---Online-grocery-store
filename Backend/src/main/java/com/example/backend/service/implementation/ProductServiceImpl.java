package com.example.backend.service.implementation;

import com.example.backend.models.Product;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository ;
    @Override
    public Product save(Product product) throws ExecutionException, InterruptedException {
        return productRepository.save(product);
    }

    @Override
    public Product findById(String id) throws ExecutionException, InterruptedException {
        return productRepository.findById(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return productRepository.deleteById(id);
    }

    @Override
    public Product updateById(Product dto) throws ExecutionException, InterruptedException {
        return productRepository.updateById(dto);
    }

    @Override
    public List<Product> findAll() throws ExecutionException, InterruptedException {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findByCategory(String category) throws ExecutionException, InterruptedException {
        return productRepository.findByCategory(category);
    }

    @Override
    public List<String> findCategoryBrands(String category) throws ExecutionException, InterruptedException {
        List<Product> products = productRepository.findByCategory(category);
        List<String> brands = new ArrayList<>();
        for(Product p : products){
            if(!brands.contains(p.getBrand())) {
                brands.add(p.getBrand());
            }
        }
        return brands;
    }

}
