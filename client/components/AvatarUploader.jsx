/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Form, Alert, Image,
} from 'react-bootstrap';

const AvatarUploader = ({ refreshUser }) => {
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState('avatar.png');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/auth/current_user')
      .then((res) => {
        console.log('User fetched:', res.data);
        setUser(res.data);
        setAvatar(res.data.avatar || 'avatar.png');
      })
      .catch((err) => {
        console.error('err fetching user', err);
        setUser(null);
      });
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadAvatar = async () => {
    if (!file) {
      setMessage('Please select an image');
      return;
    }

    if (!user || !user.googleId) {
      console.error('User not found', user);
      setMessage('Error: User ID not found.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      console.log('Uploading to:', `http://127.0.0.1:8080/avatar/update-avatar/${user.googleId}`);

      const res = await axios.put(
        `http://127.0.0.1:8080/avatar/update-avatar/${user.googleId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      setAvatar(res.data.avatar);
      setMessage('Avatar updated');
      refreshUser();
    } catch (err) {
      console.error('err uploading avatar', err);
      setMessage('Failed to upload avatar');
    }
  };

  const deleteAvatar = async () => {
    if (!user || !user.googleId) {
      setMessage('Failed to delete avatar');
      return;
    }

    try {
      await axios.delete(`/avatar/delete-avatar/${user.googleId}`);
      setAvatar('avatar.png');
      setMessage('Avatar removed.');
      refreshUser();
    } catch (err) {
      console.error('err deleting avatar', err);
      setMessage('Failed to delete avatar');
    }
  };

  return (
    <div className="avatar-uploader text-center">
      <h5>Profile Picture</h5>
      {user ? (
        <>
          <Image src={`/uploads/${avatar}`} roundedCircle width={100} height={100} alt="User Avatar" />
          <Form.Group className="mt-3">
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" className="mt-2" onClick={uploadAvatar}>Upload</Button>
          <Button variant="danger" className="mt-2" onClick={deleteAvatar}>Remove</Button>
        </>
      ) : (
        <p>Loading user...</p>
      )}
      {message && <Alert className="mt-2" variant="info">{message}</Alert>}
    </div>
  );
};

export default AvatarUploader;
