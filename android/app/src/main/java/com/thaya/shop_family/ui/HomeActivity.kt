package com.thaya.shop_family.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.firebase.auth.FirebaseAuth
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.thaya.shop_family.R
import com.thaya.shop_family.auth.AuthManager
import com.thaya.shop_family.databinding.ActivityHomeBinding

class HomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityHomeBinding
    private val auth = FirebaseAuth.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val session = AuthManager.getUserSession()

        binding.userNameTextView.text = session?.name
        binding.userEmailTextView.text = session?.email

        Glide.with(this)
            .load(session?.photoUrl)
            .circleCrop()
            .into(binding.userAvatarImageView)

        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_logout -> {
                    auth.signOut()
                    startActivity(Intent(this, LoginActivity::class.java))
                    finish()
                    true
                }
                else -> true // Dummy items
            }
        }
    }
}
