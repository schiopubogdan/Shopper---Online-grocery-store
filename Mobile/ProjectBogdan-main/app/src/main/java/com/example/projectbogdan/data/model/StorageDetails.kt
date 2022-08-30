package com.example.projectbogdan.data.model

data class StorageDetails(
    val id: String = "",
    val userId: String = "",
    val products: List<StorageProduct> = emptyList()
)