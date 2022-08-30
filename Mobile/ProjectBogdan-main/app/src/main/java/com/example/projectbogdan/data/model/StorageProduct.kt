package com.example.projectbogdan.data.model

import java.util.*

data class StorageProduct(
    val id: String = "",
    val name: String = "",
    val brand: String = "",
    var weight: Double = 0.0,
    var expirationDate: Date? = null,
    var measure: String = ""
)