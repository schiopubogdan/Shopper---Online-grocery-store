package com.example.backend.service.implementation;

import com.example.backend.entity.*;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.StorageListRepository;
import com.example.backend.repository.StorageProductRepository;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private StorageProductRepository storageProductRepository;
    @Autowired
    private StorageListRepository storageListRepository;

    @Override
    public Order save(Order order) throws ExecutionException, InterruptedException {
        return orderRepository.save(order);
    }

    @Override
    public Order findById(String id) throws ExecutionException, InterruptedException {
        return orderRepository.findById(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return orderRepository.deleteById(id);
    }

    @Override
    public Order updateById(Order dto) throws ExecutionException, InterruptedException {
        return orderRepository.updateById(dto);
    }

    @Override
    public List<Order> findAll() throws ExecutionException, InterruptedException {
        return orderRepository.findAll();
    }

    @Override
    public String promote(String id,String workerId, String driverId) throws ExecutionException, InterruptedException {
        Order order = orderRepository.findById(id);
        if(order.getStatus().equals(Status.PAID)) {
            order.setStatus(Status.IN_PROGRESS);
            order.setWorkerId(workerId);
            orderRepository.updateById(order);
            return "Order promoted to IN_PROGRESS";
        }
        if(order.getStatus().equals(Status.IN_PROGRESS)) {
            order.setStatus(Status.READY);
            orderRepository.updateById(order);
            return "Order promoted to READY";
        }
        if(order.getStatus().equals(Status.READY) ) {
            //creare de StorageProducts si adaugare in StorageList-ul clientului
            StorageList storageList = storageListRepository.findUserStorageList(order.getUserId());
            List<CartProduct> products = order.getProducts();
            List<StorageProduct> products1 = storageList.getProducts();
            for(CartProduct c : products) {
                if(c.isHasExpirationDate()) {
                    StorageProduct storageProduct = new StorageProduct();
                    storageProduct.setName(c.getName());
                    storageProduct.setBrand(c.getBrand());
                    storageProduct.setWeight(c.getWeight());
                    storageProduct.setMeasure(c.getMeasure());
                    storageProductRepository.save(storageProduct);
                    products1.add(storageProduct);
                }
            }
            storageList.setProducts(products1);
            storageListRepository.save(storageList);
            order.setStatus(Status.DELIVERED);
            order.setDeliveryDate(new Date());
            order.setDriverId(driverId);
            orderRepository.updateById(order);
            return "Order promoted to DELIVERED";
        }
        return "";
    }

    @Override
    public List<Order> findByStatus(String status) throws ExecutionException, InterruptedException {
       return orderRepository.findByStatus(status);
    }

    @Override
    public List<Order> findByUserId(String id) throws ExecutionException, InterruptedException {
        return orderRepository.findByUserId(id);
    }
}
