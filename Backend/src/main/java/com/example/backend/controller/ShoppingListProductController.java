package com.example.backend.controller;

import com.example.backend.entity.ShoppingListProduct;
import com.example.backend.service.ShoppingListProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/shopping-list-product")
public class ShoppingListProductController {
    @Autowired
    private ShoppingListProductService shoppingListProductService;

    @GetMapping("/get")
    public ResponseEntity findById(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(shoppingListProductService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListProductService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody ShoppingListProduct dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListProductService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody ShoppingListProduct dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListProductService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListProductService.deleteById(id));
    }

}
