package com.example.projectbogdan.ui.storage

import android.app.DatePickerDialog
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.projectbogdan.R
import com.example.projectbogdan.data.model.StorageProduct
import java.text.SimpleDateFormat
import java.util.*

class StorageItemViewHolder(
    private val clickListener: ClickListener,
    view: View
) : RecyclerView.ViewHolder(view){

    private val textViewProductName = view.findViewById<TextView>(R.id.textViewProductName)
    private val textViewProductExpirationDate = view.findViewById<TextView>(R.id.textViewProductExpirationDate)
    private val timePickerButton = view.findViewById<ImageButton>(R.id.timePickerButton)
    private val imageButtonDelete = view.findViewById<ImageButton>(R.id.imageButtonDelete)
    private val scanExpirationDateButton = view.findViewById<ImageButton>(R.id.scanExpirationDateButton)
    private val warningImage = view.findViewById<ImageView>(R.id.warning)

    fun bind(item: StorageProduct){
        textViewProductName.text = item.name
        textViewProductExpirationDate.text = if (item.expirationDate != null) {
            SimpleDateFormat("dd-MM-yyyy").format(item.expirationDate!!)
        } else {
            textViewProductExpirationDate.context.getString(R.string.no_expiration_date)
        }
        warningImage.visibility = View.GONE
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            textViewProductExpirationDate.setTextColor(textViewProductExpirationDate.context.getColor(com.google.android.material.R.color.mtrl_indicator_text_color))
        }
        if (item.expirationDate != null) {
            if (item.expirationDate!!.before(Date())) {
                warningImage.visibility = View.VISIBLE
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    warningImage.setColorFilter(textViewProductExpirationDate.context.getColor(R.color.red))
                    textViewProductExpirationDate.setTextColor(textViewProductExpirationDate.context.getColor(R.color.red))
                }
            } else if (Date(item.expirationDate!!.time - 24 * 3600 * 1000).before(Date())) {
                warningImage.visibility = View.VISIBLE
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    warningImage.setColorFilter(textViewProductExpirationDate.context.getColor(R.color.orange))
                    textViewProductExpirationDate.setTextColor(textViewProductExpirationDate.context.getColor(R.color.orange))
                }
            }
        }
        val calendar = Calendar.getInstance()
        val dateSetListener : DatePickerDialog.OnDateSetListener =
            DatePickerDialog.OnDateSetListener { datePicker, year, month, dayOfMonth ->
                calendar.set(Calendar.YEAR, year)
                calendar.set(Calendar.MONTH, month)
                calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth)
                calendar.set(Calendar.HOUR_OF_DAY, 0)
                calendar.set(Calendar.MINUTE, 0)
                calendar.set(Calendar.SECOND, 0)
                calendar.set(Calendar.MILLISECOND, 0)
                textViewProductExpirationDate.text =
                    SimpleDateFormat("dd-MMM-yyyy", Locale.getDefault()).format(calendar.time)
                item.expirationDate = calendar.time
                clickListener.onTimePickerClicked(item)
            }
        val datePickerDialog = DatePickerDialog(
            textViewProductName.context,
            dateSetListener,
            calendar.get(Calendar.YEAR),
            calendar.get(Calendar.MONTH),
            calendar.get(Calendar.DAY_OF_MONTH)
        )
        timePickerButton.setOnClickListener{
            datePickerDialog.show()
        }
        imageButtonDelete.setOnClickListener{
            clickListener.onDeleteItemClicked(item)
        }
        scanExpirationDateButton.setOnClickListener {
            clickListener.onScanExpirationDateClicked(item)
        }
    }


    interface ClickListener{
        fun onTimePickerClicked(item: StorageProduct)
        fun onDeleteItemClicked(item: StorageProduct)
        fun onScanExpirationDateClicked(item: StorageProduct)
    }

    companion object{
        fun create(
            clickListener: ClickListener,
            parent: ViewGroup
        ): StorageItemViewHolder = StorageItemViewHolder(
            clickListener = clickListener,
            view = LayoutInflater.from(parent.context).inflate(
                R.layout.item_storage_list,
                parent,
                false
            )
        )
    }
}