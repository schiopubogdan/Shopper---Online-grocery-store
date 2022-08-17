package com.example.backend.controller;

import com.example.backend.entity.Coupon;
import com.example.backend.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/coupon")
public class CouponController {
    @Autowired
    private CouponService couponService;

    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(couponService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Coupon dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(couponService.save(dto));
    }
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody Coupon dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(couponService.create(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody Coupon dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(couponService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(couponService.deleteById(id));
    }
    @GetMapping("/get")
    public ResponseEntity findByUserId(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(couponService.findByUserId(id));
    }
}
