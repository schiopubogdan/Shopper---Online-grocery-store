package com.example.backend.controller;

import com.example.backend.models.StorageProduct;
import com.example.backend.service.StorageProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/storage-product")
public class StorageProductController {
    @Autowired
    private StorageProductService storageProductService;

    @GetMapping("/get")
    public ResponseEntity findById(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(storageProductService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageProductService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody StorageProduct dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageProductService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody StorageProduct dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageProductService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageProductService.deleteById(id));
    }
}
