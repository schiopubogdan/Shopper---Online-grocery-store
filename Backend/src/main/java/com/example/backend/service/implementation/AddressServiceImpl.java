package com.example.backend.service.implementation;

import com.example.backend.models.Address;
import com.example.backend.repository.AddressRepository;
import com.example.backend.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Address save(Address address) throws ExecutionException, InterruptedException {
        return addressRepository.save(address);
    }

    @Override
    public Address findById(String id) throws ExecutionException, InterruptedException {
        return addressRepository.findById(id);
    }

    @Override
    public Address findByUserId(String id) throws ExecutionException, InterruptedException {
       return addressRepository.findByUserId(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return addressRepository.deleteById(id);
    }

    @Override
    public Address updateById(Address dto) throws ExecutionException, InterruptedException {
        return addressRepository.updateById(dto);
    }

    @Override
    public List<Address> findAll() throws ExecutionException, InterruptedException {
        return addressRepository.findAll();
    }
}
