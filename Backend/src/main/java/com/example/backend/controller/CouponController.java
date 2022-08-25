package com.example.backend.controller;

import com.example.backend.dto.CouponDTO;
import com.example.backend.models.Coupon;
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
    @PostMapping("/redeem")
    public ResponseEntity redeem(@RequestBody CouponDTO dto) throws ExecutionException,
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
    @PostMapping("/check")
    public ResponseEntity checkCouponCode(@RequestParam String couponCode) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(couponService.checkCouponCode(couponCode));
    }
}
