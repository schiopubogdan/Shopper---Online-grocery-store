package com.example.backend.service.implementation;

import com.example.backend.entity.Address;
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
        List<Address> addresses = addressRepository.findAll();
        Address address = null;
        for(Address a : addresses) {
            if(id.equals(a.getUserId())) {
                address = a;
            }
        }
        return address;
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
