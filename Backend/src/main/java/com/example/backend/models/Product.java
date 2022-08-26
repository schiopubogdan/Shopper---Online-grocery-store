package com.example.backend.models;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private String id;
    private String name;
    private String brand;
    private String description;
    private double rating;
    private double price;
    private double weight;
    private boolean hasExpirationDate;
    private Category category;
    private Measure measure;
    private String photoURL;
}
