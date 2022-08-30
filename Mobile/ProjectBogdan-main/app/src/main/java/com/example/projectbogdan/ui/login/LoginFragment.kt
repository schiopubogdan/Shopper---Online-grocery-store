package com.example.projectbogdan.ui.login

import android.app.Activity
import android.content.Intent
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.Toast
import androidx.annotation.StringRes
import com.example.projectbogdan.MainActivity
import com.example.projectbogdan.R
import com.example.projectbogdan.databinding.ActivityLoginBinding
import com.example.projectbogdan.databinding.FragmentLoginBinding
import com.google.firebase.auth.FirebaseAuth

class LoginFragment : Fragment() {
    companion object {
        fun newInstance() = LoginFragment()
    }

    private lateinit var viewModel: LoginViewModel
    private lateinit var binding: FragmentLoginBinding
    private lateinit var mAuth : FirebaseAuth

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        activity?.setTitle("LogIn");
        mAuth = FirebaseAuth.getInstance()
        binding = FragmentLoginBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this, LoginViewModelFactory())
            .get(LoginViewModel::class.java)
        initListeners()
        initObservables()
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this, LoginViewModelFactory()).get(LoginViewModel::class.java)
        // TODO: Use the ViewModel
    }

    private fun initListeners(){
        binding.username.afterTextChanged {
            viewModel.loginDataChanged(
                binding.username.text.toString(),
                binding.password.text.toString()
            )
        }

        binding.password.apply {
            afterTextChanged {
                viewModel.loginDataChanged(
                    binding.username.text.toString(),
                    binding.password.text.toString()
                )
            }

            setOnEditorActionListener { _, actionId, _ ->
                when (actionId) {
                    EditorInfo.IME_ACTION_DONE ->
                        viewModel.login(
                            binding.username.text.toString(),
                            binding. password.text.toString()
                        )
                }
                false
            }

            binding.login.setOnClickListener {
                viewModel.login(binding.username.text.toString(), binding.password.text.toString())
                //signIn(binding.username.text.toString(), binding.password.text.toString())

            }
        }
    }

    private fun initObservables(){
        viewModel.loginFormState.observe(viewLifecycleOwner){
            val loginState = it

            // disable login button unless both username / password is valid
            binding.login.isEnabled = loginState.isDataValid

            if (loginState.usernameError != null) {
                binding.username.error = getString(loginState.usernameError)
            }
            if (loginState.passwordError != null) {
                binding.password.error = getString(loginState.passwordError)
            }
        }

        viewModel.loginResult.observe(viewLifecycleOwner){
            val loginResult = it

            binding.loading.visibility = View.GONE
            if (loginResult.error != null) {
                showLoginFailed(loginResult.error)
            }
            if (loginResult.success != null) {
                updateUiWithUser(loginResult.success)
            }
            activity?.setResult(Activity.RESULT_OK)

            //Complete and destroy login activity once successful
            activity?.finish()
        }

        viewModel.isShowingProgress.observe(viewLifecycleOwner){
            binding.loading.visibility = if(it) View.VISIBLE else View.GONE
        }

        viewModel.successfulSignIn.observe(viewLifecycleOwner){
            startActivity(Intent(context, MainActivity::class.java))
            activity?.finish()
        }
    }

    override fun onStart() {
        super.onStart()
        // Check if user is signed in (non-null) and update UI accordingly.
        val currentUser = mAuth.currentUser
        if (currentUser != null){
//            startActivity(Intent(this,MainActivity::class.java))
//            finish()
        }
        // update ui so if the currentUser exists go directly into the app
    }

    private fun updateUiWithUser(model: LoggedInUserView) {
        val welcome = getString(R.string.welcome)
        val displayName = model.displayName
        // TODO : initiate successful logged in experience
        Toast.makeText(
            context,
            "$welcome $displayName",
            Toast.LENGTH_LONG
        ).show()
    }

    private fun showLoginFailed(@StringRes errorString: Int) {
        Toast.makeText(context, errorString, Toast.LENGTH_SHORT).show()
    }

}

/**
 * Extension function to simplify setting an afterTextChanged action to EditText components.
 */
fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun afterTextChanged(editable: Editable?) {
            afterTextChanged.invoke(editable.toString())
        }

        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}

        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
    })
}