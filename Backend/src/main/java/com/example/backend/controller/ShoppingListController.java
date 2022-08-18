package com.example.backend.controller;

import com.example.backend.dto.CartProductDTO;
import com.example.backend.dto.CouponDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.ShoppingList;
import com.example.backend.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/shopping")
public class ShoppingListController {
    @Autowired
    private ShoppingListService shoppingListService;

    @GetMapping("/get")
    public ResponseEntity findByUserId(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.findById(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody ShoppingList dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody ShoppingList dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.deleteById(id));
    }
    @PostMapping("/add")
    public ResponseEntity addProduct(@RequestBody CartProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.addProduct(dto.getProductId(), dto.getUserId(),dto.getQuantity()));
    }
    @PostMapping("/remove")
    public ResponseEntity removeProduct(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.removeProduct(dto.getProductId(),dto.getUserId()));
    }
    @PostMapping("/update")
    public ResponseEntity updateQuantity(@RequestBody CartProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.updateProductQuantity(dto.getProductId(), dto.getUserId(), dto.getQuantity()));
    }
    @PostMapping("/clear")
    public ResponseEntity clear(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.clear(dto.getUserId()));
    }
    @PostMapping("/finalize")
    public ResponseEntity finalizeOrder(@RequestBody ProductDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.finalizeOrder(dto.getUserId()));
    }
    @PostMapping("/apply-coupon")
    public ResponseEntity applyCoupon(@RequestBody CouponDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.applyCoupon(dto));
    }
}
