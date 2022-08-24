package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ClientInfoDTO {
    private int couponsUsed;
    private double couponsTotalValue;
    private int ordersThisMonth;
    private double ordersThisMonthValue;
    private int ordersLastMonth;
    private double ordersLastMonthValue;
}
