package com.thaya.shop_family.ui.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.thaya.shop_family.databinding.ItemItemBinding
import com.thaya.shop_family.models.Item
import com.tunous.swipeactionview.SwipeAction

class ItemAdapter(
    private val onDelete: (Item) -> Unit,
    private val onLongPress: (Item) -> Unit
) : RecyclerView.Adapter<ItemAdapter.ItemViewHolder>() {

    private var items: List<Item> = emptyList()

    inner class ItemViewHolder(val binding: ItemItemBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val binding = ItemItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ItemViewHolder(binding)
    }

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        val item = items[position]
        holder.binding.itemNameTextView.text = item.name
        holder.binding.itemQuantityTextView.text = item.quantity
        holder.binding.swipeView.setOnLongClickListener { onLongPress(item); true }
        holder.binding.swipeView.setLeftSwipeActions(
            SwipeAction(android.R.drawable.checkbox_on_background, R.color.color_swipe_add) { },
            SwipeAction(android.R.drawable.ic_menu_delete, R.color.color_swipe_delete) { onDelete(item) }
        )
        holder.binding.swipeView.setRightSwipeActions(
            SwipeAction(android.R.drawable.ic_menu_delete, R.color.color_swipe_delete) { onDelete(item) }
        )
    }

    fun submitList(list: List<Item>) {
        items = list
        notifyDataSetChanged()
    }

    fun getItem(position: Int): Item = items[position]
}
