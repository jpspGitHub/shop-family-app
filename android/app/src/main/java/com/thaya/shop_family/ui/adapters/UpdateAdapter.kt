package com.thaya.shop_family.ui.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.thaya.shop_family.databinding.ItemUpdateBinding

class UpdateAdapter(private var updates: List<String>) : RecyclerView.Adapter<UpdateAdapter.UpdateViewHolder>() {

    inner class UpdateViewHolder(val binding: ItemUpdateBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UpdateViewHolder {
        val binding = ItemUpdateBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return UpdateViewHolder(binding)
    }

    override fun getItemCount(): Int = updates.size

    override fun onBindViewHolder(holder: UpdateViewHolder, position: Int) {
        holder.binding.updateTextView.text = updates[position]
    }

    fun submitList(list: List<String>) {
        updates = list
        notifyDataSetChanged()
    }
}
