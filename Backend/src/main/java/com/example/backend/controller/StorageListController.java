package com.example.backend.controller;

import com.example.backend.dto.CartProductDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.ShoppingList;
import com.example.backend.entity.StorageList;
import com.example.backend.service.StorageListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/storage")
public class StorageListController {
    @Autowired
    private StorageListService storageListService;

    @GetMapping("/get")
    public ResponseEntity findByUserId(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(storageListService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageListService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody StorageList dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageListService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody StorageList dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageListService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageListService.deleteById(id));
    }
    @PostMapping("/add")
    public ResponseEntity addProduct(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageListService.addProduct(dto.getProductId(), dto.getUserId()));
    }
    @PostMapping("/remove")
    public ResponseEntity removeProduct(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(storageListService.removeProduct(dto.getProductId(),dto.getUserId()));
    }

}
