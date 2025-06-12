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
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import com.thaya.shop_family.R
import com.thaya.shop_family.databinding.FragmentGroupListBinding
import com.thaya.shop_family.models.Group
import com.thaya.shop_family.network.RetrofitClient
import com.thaya.shop_family.ui.adapters.GroupAdapter
import kotlinx.coroutines.launch

class GroupListFragment : Fragment() {

    private var _binding: FragmentGroupListBinding? = null
    private val binding get() = _binding!!

    private lateinit var adapter: GroupAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentGroupListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        adapter = GroupAdapter(
            onGroupClick = { group ->
                val bundle = Bundle().apply { putSerializable("group", group) }
                findNavController().navigate(R.id.action_groupListFragment_to_itemListFragment, bundle)
            },
            onAddUser = { Toast.makeText(requireContext(), "Agregar usuario", Toast.LENGTH_SHORT).show() },
            onAddItem = { Toast.makeText(requireContext(), "Agregar item", Toast.LENGTH_SHORT).show() },
            onDelete = { Toast.makeText(requireContext(), "Eliminar grupo", Toast.LENGTH_SHORT).show() },
            onLongPress = { showGroupOptions(it) }
        )
        binding.groupsRecyclerView.layoutManager = LinearLayoutManager(requireContext())
        binding.groupsRecyclerView.adapter = adapter
        attachSwipeActions()
        lifecycleScope.launch { loadGroups() }

        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    findNavController().navigate(R.id.homeFragment)
                    true
                }
                else -> true
            }
        }
    }

    private fun attachSwipeActions() {
        val callback = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT) {
            override fun onMove(
                recyclerView: RecyclerView,
                viewHolder: RecyclerView.ViewHolder,
                target: RecyclerView.ViewHolder
            ): Boolean = false

            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                val group = adapter.getGroup(viewHolder.adapterPosition)
                showGroupOptions(group)
                adapter.notifyItemChanged(viewHolder.adapterPosition)
            }
        }
        ItemTouchHelper(callback).attachToRecyclerView(binding.groupsRecyclerView)
    }

    private fun showGroupOptions(group: Group) {
        val options = arrayOf("Agregar usuario", "Agregar item", "Eliminar grupo")
        androidx.appcompat.app.AlertDialog.Builder(requireContext())
            .setTitle(group.name)
            .setItems(options) { _, which ->
                when (which) {
                    0 -> Toast.makeText(requireContext(), "Agregar usuario", Toast.LENGTH_SHORT).show()
                    1 -> Toast.makeText(requireContext(), "Agregar item", Toast.LENGTH_SHORT).show()
                    2 -> Toast.makeText(requireContext(), "Eliminar grupo", Toast.LENGTH_SHORT).show()
                }
            }
            .setOnDismissListener { adapter.notifyDataSetChanged() }
            .show()
    }

    private suspend fun loadGroups() {
        try {
            val response = RetrofitClient.groupService.getGroups()
            if (response.isSuccessful) {
                adapter.submitList(response.body() ?: emptyList())
            } else {
                Toast.makeText(requireContext(), R.string.error_loading, Toast.LENGTH_SHORT).show()
            }
        } catch (e: Exception) {
            Log.e("loadGroups", "getGroups - failed", e)
            Toast.makeText(requireContext(), R.string.network_error, Toast.LENGTH_SHORT).show()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
