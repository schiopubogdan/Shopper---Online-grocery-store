package com.example.projectbogdan.ui.profile

import android.content.Intent
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.projectbogdan.R
import com.example.projectbogdan.databinding.FragmentProfileBinding
import com.example.projectbogdan.ui.login.LoginActivity

class ProfileFragment : Fragment() {

    companion object {
        fun newInstance() = ProfileFragment()
    }
    private lateinit var binding: FragmentProfileBinding

    private lateinit var viewModel: ProfileViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel =
            ViewModelProvider(this, ProfileViewModelFactory())
                .get(ProfileViewModel::class.java)
        binding = FragmentProfileBinding.inflate(inflater, container, false)

        initObservables()
        initListeners()
        return binding.root
    }
    private fun initObservables(){
        viewModel.email.observe(viewLifecycleOwner) {
            binding.textView.text = getString(R.string.logged_in_as, it)
        }
    }

    private fun initListeners(){
        binding.buttonLogOut.setOnClickListener {
            viewModel.logOut()
            activity?.startActivity(Intent(context, LoginActivity::class.java))
            activity?.finish()
        }
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(ProfileViewModel::class.java)
        // TODO: Use the ViewModel
    }

}