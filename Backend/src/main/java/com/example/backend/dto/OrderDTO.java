package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderDTO {
    private String orderId;
    private String userId;
    private String workerId;
    private String driverId;
}
