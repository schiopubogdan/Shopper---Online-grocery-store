package com.example.backend.controller;

import com.example.backend.entity.CartProduct;
import com.example.backend.service.CartProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/shopping-list-product")
public class CartProductController {
    @Autowired
    private CartProductService cartProductService;

    @GetMapping("/get")
    public ResponseEntity findById(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(cartProductService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(cartProductService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody CartProduct dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(cartProductService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody CartProduct dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(cartProductService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(cartProductService.deleteById(id));
    }

}
