package com.example.backend.service.implementation;

import com.example.backend.entity.UserRole;
import com.example.backend.repository.UserRoleRepository;
import com.example.backend.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;


    @Override
    public UserRole save(UserRole userRole) throws ExecutionException, InterruptedException {
        return userRoleRepository.save(userRole);
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
}
