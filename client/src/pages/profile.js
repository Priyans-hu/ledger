import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import storeApiInstance from '../api/storeApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const profileSchema = Yup.object({
  storeName: Yup.string()
    .min(2, 'Store name must be at least 2 characters')
    .max(255, 'Store name must be less than 255 characters'),
  email: Yup.string().email('Invalid email format'),
  address: Yup.string().max(500, 'Address must be less than 500 characters'),
  gstNumber: Yup.string().matches(/^[0-9A-Z]{15}$/, {
    message: 'Invalid GST number format (15 alphanumeric characters)',
    excludeEmptyString: true
  })
});

const passwordSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await storeApiInstance.getProfile();
      setProfile(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    try {
      const response = await storeApiInstance.updateProfile(values);
      setProfile(response.data.data);
      toast.success('Profile updated successfully');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async (values, { setSubmitting, resetForm }) => {
    try {
      await storeApiInstance.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      toast.success('Password changed successfully');
      resetForm();
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to change password';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="min-h-screen flex justify-center items-center">
          <CircularProgress />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <main className="min-h-screen flex justify-center items-center">
          <Alert severity="error">{error}</Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="px-4 py-8 min-h-[80vh]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

          {/* Profile Information Card */}
          <Card className="mb-6">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Store Information
              </Typography>
              <Divider className="mb-4" />

              <Formik
                initialValues={{
                  storeName: profile?.storeName || '',
                  email: profile?.email || '',
                  address: profile?.address || '',
                  gstNumber: profile?.gstNumber || ''
                }}
                validationSchema={profileSchema}
                onSubmit={handleProfileUpdate}
                enableReinitialize
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Field
                        as={TextField}
                        name="storeName"
                        label="Store Name"
                        fullWidth
                        error={touched.storeName && Boolean(errors.storeName)}
                        helperText={touched.storeName && errors.storeName}
                        data-testid="profile-storename-input"
                      />

                      <TextField
                        label="Phone Number"
                        value={profile?.phoneNumber || ''}
                        fullWidth
                        disabled
                        helperText="Phone number cannot be changed"
                        data-testid="profile-phone-input"
                      />

                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        data-testid="profile-email-input"
                      />

                      <Field
                        as={TextField}
                        name="address"
                        label="Address"
                        fullWidth
                        multiline
                        rows={2}
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}
                        data-testid="profile-address-input"
                      />

                      <Field
                        as={TextField}
                        name="gstNumber"
                        label="GST Number"
                        fullWidth
                        error={touched.gstNumber && Boolean(errors.gstNumber)}
                        helperText={touched.gstNumber && errors.gstNumber}
                        data-testid="profile-gst-input"
                      />

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                          data-testid="profile-save-btn"
                        >
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>

          {/* Change Password Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Divider className="mb-4" />

              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                }}
                validationSchema={passwordSchema}
                onSubmit={handlePasswordChange}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Field
                        as={TextField}
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        fullWidth
                        error={touched.currentPassword && Boolean(errors.currentPassword)}
                        helperText={touched.currentPassword && errors.currentPassword}
                        data-testid="profile-current-password-input"
                      />

                      <Field
                        as={TextField}
                        name="newPassword"
                        label="New Password"
                        type="password"
                        fullWidth
                        error={touched.newPassword && Boolean(errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                        data-testid="profile-new-password-input"
                      />

                      <Field
                        as={TextField}
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        data-testid="profile-confirm-password-input"
                      />

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disabled={isSubmitting}
                          data-testid="profile-change-password-btn"
                        >
                          {isSubmitting ? 'Changing...' : 'Change Password'}
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Box className="mt-4 text-center text-gray-500 text-sm">
            <p>Account created: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '-'}</p>
          </Box>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
