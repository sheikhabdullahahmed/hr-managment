import { useState } from 'react';
import { loginUser } from '../services/imageApi';
import '../styles/Auth.css';

interface LoginProps {
  onSwitchToSignup: () => void;
}

function Login({ onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setError('');
      const response = await loginUser({ email, password });
      console.log('Login successful:', response);
      alert('Login successful! Token: ' + (response.token ? 'Received' : 'No token'));
      // You can store the token and redirect here
      localStorage.setItem('authToken', response.token || '');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      console.error('Login error:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        
        <div className="image-section">
          {imagePreview ? (
            <div className="auth-image">
              <img src={imagePreview} alt="Selected" />
              <button 
                type="button" 
                className="remove-image-btn"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                }}
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            <div className="image-upload">
              <label htmlFor="image-input" className="image-upload-label">
                <div className="upload-icon">📷</div>
                <p>Click to upload image</p>
                <small>or drag and drop</small>
              </label>
              <input
                type="file"
                id="image-input"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <button className="link-btn" onClick={onSwitchToSignup}>Sign up here</button></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
