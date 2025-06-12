package com.thaya.shop_family.ui.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.thaya.shop_family.databinding.ItemUserBinding
import com.thaya.shop_family.models.UserGroup

class UserAdapter : RecyclerView.Adapter<UserAdapter.UserViewHolder>() {

    private var members: List<UserGroup> = emptyList()

    inner class UserViewHolder(val binding: ItemUserBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val binding = ItemUserBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return UserViewHolder(binding)
    }

    override fun getItemCount(): Int = members.size

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        val member = members[position]
        holder.binding.userNameTextView.text = member.user.name
    }

    fun submitList(list: List<UserGroup>) {
        members = list
        notifyDataSetChanged()
    }
}
