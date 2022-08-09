package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartProductDTO {
    private String productId;
    private String userId;
    private int quantity;
}
