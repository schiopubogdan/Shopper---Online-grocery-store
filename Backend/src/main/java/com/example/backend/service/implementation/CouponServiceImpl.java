package com.example.backend.service.implementation;

import com.example.backend.entity.Coupon;
import com.example.backend.repository.CouponRepository;
import com.example.backend.service.CouponService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class CouponServiceImpl implements CouponService {
    @Autowired
    private CouponRepository couponRepository;
    @Override
    public Coupon save(Coupon coupon) throws ExecutionException, InterruptedException {
        return couponRepository.save(coupon);
    }

    @Override
    public Coupon findById(String id) throws ExecutionException, InterruptedException {
        return couponRepository.findById(id);
    }

    @Override
    public List<Coupon> findByUserId(String id) throws ExecutionException, InterruptedException {
        return couponRepository.findByUserId(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return couponRepository.deleteById(id);
    }

    @Override
    public Coupon updateById(Coupon dto) throws ExecutionException, InterruptedException {
        return couponRepository.updateById(dto);
    }

    @Override
    public List<Coupon> findAll() throws ExecutionException, InterruptedException {
        return couponRepository.findAll();
    }

    @Override
    public Coupon create(Coupon dto) throws ExecutionException, InterruptedException {
        Coupon coupon = couponRepository.save(dto);
        int length = 10;
        boolean useLetters = true;
        boolean useNumbers = false;
        String generatedString = RandomStringUtils.random(length, useLetters, useNumbers);
        coupon.setCode(generatedString);
        return couponRepository.updateById(coupon);
    }
}
