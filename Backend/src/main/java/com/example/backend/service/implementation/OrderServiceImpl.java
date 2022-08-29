package com.example.backend.service.implementation;

import com.example.backend.dto.AdminAnalyticsDTO;
import com.example.backend.models.*;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.StorageListRepository;
import com.example.backend.repository.StorageProductRepository;
import com.example.backend.repository.UserRoleRepository;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
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
    @Autowired
    private UserRoleRepository userRoleRepository;

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
            storageListRepository.updateById(storageList);
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

    @Override
    public AdminAnalyticsDTO getAnalytics() throws ExecutionException, InterruptedException {
        List<Order> orders = orderRepository.findAll();
        List<UserRole> users = userRoleRepository.findAll();
        int[] ordersAnalytics = new int[7];
        double[] incomesAnalytics = new double[7];
        int[] usersAnalytics = new int[7];
        Date currentDate = new Date();
        LocalDate date =  LocalDate.ofInstant(
                currentDate.toInstant(), ZoneId.systemDefault());
        LocalDate earlierDate1 = date.minusDays(1);
        LocalDate earlierDate2 = date.minusDays(2);
        LocalDate earlierDate3 = date.minusDays(3);
        LocalDate earlierDate4 = date.minusDays(4);
        LocalDate earlierDate5 = date.minusDays(5);
        LocalDate earlierDate6 = date.minusDays(6);
        LocalDate earlierDate7 = date.minusDays(7);


        for(Order o : orders) {
            LocalDate orderDate = LocalDate.ofInstant(o.getDate().toInstant(), ZoneId.systemDefault());
            if(orderDate.getDayOfMonth() == earlierDate1.getDayOfMonth()){
                ordersAnalytics[6] ++;
                incomesAnalytics[6] += o.getTotal();
            }
            if(orderDate.getDayOfMonth() == earlierDate2.getDayOfMonth()){
                ordersAnalytics[5] ++;
                incomesAnalytics[5] += o.getTotal();
            }
            if(orderDate.getDayOfMonth() == earlierDate3.getDayOfMonth()){
                ordersAnalytics[4] ++;
                incomesAnalytics[4] += o.getTotal();
            }
            if(orderDate.getDayOfMonth() == earlierDate4.getDayOfMonth()){
                ordersAnalytics[3] ++;
                incomesAnalytics[3] += o.getTotal();
            }
            if(orderDate.getDayOfMonth() == earlierDate5.getDayOfMonth()){
                ordersAnalytics[2] ++;
                incomesAnalytics[2] += o.getTotal();
            }
            if(orderDate.getDayOfMonth() == earlierDate6.getDayOfMonth()){
                ordersAnalytics[1] ++;
                incomesAnalytics[1] += o.getTotal();
            }
            if(orderDate.getDayOfMonth() == earlierDate7.getDayOfMonth()){
                ordersAnalytics[0] ++;
                incomesAnalytics[0] += o.getTotal();
            }
        }
        for(UserRole u : users) {
            if(u.getRole().equals("client") && u.getCreatedAt() != null) { LocalDate userDate = LocalDate.ofInstant(u.getCreatedAt().toInstant(), ZoneId.systemDefault());
                if(userDate.getDayOfMonth() == earlierDate1.getDayOfMonth()){
                    usersAnalytics[6] ++;
                }
                if(userDate.getDayOfMonth() == earlierDate2.getDayOfMonth()){
                    usersAnalytics[5] ++;
                }
                if(userDate.getDayOfMonth() == earlierDate3.getDayOfMonth()){
                    usersAnalytics[4] ++;

                }
                if(userDate.getDayOfMonth() == earlierDate4.getDayOfMonth()){
                    usersAnalytics[3] ++;
                }
                if(userDate.getDayOfMonth() == earlierDate5.getDayOfMonth()){
                    usersAnalytics[2] ++;
                }
                if(userDate.getDayOfMonth() == earlierDate6.getDayOfMonth()){
                    usersAnalytics[1] ++;
                }
                if(userDate.getDayOfMonth() == earlierDate7.getDayOfMonth()){
                    usersAnalytics[0] ++;
                }}

        }
        AdminAnalyticsDTO dto = new AdminAnalyticsDTO();
        dto.setOrders(ordersAnalytics);
        dto.setIncomes(incomesAnalytics);
        dto.setUsers(usersAnalytics);
        return dto;
    }
}
