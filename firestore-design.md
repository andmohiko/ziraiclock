# Firestore 設計

- [publicZirais](#publicZirais)
  - [usedHistories](#usedHistories)
- [zirais](#zirais)
  - [usedHistories](#usedHistories)

## publicZirais

### 概要

```
/publicZirais/{ziraiId}
```

### 詳細

- createdAt: Timestamp 作成日時
- imageUrl: String 画像の URL
- publishStatus: String('published' | 'unauthorized')
- twitterId: String 地雷女子のツイッター ID
- updatedAt: Timestamp 更新日時
- useAt: Timestamp 使用日
- usedCount: Number 使用回数

## zirais

### 概要

```
/zirais/{ziraiId}
```

- 地雷女子
- ID: 自動生成

### 詳細

- createdAt: Timestamp 作成日時
- imageUrl: String 画像の URL
- publishStatus: String('draft' | 'published' | 'unauthorized' | 'withdrawn')
- twitterId: String 地雷女子のツイッター ID
- updatedAt: Timestamp 更新日時
- useAt: Timestamp 使用日
- usedCount: Number 使用回数

### usedHistories

### 概要

```
/zirais/{ziraiId}/usedHistories/${usedHistoryId}
```

- 利用履歴
- ID: 自動生成

### 詳細

- createdAt: Timestamp 作成日時
