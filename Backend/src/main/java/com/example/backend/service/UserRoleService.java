package com.example.backend.service;

import com.example.backend.entity.Product;
import com.example.backend.entity.UserRole;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface UserRoleService {
    UserRole save (UserRole userRole) throws ExecutionException, InterruptedException;
    UserRole findByUserId (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    UserRole updateById(UserRole dto) throws ExecutionException, InterruptedException;
    List<UserRole> findAll() throws ExecutionException, InterruptedException;
}
