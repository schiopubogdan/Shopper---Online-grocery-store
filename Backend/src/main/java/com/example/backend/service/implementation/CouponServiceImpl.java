package com.example.backend.service.implementation;

import com.example.backend.dto.CouponDTO;
import com.example.backend.entity.Coupon;
import com.example.backend.entity.UserRole;
import com.example.backend.repository.CouponRepository;
import com.example.backend.repository.UserRoleRepository;
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
    @Autowired
    private UserRoleRepository userRoleRepository;
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
    public Coupon create(CouponDTO dto) throws ExecutionException, InterruptedException {
        UserRole userRole = userRoleRepository.findByUserId(dto.getUserId());
        userRole.setOrders(userRole.getOrders()- dto.getOrders());
        userRoleRepository.updateById(userRole);
        Coupon coupon = new Coupon();
        coupon.setUserId(dto.getUserId());
        coupon.setProcent(dto.getProcent());
        int length = 10;
        boolean useLetters = true;
        boolean useNumbers = false;
        String generatedString = RandomStringUtils.random(length, useLetters, useNumbers);
        coupon.setCode(generatedString);
        return couponRepository.save(coupon);
    }

    @Override
    public Coupon checkCouponCode(String couponCode) throws ExecutionException, InterruptedException {
        return couponRepository.checkCouponCode(couponCode);
    }
}
