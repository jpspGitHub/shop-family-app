package com.thaya.shop_family.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.thaya.shop_family.R
import com.thaya.shop_family.databinding.FragmentItemListBinding
import com.thaya.shop_family.models.Group
import com.thaya.shop_family.models.Member
import com.thaya.shop_family.network.RetrofitClient
import com.thaya.shop_family.ui.adapters.ItemAdapter
import kotlinx.coroutines.launch

class ItemListFragment : Fragment() {

    private var _binding: FragmentItemListBinding? = null
    private val binding get() = _binding!!

    private lateinit var adapter: ItemAdapter
    private lateinit var group: Group

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentItemListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        group = requireArguments().getSerializable("group") as Group
        //group = requireArguments().getSerializable("group", Class::class.java) as Group;

        adapter = ItemAdapter { Toast.makeText(requireContext(), "Eliminar producto", Toast.LENGTH_SHORT).show() }
        binding.itemsRecyclerView.layoutManager = LinearLayoutManager(requireContext())
        binding.itemsRecyclerView.adapter = adapter
        binding.addItemFab.setOnClickListener {
            Toast.makeText(requireContext(), "Agregar item", Toast.LENGTH_SHORT).show()
        }
        binding.membersButton.text = getString(R.string.members_count, group.members.size)
        binding.membersButton.setOnClickListener {
            val bundle = bundleOf("members" to ArrayList(group.members))
            findNavController().navigate(R.id.action_itemListFragment_to_groupUsersFragment, bundle)
        }
        lifecycleScope.launch { loadItems() }
    }

    private suspend fun loadItems() {
        try {
            val response = RetrofitClient.itemService.getItems(group.id)
            if (response.isSuccessful) {
                adapter.submitList(response.body() ?: emptyList())
            } else {
                Toast.makeText(requireContext(), R.string.error_loading, Toast.LENGTH_SHORT).show()
            }
        } catch (e: Exception) {
            Toast.makeText(requireContext(), R.string.network_error, Toast.LENGTH_SHORT).show()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
