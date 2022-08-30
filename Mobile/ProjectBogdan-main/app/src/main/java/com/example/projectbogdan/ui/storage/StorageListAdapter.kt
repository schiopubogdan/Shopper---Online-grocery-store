package com.example.projectbogdan.ui.storage

import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import com.example.projectbogdan.data.model.StorageProduct

class StorageListAdapter(
    private val clickListener: StorageItemViewHolder.ClickListener
) : ListAdapter<StorageProduct, StorageItemViewHolder>(REPO_COMPARATOR) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StorageItemViewHolder
            = StorageItemViewHolder.create(clickListener, parent)

    override fun onBindViewHolder(holder: StorageItemViewHolder, position: Int)
            = holder.bind(getItem(position))

    companion object{
        private val REPO_COMPARATOR = object : DiffUtil.ItemCallback<StorageProduct>(){
            override fun areItemsTheSame(
                oldItem: StorageProduct,
                newItem: StorageProduct
            ) = oldItem.id == newItem.id

            override fun areContentsTheSame(
                oldItem: StorageProduct,
                newItem: StorageProduct
            ) = oldItem == newItem
        }
    }
}