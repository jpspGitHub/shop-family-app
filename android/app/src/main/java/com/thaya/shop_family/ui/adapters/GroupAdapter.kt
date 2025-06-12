package com.thaya.shop_family.ui.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.thaya.shop_family.databinding.ItemGroupBinding
import com.thaya.shop_family.models.Group
import com.thaya.shop_family.session.UserSession
import com.tunous.swipeactionview.SwipeAction

class GroupAdapter(
    private val onGroupClick: (Group) -> Unit,
    private val onAddUser: (Group) -> Unit,
    private val onAddItem: (Group) -> Unit,
    private val onDelete: (Group) -> Unit,
    private val onLongPress: (Group) -> Unit
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
        holder.binding.swipeView.setOnClickListener { onGroupClick(group) }
        holder.binding.swipeView.setOnLongClickListener { onLongPress(group); true }
        if (isAdmin(group)) {
            holder.binding.swipeView.setLeftSwipeActions(
                SwipeAction(android.R.drawable.ic_menu_add, R.color.color_swipe_add) { onAddUser(group) },
                SwipeAction(android.R.drawable.ic_input_add, R.color.color_swipe_add) { onAddItem(group) }
            )
            holder.binding.swipeView.setRightSwipeActions(
                SwipeAction(android.R.drawable.ic_menu_delete, R.color.color_swipe_delete) { onDelete(group) }
            )
        } else {
            holder.binding.swipeView.setLeftSwipeActions(
                SwipeAction(android.R.drawable.ic_menu_add, R.color.color_swipe_add) { onAddUser(group) },
                SwipeAction(android.R.drawable.ic_input_add, R.color.color_swipe_add) { onAddItem(group) }
            )
            holder.binding.swipeView.setRightSwipeActions()
        }
    }

    fun submitList(list: List<Group>) {
        groups = list
        notifyDataSetChanged()
    }

    fun getGroup(position: Int): Group = groups[position]

    private fun isAdmin(group: Group): Boolean {
        val id = UserSession.userId
        return group.members.any { it.user == id && it.role == "admin" }
    }
}
