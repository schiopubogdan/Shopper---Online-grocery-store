package com.example.backend.controller;

import com.example.backend.entity.Address;
import com.example.backend.entity.UserRole;
import com.example.backend.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private  AddressService addressService;

    @GetMapping("/get")
    public ResponseEntity findById(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(addressService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(addressService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Address dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(addressService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody Address dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(addressService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(addressService.deleteById(id));
    }

}
