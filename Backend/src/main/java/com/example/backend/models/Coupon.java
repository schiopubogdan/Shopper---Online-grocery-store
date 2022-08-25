package com.example.backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class Coupon {
    private String id;
    private String userId;
    private double procent;
    private String code;
}
