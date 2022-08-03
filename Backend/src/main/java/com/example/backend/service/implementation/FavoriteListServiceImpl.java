package com.example.backend.service.implementation;

import com.example.backend.entity.FavoriteList;
import com.example.backend.entity.Product;
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
        if(favoriteList == null) {
            return "favlist null";
        } else {
            Product product = productRepository.findById(productId);
            if(product == null) {
                return "product null";
            } else {
                List<Product> products = favoriteList.getProducts();
                if(products == null) {
                    List<Product> newProductList = new ArrayList<>();
                    newProductList.add(product);
                    favoriteList.setProducts(newProductList);
                    favoriteListRepository.updateById(favoriteList);
                } else {
                    boolean alreadyPresent = false;
                    for(Product p : products) {
                        if(p.equals(product)) {
                          alreadyPresent = true;
                        }
                    }
                    if(!alreadyPresent){
                        products.add(product);
                        favoriteList.setProducts(products);
                        favoriteListRepository.updateById(favoriteList);
                    } else {
                        return "product already in favlist";
                    }

                }

            }
            return "product added to favlist";
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

}
