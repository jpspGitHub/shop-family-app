package com.thaya.shop_family.ui.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.thaya.shop_family.databinding.ItemGroupBinding
import com.thaya.shop_family.models.Group
import com.thaya.shop_family.session.UserSession

class GroupAdapter(
    private val onGroupClick: (Group) -> Unit,
    private val onAddUser: (Group) -> Unit,
    private val onAddItem: (Group) -> Unit,
    private val onDelete: (Group) -> Unit
) : RecyclerView.Adapter<GroupAdapter.GroupViewHolder>() {

    private var groups: List<Group> = emptyList()

    inner class GroupViewHolder(val binding: ItemGroupBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GroupViewHolder {
        val binding = ItemGroupBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return GroupViewHolder(binding)
    }

    override fun getItemCount(): Int = groups.size

    override fun onBindViewHolder(holder: GroupViewHolder, position: Int) {
        val group = groups[position]
        holder.binding.groupNameTextView.text = group.name
        holder.binding.root.setOnClickListener { onGroupClick(group) }
        holder.binding.addUserButton.setOnClickListener { onAddUser(group) }
        holder.binding.addItemButton.setOnClickListener { onAddItem(group) }
        if (isAdmin(group)) {
            holder.binding.deleteGroupButton.visibility = View.VISIBLE
            holder.binding.deleteGroupButton.setOnClickListener { onDelete(group) }
        } else {
            holder.binding.deleteGroupButton.visibility = View.GONE
        }
    }

    fun submitList(list: List<Group>) {
        groups = list
        notifyDataSetChanged()
    }

    private fun isAdmin(group: Group): Boolean {
        val id = UserSession.userId
        return group.members.any { it.user == id && it.role == "admin" }
    }
}
