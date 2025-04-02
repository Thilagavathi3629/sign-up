import { useState } from 'react'; 
import { useNavigate } from '@tanstack/react-router'; 
import { User, Lock, CheckCircle } from 'lucide-react';  

function App() {   
  const navigate = useNavigate();   
  const [formData, setFormData] = useState({ username: '', password: '' });   
  const [error, setError] = useState('');   
  const [showConditions, setShowConditions] = useState(false);
  
  const handleChange = (e) => {     
    const { name, value } = e.target;     
    setFormData(prevState => ({ ...prevState, [name]: value }));   
  };    
  
  const handleSubmit = (e) => {     
    e.preventDefault();     
    
    // Validate both fields are filled
    if (!formData.username || !formData.password) {       
      setError('Please enter both username and password');       
      return;     
    }
    
    // Check if username is a valid Gmail address
    if (!formData.username.endsWith('@gmail.com')) {
      setError('Username must be a valid Gmail address');
      return;
    }
    
    // Check password conditions
    const meetsPasswordRequirements = validatePassword && validateUppercase && validateNumber && validateSpecialChar;
    
    if (!meetsPasswordRequirements) {
      setError('Password must meet all requirements');
      return;
    }
    
    // If all validations pass, log in the user
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', formData.username);
    navigate({ to: '/home' });
  };
  
  // Password validation logic
  const password = formData.password;
  const validatePassword = password.length >= 8;
  const validateUppercase = /[A-Z]/.test(password);
  const validateNumber = /[0-9]/.test(password);
  const validateSpecialChar = /[!@#$%&*]/.test(password);
  
  const conditionsMet = [validatePassword, validateUppercase, validateNumber, validateSpecialChar].filter(Boolean).length;

  return (     
    <div className="h-screen flex items-center justify-center bg-[#0b0b2a]">       
      <div className="max-w-sm w-full p-8 bg-[#1a1a3a] rounded-xl shadow-2xl border border-white/10">         
        <div className="flex justify-center -mt-20 mb-6">           
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center border-4 border-white/20 shadow-lg">             
            <User size={48} className="text-white" />           
          </div>         
        </div>          
        
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>         
        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}                  
        
        <form onSubmit={handleSubmit}>           
          <div className="mb-4">             
            <label htmlFor="username" className="block text-white mb-2 font-medium">Username</label>             
            <input               
              type="text"               
              id="username"               
              name="username"               
              value={formData.username}               
              onChange={handleChange}               
              placeholder="Enter your Gmail address"               
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-400"             
            />
            {formData.username && !formData.username.endsWith('@gmail.com') && (
              <p className="text-yellow-400 text-sm mt-1">Username must end with @gmail.com</p>
            )}
          </div>                      
          
          <div className="mb-4">             
            <label htmlFor="password" className="block text-white mb-2 font-medium">Password</label>             
            <div className="relative">               
              <input                 
                type="password"                 
                id="password"                 
                name="password"                 
                value={formData.password}                 
                onChange={handleChange}                 
                onFocus={() => setShowConditions(true)}                 
                placeholder="Enter your password"                 
                className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-400"               
              />               
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">                 
                <Lock size={18} className="text-white/50" />               
              </div>             
            </div>
            
            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">Password Strength</span>
                  <span className="text-sm font-medium text-white">
                    {conditionsMet === 0 && "Very Weak"}
                    {conditionsMet === 1 && "Weak"}
                    {conditionsMet === 2 && "Fair"}
                    {conditionsMet === 3 && "Good"}
                    {conditionsMet === 4 && "Strong"}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      conditionsMet === 0 ? "w-0 bg-red-500" :
                      conditionsMet === 1 ? "w-1/4 bg-red-500" :
                      conditionsMet === 2 ? "w-2/4 bg-yellow-500" :
                      conditionsMet === 3 ? "w-3/4 bg-blue-500" :
                      "w-full bg-green-500"
                    }`}
                  ></div>
                </div>
              </div>
            )}

            {/* Password Conditions */}
            {(showConditions || password.length > 0) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <div className={`flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3 ${validatePassword ? "" : "opacity-50"}`}>
                  {validatePassword && <CheckCircle className="text-purple-400" size={14} />}
                  <span>8+ chars</span>
                </div>
                <div className={`flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3 ${validateUppercase ? "" : "opacity-50"}`}>
                  {validateUppercase && <CheckCircle className="text-purple-400" size={14} />}
                  <span>Uppercase</span>
                </div>
                <div className={`flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3 ${validateNumber ? "" : "opacity-50"}`}>
                  {validateNumber && <CheckCircle className="text-purple-400" size={14} />}
                  <span>Number</span>
                </div>
                <div className={`flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3 ${validateSpecialChar ? "" : "opacity-50"}`}>
                  {validateSpecialChar && <CheckCircle className="text-purple-400" size={14} />}
                  <span>Special char</span>
                </div>
              </div>
            )}
          </div>
          
          <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-md">
            Login
          </button>
        </form>       
      </div>     
    </div>   
  ); 
}  

export default App;