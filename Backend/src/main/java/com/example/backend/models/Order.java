package com.example.backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Data
@Setter
@Getter
public class Order {
    private String id;
    private String userId;
    private List<CartProduct> products;
    private Status status;
    private Date date;
    private Date deliveryDate;
    private double total;
    private String workerId;
    private String driverId;
    private String address;

}
