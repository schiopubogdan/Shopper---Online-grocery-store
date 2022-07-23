package com.example.backend.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class Address {
    private String id;
    private String city;
    private String street;
    private String number;
    private String mentions;
}
