package com.example.backend.service;

import com.example.backend.models.Address;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface AddressService {
    Address save (Address address) throws ExecutionException, InterruptedException;
    Address findById (String id) throws ExecutionException, InterruptedException;
    Address findByUserId (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    Address updateById(Address dto) throws ExecutionException, InterruptedException;
    List<Address> findAll() throws ExecutionException, InterruptedException;
}
