package com.thaya.shop_family.auth

data class UserSession(
    val name: String,
    val email: String,
    val photoUrl: String?
)
