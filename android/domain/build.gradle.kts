plugins {
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.thaya.shop_family.domain"
}

dependencies {
    implementation(project(":data"))
    implementation(libs.coroutines.core)
}
