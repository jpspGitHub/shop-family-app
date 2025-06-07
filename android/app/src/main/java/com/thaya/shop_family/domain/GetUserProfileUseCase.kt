package com.thaya.shop_family.domain

import com.thaya.shop_family.data.UserProfileEntity
import com.thaya.shop_family.data.UserRepository

class GetUserProfileUseCase(private val repo: UserRepository) {
    suspend operator fun invoke(): UserProfileEntity? = repo.getProfile()
}
