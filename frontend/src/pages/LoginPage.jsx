const LoginPage = () => {
  const titleStyle = {
    fontSize: '32px', 
    color: 'black',
    textAlign: 'center',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh', 
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>LoginPage</h1>
    </div>
  );
}

    
export default LoginPage;
