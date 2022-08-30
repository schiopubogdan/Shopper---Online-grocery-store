package com.example.projectbogdan.ui.notification

import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import androidx.core.app.NotificationCompat
import com.example.projectbogdan.R
import com.example.projectbogdan.ui.login.LoginActivity


class NotificationReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {

        val notificationIntent = Intent(context, LoginActivity::class.java)

        notificationIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP

        val pendingIntent = PendingIntent.getActivity(context, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE)

        // Build notification based on Intent
        val notificationBuilder = NotificationCompat.Builder(context, "all_notifications")
            .setSmallIcon(R.drawable.ic_baseline_warning_24)
            .setLargeIcon(BitmapFactory.decodeResource(context.resources, R.drawable.ic_baseline_warning_24))
            .setContentTitle(intent.getStringExtra("title"))
            .setContentText(intent.getStringExtra("text"))
            .setContentIntent(pendingIntent)
            .setDefaults(NotificationCompat.DEFAULT_ALL)
            .setStyle(NotificationCompat.BigTextStyle())
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setAutoCancel(true)

        var notification : Notification? = null
        if (intent.getStringExtra("title").equals(context.resources.getString(R.string.your_product_has_expired))) {
            notification = notificationBuilder.setColor(context.resources.getColor(R.color.red)).build()
        } else if (intent.getStringExtra("title").equals(context.resources.getString(R.string.your_product_will_expire_in_24_hrs))) {
            notification = notificationBuilder.setColor(context.resources.getColor(R.color.orange)).build()
        }

        // Show notification
        if (notification != null) {
            val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.notify(123, notification)
        }

    }
}