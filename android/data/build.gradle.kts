plugins {
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
}

android {
    namespace = "com.thaya.shop_family.data"
}

dependencies {
    implementation(libs.coroutines.core)
    implementation(libs.room.runtime)
    kapt(libs.room.runtime)
}
