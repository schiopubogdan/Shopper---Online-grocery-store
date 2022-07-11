package com.example.backend.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class Product {

    private String id;
    private String name;
    private String description;
}
