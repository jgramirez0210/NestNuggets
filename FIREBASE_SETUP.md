# Firebase Configuration Guide

## Firebase Realtime Database Security Rules

The new comments system requires proper Firebase Realtime Database permissions. Update your rules to allow authenticated users to read and write comments.

### Required Security Rules

Go to [Firebase Console](https://console.firebase.google.com/) → Your Project → Realtime Database → Rules

Replace the rules with the following:

```json
{
  "rules": {
    "review": {
      ".read": true,
      ".write": "auth.uid != null"
    },
    "wasThisReviewHelpful": {
      ".read": true,
      ".write": "auth.uid != null"
    },
    "comments": {
      ".read": "auth.uid != null",
      ".write": "auth.uid != null",
      ".indexOn": ["reviewId", "userId"],
      "$commentId": {
        ".validate": "newData.hasChildren(['reviewId', 'userId', 'content', 'createdAt'])",
        "reviewId": {
          ".validate": "newData.isString()"
        },
        "userId": {
          ".validate": "newData.val() === auth.uid"
        },
        "content": {
          ".validate": "newData.isString() && newData.val().length <= 300"
        },
        "parentCommentId": {
          ".validate": "newData.val() === null || newData.isString()"
        },
        "createdAt": {
          ".validate": "newData.isString()"
        },
        "updatedAt": {
          ".validate": "newData.isString()"
        }
      }
    },
    "commentLikes": {
      ".read": "auth.uid != null",
      ".write": "auth.uid != null",
      "$commentId": {
        "$userId": {
          ".validate": "$userId === auth.uid"
        }
      }
    },
    "commentDislikes": {
      ".read": "auth.uid != null",
      ".write": "auth.uid != null",
      "$commentId": {
        "$userId": {
          ".validate": "$userId === auth.uid"
        }
      }
    },
    "userProfiles": {
      ".read": "auth.uid != null",
      ".write": "auth.uid != null",
      "$userId": {
        ".validate": "$userId === auth.uid",
        "bio": {
          ".validate": "newData.isString() && newData.val().length <= 600"
        },
        "photoURL": {
          ".validate": "newData.isString()"
        },
        "displayName": {
          ".validate": "newData.isString()"
        },
        "email": {
          ".validate": "newData.isString()"
        },
        "uid": {
          ".validate": "$userId === auth.uid"
        }
      }
    }
  }
}
```

## Key Rules Explained

### Comments Node
- **Read**: Allowed for authenticated users only
- **Write**: Allowed for authenticated users only
- **Indexes**: Added on `reviewId` and `userId` for efficient queries
- **Validation**: Ensures required fields exist and limits are enforced

### Comment Likes/Dislikes
- **Read**: Authenticated users only
- **Write**: Users can only add/remove their own likes/dislikes
- **Validation**: `$userId === auth.uid` ensures user can only vote as themselves

### User Profiles
- **Read**: Authenticated users only
- **Write**: Users can only update their own profile
- **Character Limits**: Bio max 600 chars, enforced at database level

## Firebase Storage Configuration

For profile image uploads, ensure Firebase Storage rules allow authenticated users:

### Storage Rules

Go to Firebase Console → Storage → Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profileImages/{userId}/{allPaths=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

## Testing the Setup

After updating rules:

1. Log in to the app
2. Navigate to any review
3. Scroll to "Discussion" section
4. Try posting a comment - should work without 401 error
5. Try editing and deleting your comment
6. Try liking/disliking
7. Go to Edit Profile and upload an image

## Common Issues

### 401 Unauthorized Error
- Check that you've updated the Realtime Database rules
- Ensure you're logged in (authenticated)
- Wait a few moments for rules to propagate

### Comments Not Loading
- Verify `.read` permission is set to `"auth.uid != null"`
- Check `.indexOn` includes `["reviewId", "userId"]`

### Image Upload Fails
- Verify Firebase Storage rules are set
- Check that `profileImages/{userId}/` path is allowed
- Ensure user is authenticated

### Like/Dislike Not Working
- Check `commentLikes` and `commentDislikes` rules
- Verify validation allows only the logged-in user to vote

## Deployment

When deploying to production, consider more restrictive rules:
- Add rate limiting
- Add validation for comment length and formatting
- Add moderation capabilities
- Add reporting mechanism for inappropriate comments

