package com.example.backend.controller;

import com.example.backend.models.Product;
import com.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/get")
    public ResponseEntity findById(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(productService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Product dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody Product dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.deleteById(id));
    }
    @GetMapping("/get-by-category")
    public ResponseEntity findByCategory(@RequestParam String category) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(productService.findByCategory(category));
    }
    @GetMapping("/get-category-brands")
    public ResponseEntity findCategoryBrands(@RequestParam String category) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(productService.findCategoryBrands(category));
    }
}
