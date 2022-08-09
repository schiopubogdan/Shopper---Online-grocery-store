package com.example.backend.service.implementation;

import com.example.backend.entity.CartProduct;
import com.example.backend.entity.StorageList;
import com.example.backend.entity.StorageProduct;
import com.example.backend.repository.CartProductRepository;
import com.example.backend.repository.StorageListRepository;
import com.example.backend.repository.StorageProductRepository;
import com.example.backend.service.StorageListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
@Service
public class StorageListServiceImpl implements StorageListService {
    @Autowired
    private StorageListRepository storageListRepository;
    @Autowired
    private StorageProductRepository storageProductRepository;
    @Autowired
    private CartProductRepository cartProductRepository;

    @Override
    public StorageList save(StorageList dto) throws ExecutionException, InterruptedException {
        return storageListRepository.save(dto);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return storageListRepository.deleteById(id);
    }

    @Override
    public List<StorageList> findAll() throws ExecutionException, InterruptedException {
        return storageListRepository.findAll();
    }

    @Override
    public StorageList updateById(StorageList dto) throws ExecutionException, InterruptedException {
        return storageListRepository.updateById(dto);
    }

    @Override
    public String addProduct(String cartProductId, String userId) throws ExecutionException, InterruptedException {
        StorageList storageList = storageListRepository.findUserStorageList(userId);
        CartProduct cartProduct = cartProductRepository.findById(cartProductId);

        if(cartProduct.isHasExpirationDate() == true) {
            if(storageList == null) {
                StorageProduct storageProduct = new StorageProduct();
                storageProduct.setBrand(cartProduct.getBrand());
                storageProduct.setName(cartProduct.getName());
                storageProduct.setWeight(cartProduct.getWeight());
                storageProduct.setMeasure(cartProduct.getMeasure());
                storageProduct.setExpirationDate(null);
                storageProductRepository.save(storageProduct);
                List<StorageProduct> storageProducts = new ArrayList<>();
                storageProducts.add(storageProduct);
                StorageList storageList1 = new StorageList();
                storageList1.setUserId(userId);
                storageList1.setProducts(storageProducts);
                storageListRepository.save(storageList1);
                return "Storage list created and product added successfully";
            } else {
                List<StorageProduct> storageProducts = storageList.getProducts();
                StorageProduct storageProduct = new StorageProduct();
                storageProduct.setBrand(cartProduct.getBrand());
                storageProduct.setName(cartProduct.getName());
                storageProduct.setWeight(cartProduct.getWeight());
                storageProduct.setMeasure(cartProduct.getMeasure());
                storageProduct.setExpirationDate(null);
                storageProductRepository.save(storageProduct);
                storageProducts.add(storageProduct);
                storageList.setProducts(storageProducts);
                storageListRepository.updateById(storageList);
                return "Storage list already exists and product added successfully";
            }
        } else {
            return "Product doesn't have expiration date";
        }

    }

    @Override
    public String removeProduct(String storageProductId, String userId) throws ExecutionException, InterruptedException {
        StorageList storageList = storageListRepository.findUserStorageList(userId);
        if(storageList == null) {
            return "Storage list is null";
        } else {
            List<StorageProduct> storageProducts = storageList.getProducts();
            StorageProduct storageProduct = storageProductRepository.findById(storageProductId);
            storageProducts.remove(storageProduct);
            storageList.setProducts(storageProducts);
            storageListRepository.updateById(storageList);
            storageProductRepository.deleteById(storageProductId);
            return "Product removed from storage list";
        }
    }

    @Override
    public List<StorageProduct> findById(String id) throws ExecutionException, InterruptedException {
        StorageList storageList = storageListRepository.findUserStorageList(id);
        List<StorageProduct> storageProducts = null;
        if(storageList != null) {
            storageProducts = storageList.getProducts();
        }
        return storageProducts;
    }
}
