# Modelo NoSQL para Chat (ejemplo Firestore)

## Colecciones

- `users`
  - `id` (docId)
  - `displayName`
  - `photoURL`
  - `createdAt` (timestamp)

- `chats`
  - `id` (docId)
  - `name` (string)
  - `participants` (array de referencias a `users`)
  - `createdAt` (timestamp)
  - `lastMessage` (string)
  - `lastMessageAt` (timestamp)

- Subcolección: `chats/{chatId}/messages`
  - `id` (docId)
  - `sender` (ref a `users/{userId}`)
  - `text` (string)
  - `createdAt` (timestamp)
  - `reactions` (map<string, array<userRef>>)
    - ejemplo: `{ "like": [userRef1, userRef2], "love": [userRef3] }`

- Opcional: `chats/{chatId}/typing`
  - `userId` (string)
  - `isTyping` (boolean)
  - `updatedAt` (timestamp)

Este modelo utiliza:
- **Referencias** (users, chats)
- **Timestamps**
- **Subcolecciones** (`messages`) para escalar alto volumen.
