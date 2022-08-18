package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CouponDTO {
    private String userId;
    private double procent;
    private int orders;
    private String code;
}
