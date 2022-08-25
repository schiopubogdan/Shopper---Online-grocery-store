package com.example.backend.service.implementation;

import com.example.backend.models.FavoriteList;
import com.example.backend.models.Product;
import com.example.backend.repository.FavoriteListRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.FavoriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FavoriteListServiceImpl implements FavoriteListService {
    @Autowired
    private FavoriteListRepository favoriteListRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public FavoriteList save(FavoriteList dto) throws ExecutionException, InterruptedException {
        return favoriteListRepository.save(dto);
    }

    @Override
    public List<Product> findById(String id) throws ExecutionException, InterruptedException {
        return favoriteListRepository.findUserFavoriteList(id).getProducts();
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return favoriteListRepository.deleteById(id);
    }

    @Override
    public List<FavoriteList> findAll() throws ExecutionException, InterruptedException {
        return favoriteListRepository.findAll();
    }

    @Override
    public FavoriteList updateById(FavoriteList dto) throws ExecutionException, InterruptedException {
        return favoriteListRepository.updateById(dto);
    }

    @Override
    public String addProduct(String productId, String userId) throws ExecutionException, InterruptedException {
        FavoriteList favoriteList = favoriteListRepository.findUserFavoriteList(userId);
        Product product = productRepository.findById(productId);

        if(favoriteList == null) {
            FavoriteList favoriteList1 = new FavoriteList();
            List<Product> newFavoriteList = new ArrayList<>();
            newFavoriteList.add(product);
            favoriteList1.setUserId(userId);
            favoriteList1.setProducts(newFavoriteList);
            favoriteListRepository.save(favoriteList1);
            return "Favorite list created and product added successfully";
        } else {
            List<Product> products = favoriteList.getProducts();
            boolean alreadyPresent = false;
            for(Product p : products) {
                if(p.getName().equals(product.getName())) {
                    alreadyPresent = true;
                }
            }
            if(alreadyPresent) {
                return "Favorite list already contains this product";
            }
            products.add(product);
            favoriteList.setProducts(products);
            favoriteListRepository.updateById(favoriteList);
            return "Favorite list already exists and product added successfully";
        }
    }

    @Override
    public String removeProduct(String productId, String userId) throws ExecutionException, InterruptedException {
        FavoriteList favoriteList = favoriteListRepository.findUserFavoriteList(userId);
        if(favoriteList == null) {
            return "favlist null";
        } else {
            List<Product> products = favoriteList.getProducts();
            Product product = productRepository.findById(productId);
            products.remove(product);
            favoriteList.setProducts(products);
            favoriteListRepository.updateById(favoriteList);
            return "product removed from favlist";
        }
    }

    @Override
    public Boolean checkProduct(String productId, String userId) throws ExecutionException, InterruptedException {
        FavoriteList favoriteList = favoriteListRepository.findUserFavoriteList(userId);
        if(favoriteList == null) {
            return false;
        } else {
            boolean isPresent = false;
            List<Product> products = favoriteList.getProducts();
            for(Product p : products) {
                if(p.getId().equals(productId)){
                    isPresent = true;
                }
            }
            return isPresent;
        }
    }

}
