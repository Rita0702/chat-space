## アプリケーション

chat-space 

## 概要

Ruby on Railsで作成したチャットアプリケーション

## 機能一覧

- ユーザーの新規会員登録、ログイン機能
- 非同期通信によるメッセージの投稿機能
- メッセージの自動更新機能
- チャットグループの作成、チャットメンバーの編集・削除機能
- チャットメンバー検索にインクリメンタルサーチ導入

## 技術一覧

- ruby 2.5.1p57 (2018-03-29 revision 63029)
- Rails 5.0.7
- haml/scss/javascript/jquery
- GitHubs/slack


## データベース設計

### usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

#### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members

### groopsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

#### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false|
|image|string| |
|users_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group