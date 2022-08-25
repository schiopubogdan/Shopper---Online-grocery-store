package com.example.backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Setter
@Getter
public class ShoppingList {
    private String id;
    private String userId;
    private List<CartProduct> products;
    private double total;
    private boolean couponUsed;
    private String couponCode;
    private double discount;

}
