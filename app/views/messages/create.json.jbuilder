json.(@message, :text, :image)
json.user_name @message.user.name
json.date Time.now.strftime("%Y/%m/%d %H:%M")
json.id @message.id