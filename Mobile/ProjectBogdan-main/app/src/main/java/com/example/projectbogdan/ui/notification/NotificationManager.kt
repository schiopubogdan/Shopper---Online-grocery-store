package com.example.projectbogdan.ui.notification

import android.app.AlarmManager

import android.app.PendingIntent
import android.content.Context

import android.content.Intent
import android.os.Build
import com.example.projectbogdan.data.PreferenceManager
import java.util.*


object NotificationManager {

    fun scheduleNotification(context: Context, time: Long, title: String?, text: String?, id: String) {
        val intent = Intent(context, NotificationReceiver::class.java)
        intent.putExtra("title", title)
        intent.putExtra("text", text)
        intent.action = Date().time.toString()
        val requestCode = Random().nextInt(Int.MAX_VALUE) + 1
        val pending =
            PendingIntent.getBroadcast(context, requestCode, intent, PendingIntent.FLAG_IMMUTABLE)
        // Schedule notification
        val manager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, time, pending)
            PreferenceManager.setValue(id, requestCode.toString())
        }
    }

    fun cancelAllNotifications(context: Context) {
        val preferences = PreferenceManager.getPreferences()
        for (id in preferences.all.values) {
            val intent = Intent(context, NotificationReceiver::class.java)
            val pending =
                PendingIntent.getBroadcast(context, (id as String).toInt(), intent, PendingIntent.FLAG_IMMUTABLE)
            val manager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            manager.cancel(pending)
        }
        PreferenceManager.clear()
    }

    fun cancelNotification(context: Context, id: String) {
        val code = PreferenceManager.getValue(id)
        if (code != null) {
            val intent = Intent(context, NotificationReceiver::class.java)
            val pending =
                PendingIntent.getBroadcast(context, code.toInt(), intent, PendingIntent.FLAG_IMMUTABLE)
            val manager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            manager.cancel(pending)
            PreferenceManager.clearEntry(id)
        }
    }
}