package com.example.backend.service;

import com.example.backend.dto.ClientInfoDTO;
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
    List<UserRole> getEmployees() throws ExecutionException, InterruptedException;
    UserRole updateOrdersStreak(UserRole dto) throws ExecutionException, InterruptedException;
    ClientInfoDTO getClientInfo(String id) throws ExecutionException, InterruptedException;
}
