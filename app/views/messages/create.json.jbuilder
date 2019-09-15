json.id @message.id
json.user_name @message.user.name
json.text @message.text
json.image @message.image
json.date Time.now.strftime("%Y/%m/%d %H:%M")