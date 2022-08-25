package com.example.backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Data
@Setter
@Getter
public class CartProduct {
    private String id;
    private String name;
    private String brand;
    private double price;
    private double weight;
    private int quantity;
    private boolean hasExpirationDate;
    private Measure measure;
}
