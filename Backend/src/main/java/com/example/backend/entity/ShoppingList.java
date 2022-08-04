package com.example.backend.entity;

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
    private List<ShoppingListProduct> products;
    private double total;

}
