import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { useAuth } from '../../utils/context/authContext.js';
import { updateUserProfile, getUserProfile } from '../../api/userData.js';

export default function EditProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(user?.photoURL || '');
  const [imagePreview, setImagePreview] = useState(user?.photoURL || '');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bioCharCount, setBioCharCount] = useState(0);

  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid).then((profile) => {
        if (profile?.bio) {
          setBio(profile.bio);
          setBioCharCount(profile.bio.length);
        }
      }).catch(() => {});
    }
  }, [user?.uid]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async () => {
    if (!imageFile) return profileImage;

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`profileImages/${user.uid}/${imageFile.name}`);
    await fileRef.put(imageFile);
    return fileRef.getDownloadURL();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (user) {
        let photoURL = profileImage;

        if (imageFile) {
          photoURL = await uploadProfileImage();
        }

        await user.updateProfile({
          displayName,
          photoURL,
        });

        await updateUserProfile(user.uid, {
          bio,
          photoURL,
          displayName,
          email: user.email,
          uid: user.uid,
        });

        setImageFile(null);
        setMessage('✅ Profile updated successfully!');
        setTimeout(() => {
          router.push('/userDashboard/new');
        }, 1500);
      }
    } catch (error) {
      setMessage(`❌ Error updating profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (user) {
        await user.delete();
        await firebase.auth().signOut();
        router.push('/');
      }
    } catch (error) {
      setMessage(`❌ Error deleting account: ${error.message}`);
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container py-5">
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Link href="/userDashboard/new">
        <a className="text-primary mb-4" style={{ display: 'inline-block' }}>
          ← Back to Dashboard
        </a>
      </Link>

      <h1 className="text-primary mb-5">Edit Profile</h1>

      <form onSubmit={handleUpdateProfile}>
        <div className="form-group mb-4">
          <label htmlFor="profileImage" className="form-label">
            Profile Image
          </label>
          <div className="mb-3">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="rounded-circle mb-3"
                style={{ width: '120px', height: '120px', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>
          <input
            id="profileImage"
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          <small className="text-secondary">Upload a new profile image (optional)</small>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="displayName" className="form-label">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            className="form-control"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            disabled
          />
          <small className="text-secondary">Email cannot be changed</small>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            id="bio"
            className="form-control"
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 600) {
                setBio(e.target.value);
                setBioCharCount(e.target.value.length);
              }
            }}
            rows="4"
            placeholder="Tell us about yourself (max 600 characters)"
          />
          <small className="text-secondary">
            {bioCharCount}/600 characters
          </small>
        </div>

        {message && (
          <div
            className={`alert mb-4 ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}
            role="alert"
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 mb-4"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>

      <hr className="my-5" />

      <div className="bg-light p-4 rounded-lg">
        <h4 className="text-danger mb-3">⚠️ Danger Zone</h4>
        <p className="text-secondary mb-4">
          Deleting your account is permanent and cannot be undone. All your reviews and data will be deleted.
        </p>

        {showDeleteConfirm && (
          <div className="alert alert-danger mb-3" role="alert">
            <strong>Are you sure?</strong> This action cannot be undone. Click "Confirm Delete" again to permanently delete your account.
          </div>
        )}

        <button
          type="button"
          className={`btn w-100 ${showDeleteConfirm ? 'btn-danger' : 'btn-outline'}`}
          onClick={handleDeleteAccount}
          disabled={loading}
          style={{
            borderColor: showDeleteConfirm ? undefined : 'var(--color-danger)',
            color: showDeleteConfirm ? 'white' : 'var(--color-danger)',
          }}
        >
          {loading
            ? 'Deleting...'
            : showDeleteConfirm
            ? '⚠️ Confirm Delete Account'
            : 'Delete Account'}
        </button>

        {showDeleteConfirm && (
          <button
            type="button"
            className="btn btn-outline w-100 mt-2"
            onClick={() => setShowDeleteConfirm(false)}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
