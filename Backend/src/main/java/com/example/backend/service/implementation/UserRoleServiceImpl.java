package com.example.backend.service.implementation;

import com.example.backend.dto.ClientInfoDTO;
import com.example.backend.models.*;
import com.example.backend.repository.*;
import com.example.backend.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private FavoriteListRepository favoriteListRepository;
    @Autowired
    private ShoppingListRepository shoppingListRepository;
    @Autowired
    private StorageListRepository storageListRepository;
    @Autowired
    private OrderRepository orderRepository;


    @Override
    public UserRole save(UserRole userRole) throws ExecutionException, InterruptedException {
        UserRole user =  userRoleRepository.save(userRole);
        user.setCreatedAt(new Date());
        FavoriteList favoriteList = new FavoriteList();
        favoriteList.setProducts(new ArrayList<>());
        ShoppingList shoppingList = new ShoppingList();
        shoppingList.setProducts(new ArrayList<>());
        StorageList storageList = new StorageList();
        storageList.setProducts(new ArrayList<>());
        favoriteList.setUserId(user.getId());
        shoppingList.setUserId(user.getId());
        storageList.setUserId(user.getId());
        userRoleRepository.updateById(user);
        favoriteListRepository.save(favoriteList);
        shoppingListRepository.save(shoppingList);
        storageListRepository.save(storageList);
        return user;
    }

    @Override
    public UserRole findByUserId(String id) throws ExecutionException, InterruptedException {
        return userRoleRepository.findByUserId(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return userRoleRepository.deleteById(id);
    }

    @Override
    public UserRole updateById(UserRole dto) throws ExecutionException, InterruptedException {
        return userRoleRepository.updateById(dto);
    }

    @Override
    public List<UserRole> findAll() throws ExecutionException, InterruptedException {
        return userRoleRepository.findAll();
    }

    @Override
    public List<UserRole> getEmployees() throws ExecutionException, InterruptedException {
        return userRoleRepository.getEmployees();
    }

    @Override
    public UserRole updateOrdersStreak(UserRole dto) throws ExecutionException, InterruptedException {
        UserRole userRole = userRoleRepository.findByUserId(dto.getId());
        userRole.setOrders(userRole.getOrders()-dto.getOrders());
        return userRoleRepository.updateById(userRole);
    }

    @Override
    public ClientInfoDTO getClientInfo(String id) throws ExecutionException, InterruptedException {
        ClientInfoDTO dto = new ClientInfoDTO();
        int ordersThisMonth = 0;
        int ordersLastMonth = 0;
        double ordersThisMonthValue = 0;
        double ordersLastMonthValue = 0;

        UserRole client = userRoleRepository.findByUserId(id);
        dto.setCouponsUsed(client.getCouponsUsed());
        dto.setCouponsTotalValue(client.getCouponsTotalValue());

        List<Order> clientOrders = orderRepository.findByUserId(id);
        Date currentDate = new Date();
        LocalDate date =  LocalDate.ofInstant(
                currentDate.toInstant(), ZoneId.systemDefault());
        LocalDate earlierDate = date.minusMonths(1);
        for(Order o : clientOrders) {
            LocalDate orderDate = LocalDate.ofInstant(o.getDate().toInstant(), ZoneId.systemDefault());
            if(orderDate.getMonth().equals(date.getMonth())) {
                ordersThisMonth ++;
                ordersThisMonthValue += o.getTotal();
            }
            if((orderDate.getMonth()).equals(earlierDate.getMonth())) {
                ordersLastMonth ++;
                ordersLastMonthValue += o.getTotal();
            }
        }
        dto.setOrdersLastMonth(ordersLastMonth);
        dto.setOrdersLastMonthValue(ordersLastMonthValue);
        dto.setOrdersThisMonth(ordersThisMonth);
        dto.setOrdersThisMonthValue(ordersThisMonthValue);

        return dto;
    }
}
