package com.example.projectbogdan.ui.storage

import android.app.Activity.RESULT_OK
import android.content.Intent
import android.graphics.Bitmap
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.projectbogdan.R
import com.example.projectbogdan.data.PreferenceManager
import com.example.projectbogdan.data.model.StorageProduct
import com.example.projectbogdan.databinding.FragmentStorageBinding
import com.example.projectbogdan.ui.notification.NotificationManager
import com.google.firebase.ml.vision.FirebaseVision
import com.google.firebase.ml.vision.common.FirebaseVisionImage
import com.google.firebase.ml.vision.text.FirebaseVisionText
import java.text.SimpleDateFormat
import java.util.*


class StorageFragment : Fragment() {

    companion object {
        fun newInstance() = StorageFragment()
        const val REQUEST_IMAGE_CAPTURE = 1
    }

    private lateinit var viewModel: StorageViewModel
    private lateinit var binding : FragmentStorageBinding
    private lateinit var storageListAdapter: StorageListAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel =
            ViewModelProvider(this, StorageViewModelFactory())
                .get(StorageViewModel::class.java)

        binding = FragmentStorageBinding.inflate(inflater, container, false)

        initObservables()
        initListeners()
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(StorageViewModel::class.java)
        // TODO: Use the ViewModel
    }

    private fun initObservables(){
        val layoutManager= LinearLayoutManager(activity)
        binding.recyclerviewStorageList.layoutManager = layoutManager
        storageListAdapter = StorageListAdapter(viewModel)
        binding.recyclerviewStorageList.adapter = storageListAdapter

        viewModel.isShowingProgress.observe(viewLifecycleOwner){
            binding.swipeRefreshIndicator.isRefreshing = it
        }
        viewModel.storageList.observe(viewLifecycleOwner){
            storageListAdapter.submitList(it)
            storageListAdapter.notifyDataSetChanged()
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                NotificationManager.cancelAllNotifications(requireActivity())
                Log.d("tag_test", "NOTIFICATIONS SET FOR " + it.size)
                for (product in it) {
                    if (product.expirationDate != null && product.expirationDate!!.after(Date())) {
                        NotificationManager.scheduleNotification(
                            requireActivity(),
                            product.expirationDate!!.time,
                            getString(R.string.your_product_has_expired),
                            product.name,
                            product.id
                        )
                    }
                        if (product.expirationDate != null && Date(product.expirationDate!!.time - 24 * 3600 * 1000).after(Date())) {
                        NotificationManager.scheduleNotification(
                            requireActivity(),
                            product.expirationDate!!.time - 24 * 3600 * 1000,
                            getString(R.string.your_product_will_expire_in_24_hrs),
                            product.name,
                            product.id + "a"
                        )
                    }
                }
            }
        }
        viewModel.onScanClicked.observe(viewLifecycleOwner){
            dispatchTakePictureIntent(it)
        }
    }

    var storageProduct: StorageProduct? = null

    private fun dispatchTakePictureIntent(product: StorageProduct){
        // in the method we are displaying an intent to capture our image.
        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

        // on below line we are calling a start activity
        // for result method to get the image captured.
        if(activity?.packageManager?.let { takePictureIntent.resolveActivity(it) } != null){
            storageProduct = product
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            // on below line we are getting
            // data from our bundles. .
            val extras = data?.extras
            val imageBitmap: Bitmap = extras?.get("data") as Bitmap

            detectText(imageBitmap)
        }
    }

    private fun detectText(imageBitmap: Bitmap){
        val image = FirebaseVisionImage.fromBitmap(imageBitmap)
        val detector = FirebaseVision.getInstance().onDeviceTextRecognizer
        detector.processImage(image).addOnSuccessListener {
            processText(it)
        }.addOnFailureListener {
            Toast.makeText(context, "Failed to detect the text from image..", Toast.LENGTH_SHORT).show()
        }
    }

    private fun processText(text: FirebaseVisionText){
        val blocks = text.textBlocks
        if(blocks.size == 0){
            Toast.makeText(context, "No text", Toast.LENGTH_SHORT).show()
            return
        }
        for(block in blocks){
            val text = block.text
            Log.d("NUSH", text)
            val regex = "(0[1-9]|[12][0-9]|3[01])[- \\/.](0[1-9]|1[012])[- \\/.](19|20)\\d\\d".toRegex()
            val find = regex.find(text)
            if(find != null){
                storageProduct?.expirationDate = SimpleDateFormat("dd/MM/yyyy").parse(find.value)
                viewModel.onTimePickerClicked(storageProduct!!)
                break
            }else{
                Log.d("NUSH", "null")
            }
        }
    }


    private fun initListeners(){
        binding.swipeRefreshIndicator.setOnRefreshListener {
            viewModel.getStorageListData()
        }
    }

}