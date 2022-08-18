package com.example.backend.service;

import com.example.backend.dto.CouponDTO;
import com.example.backend.entity.Coupon;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public interface CouponService {
    Coupon save (Coupon coupon) throws ExecutionException, InterruptedException;
    Coupon findById (String id) throws ExecutionException, InterruptedException;
    List<Coupon> findByUserId (String id) throws ExecutionException, InterruptedException;
    String deleteById(String id) throws ExecutionException, InterruptedException;
    Coupon updateById(Coupon dto) throws ExecutionException, InterruptedException;
    List<Coupon> findAll() throws ExecutionException, InterruptedException;
    Coupon create(CouponDTO dto) throws ExecutionException, InterruptedException;
    Coupon checkCouponCode(String couponCode) throws ExecutionException, InterruptedException;
}
