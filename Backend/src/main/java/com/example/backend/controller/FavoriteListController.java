package com.example.backend.controller;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.FavoriteList;
import com.example.backend.service.FavoriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/favorite")
public class FavoriteListController {

    @Autowired
    private FavoriteListService favoriteListService;

    @GetMapping("/get")
    public ResponseEntity findByUserId(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody FavoriteList dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody FavoriteList dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.deleteById(id));
    }
    @PostMapping("/add")
    public ResponseEntity addProduct(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.addProduct(dto.getProductId(),dto.getUserId()));
    }
    @PostMapping("/remove")
    public ResponseEntity removeProduct(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.removeProduct(dto.getProductId(),dto.getUserId()));
    }
    @PostMapping("/check")
    public ResponseEntity checkProduct(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(favoriteListService.checkProduct(dto.getProductId(),dto.getUserId()));
    }


}
