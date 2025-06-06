package com.thaya.shop_family.data

class UserRepository(private val dao: UserProfileDao) {
    suspend fun saveProfile(entity: UserProfileEntity) = dao.saveProfile(entity)
    suspend fun getProfile(): UserProfileEntity? = dao.getProfile()
}
