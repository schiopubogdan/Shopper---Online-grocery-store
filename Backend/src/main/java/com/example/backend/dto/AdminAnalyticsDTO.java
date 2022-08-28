package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AdminAnalyticsDTO {
    private int[] orders;
    private double[] incomes;
}
