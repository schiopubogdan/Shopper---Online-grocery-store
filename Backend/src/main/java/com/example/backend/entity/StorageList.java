package com.example.backend.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Setter
@Getter
public class StorageList {
    private String id;
    private String userId;
    private List<StorageProduct> products;
}
