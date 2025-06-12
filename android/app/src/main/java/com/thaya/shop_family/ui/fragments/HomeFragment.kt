package com.thaya.shop_family.ui.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.Glide
import com.google.firebase.auth.FirebaseAuth
import com.thaya.shop_family.R
import com.thaya.shop_family.auth.AuthManager
import com.thaya.shop_family.databinding.FragmentHomeBinding
import com.thaya.shop_family.network.RetrofitClient
import com.thaya.shop_family.session.UserSession
import com.thaya.shop_family.utils.SessionManager
import com.thaya.shop_family.data.AppDatabase
import kotlinx.coroutines.launch

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val auth = FirebaseAuth.getInstance()
    private lateinit var sessionManager: SessionManager

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        sessionManager = SessionManager(requireContext())

        if (sessionManager.fetchAuthToken() == null) {
            findNavController().navigate(R.id.action_homeFragment_to_loginFragment)
            return
        }

        val session = AuthManager.getUserSession()
        binding.userNameTextView.text = session?.name
        binding.userEmailTextView.text = session?.email
        Glide.with(this)
            .load(session?.photoUrl)
            .circleCrop()
            .into(binding.userAvatarImageView)

        lifecycleScope.launch { loadProfile() }

        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_logout -> {
                    lifecycleScope.launch { logout() }
                    true
                }
                R.id.nav_list -> {
                    findNavController().navigate(R.id.action_homeFragment_to_groupListFragment)
                    true
                }
                else -> true
            }
        }
    }

    private suspend fun loadProfile() {
        try {
            val response = RetrofitClient.userService.getUserProfile()
            if(response.isSuccessful){
                val profile = response.body();
                binding.userNameTextView.text = profile?.name
                binding.userEmailTextView.text = profile?.email
                val db = AppDatabase.get(requireContext())
                db.userProfileDao().saveProfile(
                    com.thaya.shop_family.data.UserProfileEntity(
                        id = profile?.id ?: "0",
                        name = profile?.name.toString(),
                        email = profile?.email.toString(),
                        avatar = profile?.avatar
                    )
                )
            } else {
                val cached = AppDatabase.get(requireContext()).userProfileDao().getProfile()
                cached?.let {
                    binding.userNameTextView.text = it.name
                    binding.userEmailTextView.text = it.email
                } ?: Toast.makeText(requireContext(), "Error al obtener perfil", Toast.LENGTH_SHORT).show()
            }

        } catch (e: Exception) {
            Log.e("Profile", "Error", e)
            val cached = AppDatabase.get(requireContext()).userProfileDao().getProfile()
            cached?.let {
                binding.userNameTextView.text = it.name
                binding.userEmailTextView.text = it.email
            } ?: Toast.makeText(requireContext(), "Error al obtener perfil", Toast.LENGTH_SHORT).show()
        }
    }

    private suspend fun logout() {
        try {
            sessionManager.fetchAuthToken()?.let { token ->
                RetrofitClient.authService.logout("Bearer $token")
                auth.signOut()
                sessionManager.clearAuthToken()
                UserSession.jwtToken = null
                findNavController().navigate(R.id.action_homeFragment_to_loginFragment)
            }
        } catch (e: Exception) {
            Toast.makeText(requireContext(), "Fallo en la red", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
