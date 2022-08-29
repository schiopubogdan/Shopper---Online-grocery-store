package com.example.backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Setter
@Getter
public class UserRole {
    private String id;
    private String email;
    private String role;
    private int orders;
    private int couponsUsed;
    private double couponsTotalValue;
    private Date createdAt;


}
