package com.example.backend.models;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Data
@Setter
@Getter
public class StorageProduct {
    private String id;
    private String name;
    private String brand;
    private double weight;
    private Date expirationDate;
    private Measure measure;
}
