package com.example.backend.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Setter
@Getter
public class Product {

    private String id;
    private String name;
    private String brand;
    private String description;
    private double rating;
    private double price;
    private double weight;
    private int quantity;
    private boolean hasExpirationDate;
    private Date expirationDate;
    private Category category;
    private Measure measure;
}
